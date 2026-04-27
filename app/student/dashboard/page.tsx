"use client"

import { ProgressCards } from "@/components/student/progress-cards"
import { Sparkles, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { CoursesList } from "@/components/courses-list"
import type { CourseMinimal } from "@/types/course"
import NotFound from "@/components/not-found"
import { useGetCoursesQuery } from "@/features/course/courseApi"
import DashboardSkeleton from "./loading"

export default function DashboardPage() {
  const { user } = useAuth()
  const { data: courses, isLoading: coursesLoading, isFetching, isError } = useGetCoursesQuery(undefined)
  const finalCourses = courses?.data as CourseMinimal[] || null
  const completedTopics = user!.completedTopics
  const completedQuizzes = user!.completedQuizzes
  let totalModules = 0, totalTopics = 0, totalQuizzes = 0;
  const enrolled = finalCourses?.filter((course: CourseMinimal) => user!.enrolledCourseIDs[course.id]) ||[]
  // Fix the filtering logic for active courses
  const activeCourses = (enrolled || []).filter((course) => {
    totalModules += course.programModules.length;

    // Check incomplete topics
    const hasIncompleteTopic = course.programModules.some((programModule) => {
      const topics = programModule.module.moduleTopics;
      totalTopics += topics.length;
      return topics.some((topic) => !completedTopics[Number(topic.topicId)]);
    });

    // Check incomplete quizzes
    const hasIncompleteQuiz = course.quizzes.some((quiz) => {
      totalQuizzes++
      return !completedQuizzes[quiz.id];
    });

    return hasIncompleteTopic || hasIncompleteQuiz;
  });


  let moduleProgress = { modules: totalModules, completed: Object.keys(user!.completedModules).length || 0 }
  let topicProgress = { topics: totalTopics, completed: Object.keys(user!.completedTopics).length || 0 }
  let courseProgress = { courses: enrolled.length, completed: Object.keys(user!.enrolledCourseIDs).length - activeCourses.length }
  let quizProgress = { quizzes: totalQuizzes, completed: Object.keys(user!.completedQuizzes).length || 0 }


  if(coursesLoading || isFetching) // it is rtk client side api calling . isFetching means client side refetching on focus or reconnect etc.
    return <DashboardSkeleton/>

  if(!finalCourses || isError)
    return <NotFound resource="Courses"/>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        {enrolled.length > 0 ? (
          <>
            {/* Header Section */}
            <section className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">Welcome back, {user!.first_name}!</h1>
              <p className="text-lg text-slate-600">Continue your learning journey. You're making excellent progress!</p>
            </section>

            {/* Progress Cards */}
            <div className="mb-16">
              <ProgressCards courseProgress={courseProgress} moduleProgress={moduleProgress} topicProgress={topicProgress} quizProgress={quizProgress} />
            </div>

            {/* Active Courses Section */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Active Courses</h2>
                  <p className="text-slate-600 mt-1">Continue learning from where you left off</p>
                </div>
                <Link href="/student/courses" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2 transition-colors">
                  View All →
                </Link>
              </div>

              {activeCourses.length > 0 ? (
                <CoursesList courses={activeCourses} />
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full mb-6">
                    <TrendingUp className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">All caught up!</h3>
                  <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                    Congratulations! You&apos;ve completed all your enrolled courses. Check back later for new content or explore additional courses.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/student/courses">
                      <Button variant="outline" className="w-full sm:w-auto border-slate-300 text-slate-900 hover:bg-slate-50">
                        View Completed Courses
                      </Button>
                    </Link>
                    <Link href="/">
                      <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                        Explore New Courses
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-8">
                <Sparkles className="h-10 w-10 text-blue-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Welcome, {user!.first_name}!</h1>
              <h2 className="text-2xl font-semibold text-slate-700 mb-4">No courses enrolled yet</h2>
              <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                Discover our comprehensive range of expertly designed courses. Learn at your own pace, develop new skills, and unlock opportunities for growth.
              </p>
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8 py-3">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
