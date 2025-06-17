"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Code,
  Palette,
  Database,
  Smartphone,
  Brain,
  TrendingUp,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Course } from "@/types"
import { CoursesList } from "@/components/courses-list"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  // Add state for courses
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<{ category: string }[]>([])
  const [loading, setLoading] = useState(true)

  // Add useEffect to fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [{ data: coursesData }, { data: categoriesData }] = await Promise.all([
          fetch("api/courses").then((res) => res.json()),
          fetch("/courses/categories").then((res) => res.json()),
        ])

        setCourses(coursesData)
       
        // Map categories with icons and colors
        const categoryIcons = {
          "Web Development": { icon: Code, color: "bg-blue-500" },
          "UI/UX Design": { icon: Palette, color: "bg-purple-500" },
          "Data Science": { icon: Database, color: "bg-green-500" },
          "Mobile Development": { icon: Smartphone, color: "bg-orange-500" },
          "Machine Learning": { icon: Brain, color: "bg-red-500" },
          "Digital Marketing": { icon: TrendingUp, color: "bg-pink-500" },
        }

        const mappedCategories = categoriesData.map((cat: { category: string }) => ({
          name: cat.category,
          icon: categoryIcons[cat.category]?.icon || Code,
          color: categoryIcons[cat.category]?.color || "bg-gray-500",
        }))

        setCategories(mappedCategories)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/student/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleCategoryClick = (categoryName: string) => {
    router.push(`/student/category/${encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, "-"))}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn Without Limits</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Start, switch, or advance your career with thousands of courses from world-class instructors
            </p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg bg-white text-gray-900 border-0 rounded-full shadow-lg"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>

                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Courses */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Courses</h2>
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <CoursesList courses={courses} />
          )}
        </section>
      </div>
    </div>
  )
}
