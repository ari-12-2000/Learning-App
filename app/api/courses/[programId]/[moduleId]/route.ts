import { CourseController } from "@/controllers/courseController"
import { NextRequest } from "next/server"

export async function POST(req:NextRequest, {params}:{params:Promise<{programId:string, moduleId:string}>}){
    return  CourseController.mapProgramsandmodules(req,{params})  
}