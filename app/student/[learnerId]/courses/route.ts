import { LearnerController } from "@/controllers/learnerController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest,{params}:{ params: { learnerId: string } }) {
    return LearnerController.getEnrolledCourses({params});
}

export async function POST(req:NextRequest,{params}:{ params: { learnerId: string } }){
    return LearnerController.enrolInCourses(req,{params});
}

export async function DELETE(req:NextRequest,{params}:{ params: { learnerId: string } }){
    return LearnerController.unenrollFromCourse(req,{params});
}