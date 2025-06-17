import { mapModulesAndTopics, ModuleController } from "@/controllers/moduleController"
import { NextRequest } from "next/server"

export async function POST(req:NextRequest, {params}:{params:Promise<{moduleId:string, topicId:string}>}){
    return mapModulesAndTopics(req,{params});
}
