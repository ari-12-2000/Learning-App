"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Film, FileText, FileQuestion, Plus } from "lucide-react"

export function CoursesOverview() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Web Development</h3>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">4 Modules</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Film className="h-4 w-4 mr-2 text-gray-400" />
                  <span>12 Videos</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-gray-400" />
                  <span>5 Documents</span>
                </div>
                <div className="flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2 text-gray-400" />
                  <span>9 Quizzes</span>
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

        <Card className="border-dashed border-2 flex items-center justify-center p-6">
          <Button variant="ghost" className="flex flex-col h-auto py-6">
            <Plus className="h-8 w-8 mb-2 text-gray-400" />
            <span>Add New Course</span>
          </Button>
        </Card>
      </div>
    </div>
  )
}
