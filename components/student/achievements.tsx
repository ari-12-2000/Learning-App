"use client"

import { Award, Target, Flame } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "Fast Learner",
      description: "Completed 3 courses in a month",
      icon: Award,
      color: "text-yellow-500",
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "100% in 5 consecutive quizzes",
      icon: Target,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "On Fire",
      description: "30-day learning streak",
      icon: Flame,
      color: "text-orange-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Your Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start">
              <div className={`p-2 rounded-full bg-gray-100 ${achievement.color}`}>
                <achievement.icon className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium">{achievement.title}</h4>
                <p className="text-xs text-gray-500">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
