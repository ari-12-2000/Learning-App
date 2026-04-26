"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Star, Clock, Users, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CourseMinimal, ModuleTopic} from "@/types/course"
import { useAuth } from "@/contexts/auth-context"
import { usePathname } from "next/navigation"

export function CoursesList({ courses }: { courses: CourseMinimal[] | null }) {
  const { user } = useAuth()
  const pathname = usePathname()
  const enrolledCourseIDs = user?.enrolledCourseIDs || {}
  const learnerCompletedTopics = user?.completedTopics || {}
  
  type Module_Prop={
    module: {
            moduleTopics: {
                topicId: number;
            }[];
        };
  }

  function CourseDetail(totalModules: Module_Prop[]) {
    let topics = 0,
      completedTopics = 0
    totalModules.forEach((prop: Module_Prop) => {
      topics += prop.module.moduleTopics.length
      completedTopics += prop.module.moduleTopics.filter((prop: ModuleTopic) =>
        learnerCompletedTopics[Number(prop.topicId)],
      ).length
    })
    return { modules: totalModules.length, topics, progress: Math.round((completedTopics / topics) * 100) }
  }


  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses!.map((course) => {
        const modules = course._count.programModules
        const {topics, progress} = CourseDetail(course.programModules)
        if (!(pathname?.startsWith("/dashboard") && progress == 100) && !(pathname?.startsWith("/student/courses") && !enrolledCourseIDs[Number(course.id)]))
          return (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/60 bg-white rounded-2xl"
            >
              <div className="h-48 relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {course.image ? (
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-white opacity-70" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {course.level && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-500 text-white hover:bg-blue-600 font-semibold">
                      {course.level}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-5">
                {course.rating && (
                  <div className="flex items-center text-sm mb-3 gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(course.rating!) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span className="text-gray-500">({course.enrollments.length} students)</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{course.description}</p>
                <div className="flex items-center mb-4 pb-4 border-b border-gray-200/60">
                  <div className="relative w-10 h-10 mr-3 flex-shrink-0">
                    <Image
                      src={course.instructorAvatar || "/placeholder.svg?height=40&width=40"}
                      alt={course.instructor}
                      fill
                      className="rounded-full object-cover object-center"
                      sizes="40px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Instructor</p>
                    <p className="text-sm text-gray-900 font-semibold truncate">{course.instructor}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  {course.totalTimeLimit && (
                    <div className="flex flex-col items-center p-2 bg-blue-50/50 rounded-lg">
                      <Clock className="h-4 w-4 text-blue-600 mb-1" />
                      <span className="text-xs text-gray-600 font-medium">{course.totalTimeLimit}h</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center p-2 bg-indigo-50/50 rounded-lg">
                    <BookOpen className="h-4 w-4 text-indigo-600 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{modules}M</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-purple-50/50 rounded-lg">
                    <FileText className="h-4 w-4 text-purple-600 mb-1" />
                    <span className="text-xs text-gray-600 font-medium">{topics}T</span>
                  </div>
                </div>

                {enrolledCourseIDs[Number(course.id)] ? (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Progress</span>
                      <span className="text-sm font-bold text-indigo-600">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 rounded-full [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-indigo-600" />
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 mb-3 font-medium">Not started</div>
                )}
                
                <div className="flex items-center justify-between gap-3">
                  {!enrolledCourseIDs[Number(course.id)] && (
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-2xl font-bold text-gray-900">₹{course.price!}</p>
                    </div>
                  )}
                  {enrolledCourseIDs[Number(course.id)] ? (
                    <Link href={`/courses/${course.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold rounded-lg">
                        Continue
                      </Button>
                    </Link>
                  ) : (
                    <Link href={`/payment/${course.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg">
                        Enroll Now
                      </Button>
                    </Link>
                  )}
                </div>

              </CardContent>
            </Card>
          )
      })}
    </div>
  )
}
