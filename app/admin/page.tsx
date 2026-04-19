"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts"
import { TrendingUp, Users, DollarSign, BookOpen } from "lucide-react"

const userGrowth = [
  { month: "Jan", users: 200, target: 300 },
  { month: "Feb", users: 400, target: 400 },
  { month: "Mar", users: 800, target: 700 },
  { month: "Apr", users: 1200, target: 1100 },
  { month: "May", users: 2000, target: 1800 },
]

const revenueData = [
  { month: "Jan", revenue: 1000, cost: 400 },
  { month: "Feb", revenue: 2400, cost: 600 },
  { month: "Mar", revenue: 1800, cost: 500 },
  { month: "Apr", revenue: 3200, cost: 700 },
  { month: "May", revenue: 5000, cost: 900 },
]

const courseDistribution = [
  { name: "Web Dev", value: 35, color: "#3b82f6" },
  { name: "UI/UX", value: 25, color: "#8b5cf6" },
  { name: "Mobile", value: 20, color: "#ec4899" },
  { name: "Data Science", value: 20, color: "#06b6d4" },
]

const enrollmentTrend = [
  { week: "Week 1", enrollments: 120, completions: 45 },
  { week: "Week 2", enrollments: 180, completions: 65 },
  { week: "Week 3", enrollments: 240, completions: 95 },
  { week: "Week 4", enrollments: 320, completions: 130 },
  { week: "Week 5", enrollments: 420, completions: 185 },
]

export default function AdminDashboard() {

  const [mounted, setMounted] = useState(false)

  useEffect(()=>setMounted(true),[])

  if(!mounted)
    return null;
  
  const statCards = [
    { title: "Total Users", value: "12,340", change: "+12.5%", icon: Users, color: "from-blue-500 to-blue-600" },
    { title: "Active Users", value: "2,120", change: "+8.2%", icon: TrendingUp, color: "from-indigo-500 to-indigo-600" },
    { title: "Revenue", value: "$84,200", change: "+24.1%", icon: DollarSign, color: "from-green-500 to-emerald-600" },
    { title: "Courses", value: "84", change: "+4", icon: BookOpen, color: "from-purple-500 to-pink-600" },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-50 to-gray-100 min-h-screen space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your platform performance overview.</p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((item, i) => {
          const Icon = item.icon
          return (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`bg-gradient-to-br ${item.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium opacity-90">{item.title}</p>
                    <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
                  </div>
                  <Icon className="h-12 w-12 opacity-20" />
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50/50">
                <p className="text-sm font-semibold text-green-600">{item.change} from last month</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Growth Line Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userGrowth} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
                cursor={{ stroke: "#3b82f6", strokeWidth: 2 }}
              />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ fill: "#3b82f6", r: 5 }} />
              <Line type="monotone" dataKey="target" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Distribution Donut Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Course Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {courseDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {courseDistribution.map((course, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: course.color }}></div>
                  <span className="font-medium text-gray-700">{course.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{course.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECOND ROW CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue & Cost Area Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Revenue vs Cost</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
              />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Enrollment Bar Chart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="enrollments" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completions" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* DATA TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Top Courses Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Performing Courses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Course Name</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Students</th>
                  <th className="text-right py-3 px-2 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Web Development Fundamentals", students: 842, rating: 4.8 },
                  { name: "UI/UX Design Mastery", students: 654, rating: 4.9 },
                  { name: "Advanced Next.js Course", students: 521, rating: 4.7 },
                  { name: "React Hooks Deep Dive", students: 438, rating: 4.8 },
                ].map((course, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-2 text-gray-900 font-medium">{course.name}</td>
                    <td className="text-right py-4 px-2 text-gray-600">{course.students}</td>
                    <td className="text-right py-4 px-2">
                      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg font-semibold">
                        ★ {course.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/50 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "User enrollment", description: "Shuvam enrolled in React course", time: "2 hours ago", icon: "👤", color: "blue" },
              { action: "Payment received", description: "Received $499 from Alice Johnson", time: "4 hours ago", icon: "💳", color: "green" },
              { action: "Course published", description: "New Python Basics course published", time: "6 hours ago", icon: "📚", color: "purple" },
              { action: "Certificate issued", description: "Certificate issued to 12 students", time: "1 day ago", icon: "🏆", color: "amber" },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center text-lg`}>
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">{item.action}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
