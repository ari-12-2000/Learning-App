import { GlobalVariables } from "@/globalVariables"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { signIn } from "next-auth/react"

export const login = createAsyncThunk("auth/login", async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (response?.error) {
      let message = ""

      switch (response.error) {
        case "CredentialsSignin":
          message = "Invalid credentials"
          break
        case "AccessDenied":
          message = "You are not authorized to login"
          break
        case "Configuration":
          message = "Internal Server Error"
          break
        default:
          message = "Unexpected error. Please try again"
      }
      return rejectWithValue(message)
    }

    return true
  } catch (error) {
    return rejectWithValue("Network error")
  }
})

export const signup = createAsyncThunk("auth/signup", async ({ first_name, last_name, email, password, role = `${GlobalVariables.non_admin.role1}` }: { first_name: string, last_name: string, email: string, password: string, role?: string }, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password, role }),
    })

    const data = await response.json()
    if (!response.ok) {
      return rejectWithValue(data.error)
    }
    // auto login after successful signup
    await dispatch(login({ email, password })).unwrap()

    return true
  } catch (error) {
    return rejectWithValue(error||"Network error occurred")
  }
})