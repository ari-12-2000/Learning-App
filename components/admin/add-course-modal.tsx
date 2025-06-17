"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X, Upload } from "lucide-react"

interface AddCourseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddCourseModal({ open, onOpenChange }: AddCourseModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "",
    category: "",
    modules: [{ title: "", description: "" }],
    thumbnail: null as File | null,
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle course creation logic here
    console.log("Course data:", courseData)
    onOpenChange(false)
    setCurrentStep(1)
    setCourseData({
      title: "",
      description: "",
      duration: "",
      difficulty: "",
      category: "",
      modules: [{ title: "", description: "" }],
      thumbnail: null,
    })
  }

  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, { title: "", description: "" }],
    })
  }

  const removeModule = (index: number) => {
    const newModules = courseData.modules.filter((_, i) => i !== index)
    setCourseData({ ...courseData, modules: newModules })
  }

  const updateModule = (index: number, field: string, value: string) => {
    const newModules = courseData.modules.map((module, i) => (i === index ? { ...module, [field]: value } : module))
    setCourseData({ ...courseData, modules: newModules })
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                placeholder="Enter course title"
                value={courseData.title}
                onChange={(e) => setCourseData({ ...courseData, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description"
                value={courseData.description}
                onChange={(e) => setCourseData({ ...courseData, description: e.target.value })}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 8 hours"
                  value={courseData.duration}
                  onChange={(e) => setCourseData({ ...courseData, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={courseData.difficulty}
                  onValueChange={(value) => setCourseData({ ...courseData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={courseData.category}
                onValueChange={(value) => setCourseData({ ...courseData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="mobile-development">Mobile Development</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Course Modules</Label>
              <Button type="button" variant="outline" size="sm" onClick={addModule}>
                <Plus className="h-4 w-4 mr-2" />
                Add Module
              </Button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {courseData.modules.map((module, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Module {index + 1}</CardTitle>
                      {courseData.modules.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeModule(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`module-title-${index}`}>Module Title</Label>
                      <Input
                        id={`module-title-${index}`}
                        placeholder="Enter module title"
                        value={module.title}
                        onChange={(e) => updateModule(index, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`module-description-${index}`}>Module Description</Label>
                      <Textarea
                        id={`module-description-${index}`}
                        placeholder="Enter module description"
                        value={module.description}
                        onChange={(e) => updateModule(index, "description", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Course Thumbnail</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your thumbnail here, or click to browse</p>
                <Button type="button" variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <Label>Course Summary</Label>
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Title:</span>
                      <span>{courseData.title || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Duration:</span>
                      <span>{courseData.duration || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Difficulty:</span>
                      <span className="capitalize">{courseData.difficulty || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Category:</span>
                      <span className="capitalize">{courseData.category?.replace("-", " ") || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Modules:</span>
                      <span>{courseData.modules.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Step {currentStep} of 3:{" "}
            {currentStep === 1 ? "Basic Information" : currentStep === 2 ? "Course Modules" : "Review & Publish"}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {/* Progress indicator */}
          <div className="flex items-center mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {renderStep()}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button type="button" variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="space-x-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              {currentStep === 3 ? (
                <Button type="button" onClick={handleSubmit}>
                  Create Course
                </Button>
              ) : (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
