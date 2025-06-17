"use client"

import type React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  icon: React.ElementType
  text: string
  active?: boolean
  onClick?: (e: React.MouseEvent) => void
}

export function SidebarItem({ href, icon: Icon, text, active, onClick }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md group",
        active ? "bg-gray-100 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
      )}
      onClick={onClick}
    >
      <Icon className={cn("mr-3 h-5 w-5", active ? "text-blue-600" : "text-gray-400")} aria-hidden="true" />
      {text}
    </Link>
  )
}
