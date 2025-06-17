"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Footer } from "./footer"
import { DocsContent } from "@/components/docs-content"
import { DocsSidebar } from "@/components/docs-sidebar"

export function DocsPage() {
  const isLargeScreen = typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  const [sidebarOpen, setSidebarOpen] = useState(isLargeScreen)
  const [activeDoc, setActiveDoc] = useState("getting-started")

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
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}
      >
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-hidden flex">
          <DocsSidebar activeDoc={activeDoc} setActiveDoc={setActiveDoc} />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 relative z-0">
            <DocsContent activeDoc={activeDoc} />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  )
}
