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
        "group relative flex items-center px-3 pl-4 py-2.5 text-sm rounded-lg transition-all duration-200",
        active
          ? "bg-blue-50 text-blue-500 font-semibold shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      {/* 🔥 Left active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-blue-500 rounded-r-md" />
      )}

      {/* 🔥 Icon */}
      <Icon
        className={cn(
          "mr-3 h-5 w-5 transition-colors",
          active ? "text-blue-500" : "text-gray-400 group-hover:text-gray-700"
        )}
      />

      {/* 🔥 Text */}
      <span className="transition-all">{text}</span>
    </Link>
  )
}
