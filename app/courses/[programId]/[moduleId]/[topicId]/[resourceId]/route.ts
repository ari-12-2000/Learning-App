import { NextRequest } from "next/server";
import { CourseController } from "@/controllers/courseController";

export async function POST(req: NextRequest, { params }: { params: Promise<{ programId: string, resourceId: string, moduleId: string, topicId: string }> }) {
    return CourseController.mapModulesAndResources(req, { params });
}