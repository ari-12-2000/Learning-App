"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Film, FileText, FileQuestion, Plus, MoreHorizontal } from "lucide-react"
import { AddCourseModal } from "@/components/admin/add-course-modal"

export default function AdminCourses() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const courses = [
    {
      id: 1,
      title: "Web Development",
      modules: 4,
      videos: 12,
      documents: 5,
      quizzes: 9,
    },
    {
      id: 2,
      title: "Python Programming",
      modules: 6,
      videos: 18,
      documents: 8,
      quizzes: 12,
    },
    {
      id: 3,
      title: "JavaScript Basics",
      modules: 3,
      videos: 10,
      documents: 4,
      quizzes: 6,
    },
    {
      id: 4,
      title: "UI/UX Design",
      modules: 5,
      videos: 15,
      documents: 7,
      quizzes: 8,
    },
  ]

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{course.modules} Modules</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Film className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{course.videos} Videos</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{course.documents} Documents</span>
                    </div>
                    <div className="flex items-center">
                      <FileQuestion className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{course.quizzes} Quizzes</span>
                    </div>
                  </div>
                </div>

                <div className="border-t">
                  <Button variant="ghost" className="w-full rounded-none py-2 h-auto text-blue-600">
                    Manage Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <AddCourseModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </>
  )
}
