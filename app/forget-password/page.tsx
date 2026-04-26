"use client"
import React, { useState } from "react"
import validator from "validator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, BookOpen, Users } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import CopyRightMessage from "@/components/CopyRightMessage"

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage("")

        if (!email.trim()) {
            setError("Email is required.")
            return
        }

        if (!validator.isEmail(email)) {
            setError("Invalid email format.")
            return
        }
        try {
            const res = await fetch("/api/auth/forget-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Request failed");
            console.log("Password reset requested:", data);
        } catch (error) {
            console.log("Error requesting password reset:", error);
        } finally {
            setLoading(false);
            setMessage("If your email is registered, you’ll receive a password reset link soon.");
        }

    }

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
                <CopyRightMessage className="text-blue-200 text-sm" />
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-gray-50">
                <Card className="w-full max-w-md border-0 shadow-xl rounded-2xl">

                    <CardHeader className="space-y-2 pb-6">
                        <div className="flex items-center justify-center mb-2 lg:hidden">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold">E</span>
                            </div>
                            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">EduPortal</span>
                        </div>
                        <CardTitle className="text-3xl text-center font-bold text-gray-900">
                            Forgot Password
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600">
                            Enter your email to receive a reset link
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {message && (
                            <Alert className="mb-4 border-green-100 bg-green-50 text-green-800">
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                                <AlertDescription>{message}</AlertDescription>
                            </Alert>
                        )}

                        {!message && (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <div className="space-y-2">
                                    <Label className="font-semibold text-gray-700">Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold rounded-lg h-10"
                                    disabled={loading}
                                >
                                    {loading ? "Sending..." : "Send Reset Link"}
                                </Button>

                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}