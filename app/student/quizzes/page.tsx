"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function QuizzesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  // Sample quiz data - in a real app, this would come from an API
  const quizzes = [
    {
      id: "html-quiz",
      title: "HTML Basics Quiz",
      courseId: "web-dev",
      courseName: "Web Development Fundamentals",
      moduleId: "html-basics",
      moduleName: "HTML Basics",
      type: "self-eval",
      completed: true,
      score: 90,
      questions: 10,
      duration: "15 min",
      difficulty: "Easy",
    },
    {
      id: "css-quiz",
      title: "CSS Basics Quiz",
      courseId: "web-dev",
      courseName: "Web Development Fundamentals",
      moduleId: "css-basics",
      moduleName: "CSS Basics",
      type: "self-eval",
      completed: false,
      questions: 10,
      duration: "15 min",
      difficulty: "Easy",
    },
    {
      id: "js-quiz",
      title: "JavaScript Quiz",
      courseId: "web-dev",
      courseName: "Web Development Fundamentals",
      moduleId: "js-basics",
      moduleName: "JavaScript Basics",
      type: "timed",
      completed: false,
      questions: 15,
      duration: "20 min",
      difficulty: "Medium",
    },
    {
      id: "web-dev-final",
      title: "Web Development Final Exam",
      courseId: "web-dev",
      courseName: "Web Development Fundamentals",
      moduleId: "final-exam",
      moduleName: "Final Exam",
      type: "final-exam",
      completed: false,
      questions: 30,
      duration: "45 min",
      difficulty: "Hard",
    },
    {
      id: "design-quiz",
      title: "Design Basics Quiz",
      courseId: "ui-ux",
      courseName: "UI/UX Design Principles",
      moduleId: "design-basics",
      moduleName: "Design Basics",
      type: "self-eval",
      completed: true,
      score: 85,
      questions: 10,
      duration: "15 min",
      difficulty: "Easy",
    },
    {
      id: "ui-quiz",
      title: "UI Design Quiz",
      courseId: "ui-ux",
      courseName: "UI/UX Design Principles",
      moduleId: "ui-design",
      moduleName: "UI Design",
      type: "timed",
      completed: false,
      questions: 15,
      duration: "20 min",
      difficulty: "Medium",
    },
  ]

  const filteredQuizzes =
    activeTab === "all"
      ? quizzes
      : activeTab === "completed"
        ? quizzes.filter((quiz) => quiz.completed)
        : quizzes.filter((quiz) => !quiz.completed)

  const handleStartQuiz = (courseId: string, quizType: string) => {
    if (quizType === "self-eval") {
      router.push(`/student/courses/${courseId}/self-eval`)
    } else if (quizType === "timed") {
      router.push(`/student/courses/${courseId}/quiz/timed`)
    } else if (quizType === "final-exam") {
      router.push(`/student/courses/${courseId}/final-exam`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quizzes</h1>
        <p className="text-gray-600">Test your knowledge with these quizzes and exams</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Quizzes</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className={quiz.completed ? "border-green-200" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    {quiz.completed ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {quiz.courseName} • {quiz.moduleName}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{quiz.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{quiz.difficulty}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Questions:</span> {quiz.questions}
                    </div>
                    {quiz.completed && quiz.score && (
                      <div>
                        <span className="text-gray-500">Score:</span> {quiz.score}%
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="capitalize">
                      {quiz.type === "self-eval"
                        ? "Self Evaluation"
                        : quiz.type === "timed"
                          ? "Timed Quiz"
                          : "Final Exam"}
                    </Badge>
                    <Button
                      onClick={() => handleStartQuiz(quiz.courseId, quiz.type)}
                      variant={quiz.completed ? "outline" : "default"}
                    >
                      {quiz.completed ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredQuizzes.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No quizzes found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
