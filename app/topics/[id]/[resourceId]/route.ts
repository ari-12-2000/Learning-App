import { TopicController } from "@/controllers/topicController";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest,{params}:{params:Promise<{id:string, resourceId:string}>}){
     return TopicController.mapTopicsAndResources(req,{params});
}