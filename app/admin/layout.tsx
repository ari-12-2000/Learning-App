"use client"
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { ProtectedRoute } from '@/components/protected-route'


import {ReactNode, useEffect, useState} from 'react'

const layout = ({children}:{children:ReactNode}) => {
    const isLargeScreen = typeof window !== "undefined" ? window.innerWidth >= 1024 : false
      const [sidebarOpen, setSidebarOpen] = useState(isLargeScreen)
    
      // Update sidebar state based on screen size
      useEffect(() => {
        const handleResize = () => {
          setSidebarOpen(window.innerWidth >= 1024)
        }
    
        window.addEventListener("resize", handleResize)
        handleResize()
    
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [])
    
      const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
      }
  return (
    <ProtectedRoute requiredRole="admin"> 
       <div className="flex min-h-screen bg-gray-50">
          <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AdminHeader toggleSidebar={toggleSidebar} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            <footer className="bg-white border-t py-3 px-4 text-center text-xs text-gray-500">
              <div className="max-w-7xl mx-auto">
                <p>All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
    </ProtectedRoute>
  )
}

export default layout
