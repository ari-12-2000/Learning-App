"use client"

import type React from "react"
import validator from "validator";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, BookOpen, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link";
import { useAppDispatch } from "@/store/hooks";
import { login, signup } from "@/features/auth/authThunks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearError, setError } from "@/features/auth/authSlice";
import { useSession } from "next-auth/react"
import Loading from "@/app/loading"
import CopyRightMessage from "@/components/CopyRightMessage";

export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({ first_name: "", last_name: "", email: "", password: "" })
  const [success, setSuccess] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { loading, error: authError } = useSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      if (session.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    }
  }, [status, session, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(clearError())
    setSuccess("")

    const { email, password } = loginData

    if (!email.trim() || !password.trim()) {
      dispatch(setError("Email and password are required."))
      return
    }

    if (!validator.isEmail(email.trim())) {
      dispatch(setError("Invalid email format."))
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(password.trim())) {
      dispatch(setError("Password must be at least 8 characters long and include uppercase, lowercase, and a special character."))
      return
    }

    const result = await dispatch(login({ email: email.trim(), password: password.trim() }))
    if (login.fulfilled.match(result)) {
      setSuccess("Logged in successfully")
   }

  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(clearError())
    setSuccess("")

    const { first_name, last_name, email, password } = signupData

    if (
      !first_name.trim() ||
      !last_name.trim() ||
      !email.trim()
    ) {
      dispatch(setError("All fields are required."))
      return
    }

    if (!password.trim()) {
      dispatch(setError("Password is required."))
      return
    }

    if (!validator.isEmail(email.trim())) {
      dispatch(setError("Invalid email format."))
      return
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    if (!passwordRegex.test(password.trim())) {
      dispatch(setError("Password must be at least 8 characters long and include uppercase, lowercase, and a special character."))
      return
    }

    const result = await dispatch(signup({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      password: password.trim()
    }

    ))

    if (signup.fulfilled.match(result)) {

      setSuccess("Account created successfully.")

    }

  }

  if (status === "loading") {
     return <Loading/>
  }
  else
   return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Branding and features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex-col justify-between p-12 text-white">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-3xl font-bold">EduPortal</span>
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">Learn Without Limits</h2>
              <p className="text-blue-100 text-lg">Access thousands of courses from world-class instructors and expand your knowledge.</p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Expert-Led Courses</h3>
                  <p className="text-blue-100">Learn from industry professionals</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Global Community</h3>
                  <p className="text-blue-100">Join millions of learners worldwide</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Certificates</h3>
                  <p className="text-blue-100">Get recognized for your achievements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CopyRightMessage className="text-blue-200 text-sm"/>
      </div>

      {/* Right side - Login/Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-gray-50">
        <Card className="w-full max-w-md border-0 shadow-xl rounded-2xl">
          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center justify-center mb-2 lg:hidden">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EduPortal</span>
            </div>
            <CardTitle className="text-3xl text-center font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-center text-gray-600">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
          {authError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-100 bg-green-50 text-green-800">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertDescription className="font-medium">{success}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg">
              <TabsTrigger value="login" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Login</TabsTrigger>
              <TabsTrigger value="signup" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm font-semibold">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <h2 className="sr-only">Login Form</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="font-semibold text-gray-700">Email Address</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="login-password" className="font-semibold text-gray-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-lg h-10" disabled={loading}>
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
                <Link href="/forget-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 block text-center">
                  Forgot password?
                </Link>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <h2 className="sr-only">Signup Form</h2>
              <form onSubmit={handleSignup} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="signup-first_name" className="font-semibold text-gray-700">First Name</Label>
                    <Input
                      id="signup-first_name"
                      type="text"
                      placeholder="John"
                      value={signupData.first_name}
                      onChange={(e) => setSignupData({ ...signupData, first_name: e.target.value })}
                      className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-last_name" className="font-semibold text-gray-700">Last Name</Label>
                    <Input
                      id="signup-last_name"
                      type="text"
                      placeholder="Doe"
                      value={signupData.last_name}
                      onChange={(e) => setSignupData({ ...signupData, last_name: e.target.value })}
                      className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="font-semibold text-gray-700">Email Address</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="font-semibold text-gray-700">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                      aria-describedby="password-hint"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <div id="password-hint" className="text-xs text-gray-600 bg-blue-50/50 p-2.5 rounded-lg mt-2 border border-blue-200/50">
                    <p className="font-semibold text-gray-700 mb-1">Password must contain:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>✓ At least 8 characters</li>
                      <li>✓ Uppercase and lowercase letters</li>
                      <li>✓ A special character</li>
                    </ul>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold rounded-lg h-10 mt-4" disabled={loading}>
                  {loading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </div>
   )
}
