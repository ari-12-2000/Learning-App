import { TopicController } from "@/controllers/topicController";


export async function GET() {
    return TopicController.getAllTopics();
}
