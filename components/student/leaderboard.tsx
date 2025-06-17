"use client"

import { Trophy } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Leaderboard() {
  const leaderboardData = [
    { id: 1, name: "Sarah Parker", score: 98, position: 1 },
    { id: 2, name: "Michael Brown", score: 95, position: 2 },
    { id: 3, name: "Emily Chen", score: 92, position: 3 },
    { id: 4, name: "David Kim", score: 89, position: 4 },
    { id: 7, name: "You (Alex Johnson)", score: 85, position: 7, isCurrentUser: true },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Course Leaderboard</CardTitle>
          <Select defaultValue="web-development">
            <SelectTrigger className="w-[220px] h-8 text-xs">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-development">Web Development Fundamentals</SelectItem>
              <SelectItem value="ui-ux">UI/UX Design Principles</SelectItem>
              <SelectItem value="javascript">JavaScript Advanced Concepts</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {leaderboardData.map((user) => (
            <div key={user.id} className={`flex items-center p-2 rounded-md ${user.isCurrentUser ? "bg-blue-50" : ""}`}>
              <div className="w-6 text-center font-medium text-gray-500">{user.position}</div>
              <div className="ml-3 flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${user.isCurrentUser ? "text-blue-600" : "text-gray-900"}`}>
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">{user.score}% overall score</p>
                </div>
              </div>
              {user.position === 1 && <Trophy className="ml-auto h-4 w-4 text-yellow-500" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
