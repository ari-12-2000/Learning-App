"use client"

import { User } from "@/types/user"
import { createContext, useContext, useState, useEffect, type ReactNode, SetStateAction, Dispatch } from "react"
import { signOut, useSession } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"

interface AuthContextType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session } = useSession()
  // Check for existing session on mount
  useEffect(() => {
    setIsLoading(true)
    if (!session?.user?.email) { setIsLoading(false); return }
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/auth/userData?email=${session?.user?.email}`)
        const data = await res.json()
        if (!res.ok)
          throw new Error(data.error)
        setUser(data.user)

      } catch (error:any) {
        console.error("Failed to fetch user data:", error)
        signOut({ redirect: false })
        toast({
        title: "Failed",
        description: "Failed to fetch user data",
        variant: "destructive",
      });

      } finally {
        setIsLoading(false)   // ✅ Loading properly reset hobe
      }
    }

    fetchData();
  }, [session?.user?.email])

  const logout = () => {
    signOut({ redirect: false })
    setUser(null)

  }

  return <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
