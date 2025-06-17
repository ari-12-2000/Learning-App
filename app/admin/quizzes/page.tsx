"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileQuestion, Clock, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AdminQuizzes() {
  const quizzes = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      course: "Web Development",
      questions: 10,
      timeLimit: 15,
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "HTML & CSS Basics",
      course: "Web Development",
      questions: 15,
      timeLimit: 20,
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Python Data Structures",
      course: "Python Programming",
      questions: 12,
      timeLimit: 25,
      difficulty: "Hard",
    },
    {
      id: 4,
      title: "React Components",
      course: "JavaScript Basics",
      questions: 8,
      timeLimit: 15,
      difficulty: "Medium",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quizzes</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileQuestion className="h-4 w-4 mr-2" />
          Create New Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.course}</p>
                </div>
                <Badge
                  variant={
                    quiz.difficulty === "Easy" ? "outline" : quiz.difficulty === "Medium" ? "secondary" : "destructive"
                  }
                >
                  {quiz.difficulty}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mt-4">
                <div className="flex items-center">
                  <FileQuestion className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{quiz.questions} Questions</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{quiz.timeLimit} Minutes</span>
                </div>
              </div>

              <div className="flex mt-4 space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="border-dashed border-2 flex items-center justify-center p-6">
          <Button variant="ghost" className="flex flex-col h-auto py-6">
            <FileQuestion className="h-8 w-8 mb-2 text-gray-400" />
            <span>Create New Quiz</span>
          </Button>
        </Card>
      </div>
    </div>
  )
}
