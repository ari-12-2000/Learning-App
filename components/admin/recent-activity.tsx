"use client"

import { FileQuestion, FileText } from "lucide-react"

export function RecentActivity() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>

      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileQuestion className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div>
            <p className="font-medium">New quiz added to "JavaScript Basics" module</p>
            <p className="text-sm text-gray-500">2 hours ago</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div>
            <p className="font-medium">Updated course materials in "Python Programming"</p>
            <p className="text-sm text-gray-500">3 hours ago</p>
          </div>
        </div>
      </div>
    </div>
  )
}
