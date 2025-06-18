"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import Loading from "./loading"

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.role === "admin") {
          router.push("/admin") // Admin dashboard is the first tab
        } else {
          router.push("/student") // Student dashboard is the first tab
        }
      } else {
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  return (
    <Loading/>
  )
}
