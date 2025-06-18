"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Filter, X, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import Loading from "./loading"
import { CoursesList } from "@/components/courses-list"

interface FilterState {
  priceRange: [number, number]
  categories: string[]
  levels: string[]
  ratings: string
  duration: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [allCourses, setAllCourses] = useState<any[] | null>(null)
  const [filteredCourses, setFilteredCourses] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 500],
    categories: [],
    levels: [],
    ratings: "",
    duration: [],
  })

  const categories = [
    "Web Development",
    "UI/UX Design",
    "Data Science",
    "Mobile Development",
    "Machine Learning",
    "Digital Marketing",
    "Cybersecurity",
    "Cloud Computing",
  ]

  const levels = ["Beginner", "Intermediate", "Advanced"]
  const durations = ["0-2 hours", "2-5 hours", "5-10 hours", "10+ hours"]

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch all courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses")
        if (!res.ok) throw new Error("Failed to fetch courses")
        const data = await res.json()
        setAllCourses(data.data || [])
        setFilteredCourses(data.data || [])
      } catch (err) {
        console.error("Error fetching courses:", err)
        setAllCourses([])
        setFilteredCourses([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  // Sync search term from URL
  useEffect(() => {
    const query = searchParams.get("q") || ""
    setSearchTerm(query)
  }, [searchParams])

  // Apply all filters
  useEffect(() => {
    if (!allCourses) return

    let filtered = allCourses

    // Search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((course: any) =>
        [course.title, course.instructor, course.description, course.category].some((field: string) =>
          field?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    }

    // Price filter
    filtered = filtered.filter((course: any) => {
      const price = Number.parseFloat(course.price) || 0
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((course: any) => filters.categories.includes(course.category))
    }

    // Level filter
    if (filters.levels.length > 0) {
      filtered = filtered.filter((course: any) => filters.levels.includes(course.level))
    }

    // Rating filter
    if (filters.ratings) {
      const minRating = Number.parseInt(filters.ratings)
      filtered = filtered.filter((course: any) => {
        const rating = Number.parseFloat(course.rating) || 0
        return rating >= minRating
      })
    }

    setFilteredCourses(filtered)
  }, [searchTerm, allCourses, filters])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      categories: checked ? [...prev.categories, category] : prev.categories.filter((c) => c !== category),
    }))
  }

  const handleLevelChange = (level: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      levels: checked ? [...prev.levels, level] : prev.levels.filter((l) => l !== level),
    }))
  }

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }))
  }

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 500],
      categories: [],
      levels: [],
      ratings: "",
      duration: [],
    })
  }

  if (isLoading) return <Loading />

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Filter Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>

      {/* Filter Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          mounted ? "block" : "hidden",
        )}
      >
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-blue-600 hover:text-blue-700">
                Clear All
              </Button>
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Price</h3>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={500}
                min={0}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={category} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Level */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Level</h3>
            <div className="space-y-3">
              {levels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={level}
                    checked={filters.levels.includes(level)}
                    onCheckedChange={(checked) => handleLevelChange(level, checked as boolean)}
                  />
                  <Label htmlFor={level} className="text-sm font-normal">
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ratings</h3>
            <RadioGroup
              value={filters.ratings}
              onValueChange={(value) => setFilters((prev) => ({ ...prev, ratings: value }))}
            >
              {[4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <RadioGroupItem value={rating.toString()} id={`rating-${rating}`} />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm font-normal">
                    {rating}
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                    <span className="ml-1">and above</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 lg:ml-0 ml-16">
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

          {/* Course Count */}
          <div className="mb-6 lg:ml-0 ml-16">
            <p className="text-gray-600">
              {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {/* Results */}
          <div className="lg:ml-0 ml-16">
            {filteredCourses.length > 0 ? (
              <CoursesList courses={filteredCourses} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
