import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export class ResourceController {
  // GET ALL RESOURCES
  static async getAllResources() {
    try {
      const resources = await prisma.resource.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      return NextResponse.json({ success: true, data: resources }, { status: 200 });
    } catch (error) {
      console.error('Error fetching resources:', error);
      return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
    }
  }

  // GET RESOURCE BY ID
  static async getResourceById({ params }: { params: { id: string } }) {
    try {
      const id = Number(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid resource ID' }, { status: 400 });
      }

      const resource = await prisma.resource.findUnique({ where: { id } });

      if (!resource) {
        return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: resource }, { status: 200 });
    } catch (error) {
      console.error('Error fetching resource:', error);
      return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
    }
  }

  // CREATE RESOURCE
  static async createResource(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.title?.trim() || !data.resourceType?.trim()) {
        return NextResponse.json(
          { error: 'Title and resource type are required' },
          { status: 400 }
        );
      }

      const resource = await prisma.resource.create({ data });

      return NextResponse.json({ success: true, data: resource }, { status: 201 });
    } catch (error) {
      console.error('Error creating resource:', error);
      return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
    }
  }

  // UPDATE RESOURCE
  static async updateResource(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const id = Number(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid resource ID' }, { status: 400 });
      }

      const data = await req.json();

      const updatedResource = await prisma.resource.update({
        where: { id },
        data,
      });

      return NextResponse.json({ success: true, data: updatedResource }, { status: 200 });
    } catch (error) {
      console.error('Error updating resource:', error);
      return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
    }
  }
}
