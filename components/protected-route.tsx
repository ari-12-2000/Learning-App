"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Loading from "@/app/loading"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
  if (isLoading) return;

  const unauthorized = !user || (requiredRole && user.role !== requiredRole);
  if (unauthorized) {
    router.push("/login");
  }
 }, [user, isLoading, router, requiredRole]);

  if (isLoading) {
    return (
      <Loading/>
    )
  }

  if (!user) {
    return null
  }

  if (requiredRole && user.role !== requiredRole) {
    return null
  }

  return <>{children}</>
}
