import { CourseController } from "@/controllers/courseController"
import { NextRequest } from "next/server"

export async function GET(req:NextRequest,{ params }: { params: Promise<{ programId: string, moduleId:string }> }) {
  return CourseController.getCourseById({ params })
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
  return CourseController.updateCourse(req, { params })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
  return CourseController.deleteCourse(req, { params })
}

