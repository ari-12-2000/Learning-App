import { NextRequest } from "next/server";
import { CourseController } from "@/controllers/courseController";

export async function GET(req: NextRequest, { params }: { params: Promise<{ programId: string }> }) {
    return CourseController.getEnrolledStudents(req, { params });
}