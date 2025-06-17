import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export class TopicController {

  static async updateTopic(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const data = await req.json();
      const updated = await prisma.topic.update({
        where: { id: Number((await params).id) },
        data,
      });
      return NextResponse.json({ success: true, data: updated });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
    }
  }

  static async deleteTopic({ params }: { params: Promise<{ id: string }> }) {
    try {
      await prisma.topic.delete({
        where: { id: Number((await params).id) },
      });
      return NextResponse.json({ success: true, message: 'Topic deleted' });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
    }
  }

  static async getTopicById({ params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const topic = await prisma.topic.findUnique({
        where: { id: Number(id) },
        include:{
          resources:{
            include:{
              resource:true,
            }
          }
        }
      });

      if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: topic });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
    }
  }

  static async getAllTopics() {
    try {
      const topics = await prisma.topic.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json({ success: true, data: topics });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
    }
  }
}