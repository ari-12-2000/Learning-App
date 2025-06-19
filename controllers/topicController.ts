import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export class TopicController {
  // Create Topic
  static async createTopic(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.title?.trim()) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 });
      }

      const topic = await prisma.topic.create({ data });
      return NextResponse.json({ success: true, data: topic }, { status: 201 });
    } catch (error) {
      console.error('Create topic error:', error);
      return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
    }
  }

  // Update Topic
  static async updateTopic(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const data = await req.json();

      const topicId = Number(id);
      if (isNaN(topicId)) {
        return NextResponse.json({ error: 'Invalid topic ID' }, { status: 400 });
      }

      const updated = await prisma.topic.update({
        where: { id: topicId },
        data,
      });

      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (error) {
      console.error('Update topic error:', error);
      return NextResponse.json({ error: 'Failed to update topic' }, { status: 500 });
    }
  }

  // Delete Topic
  static async deleteTopic({ params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const topicId = Number(id);
      if (isNaN(topicId)) {
        return NextResponse.json({ error: 'Invalid topic ID' }, { status: 400 });
      }

      await prisma.topic.delete({
        where: { id: topicId },
      });

      return NextResponse.json({ success: true, message: 'Topic deleted' }, { status: 200 });
    } catch (error) {
      console.error('Delete topic error:', error);
      return NextResponse.json({ error: 'Failed to delete topic' }, { status: 500 });
    }
  }

  // Get Topic by ID
  static async getTopicById({ params }: { params: Promise<{ id: string }> }) {
    try {
      const { id } = await params;
      const topicId = Number(id);
      if (isNaN(topicId)) {
        return NextResponse.json({ error: 'Invalid topic ID' }, { status: 400 });
      }

      const topic = await prisma.topic.findUnique({
        where: { id: topicId },
        include: {
          topicResources: {
            include: {
              resource: true,
            },
          },
        },
      });

      if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: topic }, { status: 200 });
    } catch (error) {
      console.error('Get topic error:', error);
      return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
    }
  }

  // Get All Topics
  static async getAllTopics() {
    try {
      const topics = await prisma.topic.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, data: topics }, { status: 200 });
    } catch (error) {
      console.error('Get all topics error:', error);
      return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
    }
  }

  // Map Topics and Resources
  static async mapTopicsAndResources(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; resourceId: string }> }
  ) {
    try {
      const { id, resourceId } = await params;
      const topicId = Number(id);
      const resId = Number(resourceId);
      const { position } = await req.json();

      if (isNaN(topicId) || isNaN(resId) || typeof position !== 'number') {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
      }

      const mapping = await prisma.topicResource.create({
        data: {
          topicId,
          resourceId: resId,
          position,
        },
      });

      return NextResponse.json({ success: true, data: mapping }, { status: 201 });
    } catch (error) {
      console.error('Map topics and resources error:', error);
      return NextResponse.json({ error: 'Failed to create mapping' }, { status: 500 });
    }
  }
}
