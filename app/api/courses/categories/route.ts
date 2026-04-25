import { CourseController } from "@/controllers/courseController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  return CourseController.getCourseCategories();
}