"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreHorizontal, Mail, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminStudents() {
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      enrolledCourses: 3,
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Parker",
      email: "sarah@example.com",
      enrolledCourses: 2,
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      enrolledCourses: 4,
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily@example.com",
      enrolledCourses: 1,
      status: "Inactive",
    },
    {
      id: 5,
      name: "David Kim",
      email: "david@example.com",
      enrolledCourses: 2,
      status: "Active",
    },
  ]

  return (
    
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Students</h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search students..." className="pl-8" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium text-gray-500">Name</th>
                    <th className="text-left p-4 font-medium text-gray-500">Email</th>
                    <th className="text-left p-4 font-medium text-gray-500">Courses</th>
                    <th className="text-left p-4 font-medium text-gray-500">Status</th>
                    <th className="text-right p-4 font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600 mr-3">
                            {student.name.charAt(0)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{student.email}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{student.enrolledCourses} Courses</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={student.status === "Active" ? "success" : "secondary"}>{student.status}</Badge>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4 mr-1" />
                            Email
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    
  )
}
