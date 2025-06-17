"use client"
import { AdminStats } from "@/components/admin/admin-stats"
import { QuickActions } from "@/components/admin/quick-actions"
import { RecentActivity } from "@/components/admin/recent-activity"

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <AdminStats />
      <QuickActions />
      <RecentActivity />
    </div>
  )
}
