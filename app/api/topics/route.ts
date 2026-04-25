import { TopicController } from "@/controllers/topicController";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
   return TopicController.createTopic(req)
}

export async function GET() {
    return TopicController.getAllTopics();
}
