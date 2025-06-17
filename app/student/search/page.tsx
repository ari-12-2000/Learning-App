"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Star, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const allCourses = [
  {
    id: "react-fundamentals",
    title: "React Fundamentals",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: 12543,
    duration: "8 weeks",
    level: "Beginner",
    price: 89,
    enrolled: true,
    progress: 65,
    category: "Web Development",
    description: "Master the fundamentals of React and build modern web applications",
    image: "bg-gradient-to-br from-blue-400 to-blue-600",
    modules: 12,
    lessons: 48,
  },
  {
    id: "ui-ux-design",
    title: "Complete UI/UX Design Course",
    instructor: "Mike Chen",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.9,
    students: 8932,
    duration: "10 weeks",
    level: "Intermediate",
    price: 129,
    enrolled: true,
    progress: 30,
    category: "Design",
    description: "Learn to design beautiful and user-friendly interfaces",
    image: "bg-gradient-to-br from-purple-400 to-pink-600",
    modules: 15,
    lessons: 62,
  },
  {
    id: "python-data-science",
    title: "Python for Data Science",
    instructor: "Dr. Emily Rodriguez",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.7,
    students: 15678,
    duration: "12 weeks",
    level: "Intermediate",
    price: 149,
    enrolled: false,
    progress: 0,
    category: "Data Science",
    description: "Comprehensive Python course for data analysis and machine learning",
    image: "bg-gradient-to-br from-green-400 to-teal-600",
    modules: 18,
    lessons: 75,
  },
  {
    id: "mobile-app-development",
    title: "React Native Mobile Development",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.6,
    students: 6789,
    duration: "14 weeks",
    level: "Advanced",
    price: 199,
    enrolled: false,
    progress: 0,
    category: "Mobile Development",
    description: "Build cross-platform mobile apps with React Native",
    image: "bg-gradient-to-br from-orange-400 to-red-600",
    modules: 20,
    lessons: 85,
  },
  {
    id: "machine-learning",
    title: "Machine Learning Fundamentals",
    instructor: "Dr. James Wilson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    students: 9876,
    duration: "16 weeks",
    level: "Advanced",
    price: 249,
    enrolled: false,
    progress: 0,
    category: "Machine Learning",
    description: "Deep dive into machine learning algorithms and applications",
    image: "bg-gradient-to-br from-red-400 to-pink-600",
    modules: 22,
    lessons: 95,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Mastery",
    instructor: "Lisa Anderson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5,
    students: 5432,
    duration: "8 weeks",
    level: "Beginner",
    price: 79,
    enrolled: true,
    progress: 85,
    category: "Marketing",
    description: "Complete guide to digital marketing strategies and tools",
    image: "bg-gradient-to-br from-pink-400 to-purple-600",
    modules: 10,
    lessons: 40,
  },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCourses, setFilteredCourses] = useState(allCourses)

  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchTerm(query)

    if (query) {
      const filtered = allCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(query.toLowerCase()) ||
          course.instructor.toLowerCase().includes(query.toLowerCase()) ||
          course.description.toLowerCase().includes(query.toLowerCase()) ||
          course.category.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredCourses(filtered)
    } else {
      setFilteredCourses(allCourses)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      const filtered = allCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCourses(filtered)
    } else {
      setFilteredCourses(allCourses)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Courses</h1>
        <form onSubmit={handleSearch} className="max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search for courses, instructors, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-3 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500"
          />
        </form>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
          >
            <div className={`h-40 ${course.image} relative`}>
              {course.enrolled && (
                <div className="absolute top-3 right-3">
                  <Badge className="bg-green-500 text-white hover:bg-green-500">Enrolled</Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="text-xs">
                  {course.level}
                </Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {course.title}
              </h3>

              <div className="flex items-center mb-3">
                <img
                  src={course.instructorAvatar || "/placeholder.svg"}
                  alt={course.instructor}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">{course.instructor}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              {course.enrolled && course.progress > 0 && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-blue-600">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-1.5" />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="font-bold text-gray-900">{!course.enrolled && <span>${course.price}</span>}</div>
                <Link href={`/student/courses/${course.id}`}>
                  <Button
                    size="sm"
                    className={course.enrolled ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"}
                  >
                    {course.enrolled ? "Continue" : "Enroll"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No courses found matching your search.</p>
          <p className="text-gray-400 mt-2">Try searching with different keywords.</p>
        </div>
      )}
    </div>
  )
}
