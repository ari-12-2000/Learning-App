"use client"

import { CoursesList } from "@/components/courses-list"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useGetCoursesQuery } from "@/features/course/courseApi";
import { CourseMinimal } from "@/types/course";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Loading from "./loading";
import NotFound from "@/components/not-found";

export default function CoursesPage() {
  const { user } = useAuth()
  const hasCourses = Object.keys(user!.enrolledCourseIDs).length> 0
  const { data:courses, isLoading:coursesLoading, isFetching, isError } = useGetCoursesQuery(undefined)
  const finalCourses = courses?.data as CourseMinimal[] || null
  if(coursesLoading || isFetching) // it is rtk client side api calling . isFetching means client side refetching on focus or reconnect etc.
    return <Loading/>

  if(!finalCourses || isError)
      return <NotFound resource="Courses"/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">My Courses</h1>
          <p className="text-lg text-slate-600">
            {hasCourses
              ? "Continue your learning journey and unlock your full potential."
              : "You haven't enrolled in any courses yet."}
          </p>
        </div>

        {/* Courses Grid or Empty State */}
        {hasCourses ? (
          <CoursesList courses={finalCourses} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-8">
              <Sparkles className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              No Courses Enrolled Yet
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto mb-8 text-center text-lg leading-relaxed">
              Explore our comprehensive course library to start learning. From beginner fundamentals to advanced topics, there&apos;s something for everyone.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base px-8 py-3">
                Browse All Courses
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
