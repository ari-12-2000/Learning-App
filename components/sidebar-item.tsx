import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  text: string
  active?: boolean
}

export function SidebarItem({ href, icon: Icon, text, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-250 ease-out",
        active
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      {/* Icon */}
      <Icon
        className={cn(
          "mr-3 h-5 w-5 transition-all duration-250",
          active ? "text-white" : "text-gray-400 group-hover:text-blue-500"
        )}
      />

      {/* Text */}
      <span className="transition-all duration-250">{text}</span>
      
      {/* Subtle glow effect on hover for inactive */}
      {!active && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-indigo-600/0 group-hover:from-blue-500/5 group-hover:to-indigo-600/5 transition-colors duration-250" />
      )}
    </Link>
  )
}
