import { TopicController } from "@/controllers/topicController";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest,{params}: { params: Promise<{ id: string }> }) {
    return TopicController.getTopicById({params});
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return TopicController.updateTopic(req, {params});
}

export async function DELETE(req: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    return TopicController.deleteTopic({ params });
}