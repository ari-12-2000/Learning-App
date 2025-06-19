import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export class ModuleController {
  // CREATE MODULE
  static async createModule(req: NextRequest) {
    try {
      const data = await req.json();

      if (!data.name?.trim()) {
        return NextResponse.json({ error: 'Module name is required' }, { status: 400 });
      }

      const module = await prisma.module.create({ data });
      return NextResponse.json({ success: true, data: module }, { status: 201 });
    } catch (error) {
      console.error('Create module error:', error);
      return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
    }
  }

  // UPDATE MODULE
  static async updateModule(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
    try {
      const { moduleId } = await params;
      const data = await req.json();
      const id = Number(moduleId);

      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid module ID' }, { status: 400 });
      }

      const updated = await prisma.module.update({
        where: { id },
        data,
      });

      return NextResponse.json({ success: true, data: updated }, { status: 200 });
    } catch (error) {
      console.error('Update module error:', error);
      return NextResponse.json({ error: 'Failed to update module' }, { status: 500 });
    }
  }

  // DELETE MODULE
  static async deleteModule({ params }: { params: Promise<{ moduleId: string }> }) {
    try {
      const { moduleId } = await params;
      const id = Number(moduleId);

      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid module ID' }, { status: 400 });
      }

      await prisma.module.delete({ where: { id } });

      return NextResponse.json({ success: true, message: 'Module deleted' }, { status: 200 });
    } catch (error) {
      console.error('Delete module error:', error);
      return NextResponse.json({ error: 'Failed to delete module' }, { status: 500 });
    }
  }

  // GET ALL MODULES
  static async getAllModules() {
    try {
      const modules = await prisma.module.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return NextResponse.json({ success: true, data: modules }, { status: 200 });
    } catch (error) {
      console.error('Get all modules error:', error);
      return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
    }
  }

  // GET MODULE BY ID
  static async getModuleById({ params }: { params: Promise<{ moduleId: string }> }) {
    try {
      const { moduleId } = await params;
      const id = Number(moduleId);

      if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid module ID' }, { status: 400 });
      }

      const module = await prisma.module.findUnique({
        where: { id },
        include: {
          moduleTopics: {
            select: {
              topicId: true,
              position: true,
            },
          },
        },
      });

      if (!module) {
        return NextResponse.json({ error: 'Module not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, data: module }, { status: 200 });
    } catch (error) {
      console.error('Get module by ID error:', error);
      return NextResponse.json({ error: 'Failed to fetch module' }, { status: 500 });
    }
  }

  static async mapModulesAndTopics(
    req: NextRequest,
    { params }: { params: Promise<{ moduleId: string; topicId: string }> }
  ) {
    try {
      const { topicId, moduleId } = await params;
      const { position } = await req.json();

      const moduleIdNum = Number(moduleId);
      const topicIdNum = Number(topicId);
      const positionNum = Number(position);

      if (isNaN(moduleIdNum) || isNaN(topicIdNum) || isNaN(positionNum)) {
        return NextResponse.json({ error: 'Invalid input: IDs and position must be numbers' }, { status: 400 });
      }

      const mapping = await prisma.moduleTopic.create({
        data: {
          topicId: topicIdNum,
          moduleId: moduleIdNum,
          position: positionNum,
        },
      });

      return NextResponse.json({ success: true, data: mapping }, { status: 201 });
    } catch (error) {
      console.error('Map modules and topics error:', error);
      return NextResponse.json({ error: 'Failed to map modules and topics' }, { status: 500 });
    }
  }

}
