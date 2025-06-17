"use client"

import type React from "react"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, FileQuestion, Award } from "lucide-react"

export default function AdminAnalytics() {
  return (
    
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Students" value="1,245" change="+12%" trend="up" icon={Users} color="bg-blue-500" />
          <StatCard title="Active Courses" value="24" change="+3" trend="up" icon={BookOpen} color="bg-green-500" />
          <StatCard
            title="Total Quizzes"
            value="156"
            change="+8"
            trend="up"
            icon={FileQuestion}
            color="bg-purple-500"
          />
          <StatCard title="Completion Rate" value="78%" change="+5%" trend="up" icon={Award} color="bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart placeholder - Course enrollments over time</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quiz Completion Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Chart placeholder - Quiz completion rates by course</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  color: string
}

function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center">
        <div className={`${color} text-white p-3 rounded-full`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            <span className={`ml-2 text-xs font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
