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

  return (<div className="max-w-7xl mx-auto text-center px-4 sm:px-6 md:px-8 py-16 md:py-24">
     <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            My Enrolled Courses
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            {hasCourses
              ? "Keep progressing and unlock your full potential."
              : "You haven’t enrolled in any courses yet."}
          </p>
        </div>

    {hasCourses ? (
        <CoursesList courses={finalCourses} />
    ) : (<div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mx-auto mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Courses Enrolled Yet
            </h2>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              Explore our course library to start learning. From beginner to advanced, there’s something for everyone.
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-md px-6 py-3 rounded-lg">
                Browse Courses
              </Button>
            </Link>
          </div>
        )}
  </div>
  )
}
