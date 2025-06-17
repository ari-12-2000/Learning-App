"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, BookOpen, FileQuestion, Users, BarChart, LogOut, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { SidebarItem } from "@/components/sidebar-item"

interface AdminSidebarProps {
  isOpen: boolean
  toggleSidebar?: () => void
}

export function AdminSidebar({ isOpen, toggleSidebar }: AdminSidebarProps) {
  const { logout } = useAuth()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (path: string) => {
    if (path === "/admin" && pathname === "/admin") return true
    if (path !== "/admin" && pathname?.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out -translate-x-full lg:translate-x-0 lg:static",
        isOpen ? "translate-x-0" : "-translate-x-full",
        mounted ? "block" : "hidden",
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="ml-2 text-xl font-semibold text-gray-800">Eduportal</span>
        </div>
        {toggleSidebar && (
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar} aria-label="Close sidebar">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="overflow-y-auto h-full py-4">
        <nav className="px-2 space-y-1">
          <SidebarItem href="/admin" icon={LayoutDashboard} text="Dashboard" active={isActive("/admin")} />
          <SidebarItem href="/admin/courses" icon={BookOpen} text="Courses" active={isActive("/admin/courses")} />
          <SidebarItem href="/admin/quizzes" icon={FileQuestion} text="Quizzes" active={isActive("/admin/quizzes")} />
          <SidebarItem href="/admin/students" icon={Users} text="Students" active={isActive("/admin/students")} />
          {/* <SidebarItem href="/admin/analytics" icon={BarChart} text="Analytics" active={isActive("/admin/analytics")} /> */}
        </nav>
        <div className="px-2 mt-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
