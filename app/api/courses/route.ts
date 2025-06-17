import { CourseController } from "@/controllers/courseController";
import { NextRequest } from "next/server";


export async function GET() {

  return CourseController.getAllCourses();
}

export async function POST(req: NextRequest) {

  return CourseController.createCourse(req);
}