import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Edu Portal",
  description: "Educational platform dashboard",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider><>{children}</></AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
