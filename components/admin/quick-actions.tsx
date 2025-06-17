"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, FileQuestion, BarChart, Eye } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "View All Courses",
      description: "Manage and edit existing courses",
      icon: Eye,
      href: "/admin/courses",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Create Quiz",
      description: "Add new quiz to existing courses",
      icon: FileQuestion,
      href: "/admin/quizzes",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Manage Students",
      description: "View and manage student accounts",
      icon: Users,
      href: "/admin/students",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "View Analytics",
      description: "Check platform performance metrics",
      icon: BarChart,
      href: "/admin/analytics",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`${action.bgColor} p-3 rounded-full`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
