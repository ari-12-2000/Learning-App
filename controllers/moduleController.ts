import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export class ModuleController{
  static async createModule(req: NextRequest) {
    try {
      const data = await req.json();
      const module = await prisma.module.create({ data });
      return NextResponse.json({ success: true, data: module });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
    }
  }

    static async updateModule(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
    try {
      const data = await req.json();
      const updated = await prisma.module.update({
        where: { id: Number((await params).moduleId) },
        data,
      });
      return NextResponse.json({ success: true, data: updated });
    } catch (error) {
      console.error('Error:',error)
      return NextResponse.json({ error: 'Failed to update module' }, { status: 500 });
    }
  }

  static async deleteModule({ params }: { params: Promise<{ moduleId: string }> }) {
    try {
      await prisma.module.delete({
        where: { id: Number((await params).moduleId) },
      });
      return NextResponse.json({ success: true, message: 'Module deleted' });
    } catch (error) {
      console.error('Error:',error)
      return NextResponse.json({ error: 'Failed to delete module' }, { status: 500 });
    }
  }

  static async getAllModules() {
    try {
      const modules = await prisma.module.findMany({
        orderBy: {
          createdAt: 'desc',
        },
    });
      return NextResponse.json({ success: true, data: modules });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch modules' }, { status: 500 });
    }
  }

  static async getModuleById({ params }: { params: Promise<{ moduleId: string }> }){
     try {
      const module= await prisma.module.findUnique({
        where: { id: Number((await params).moduleId) },
        include:{
          moduleTopics:{
            select:{
              topicId:true,
              position:true,
            }
          }
        }
      });
      return NextResponse.json({ success: true, data:module });
    } catch (error) {
      console.error('Error:',error)
      return NextResponse.json({ error: 'Failed to fetch module' }, { status: 500 });
    } 
  }
}

//mapping modules and topics

export async function mapModulesAndTopics(req:NextRequest, {params}:{params:Promise<{moduleId:string, topicId:string}>}){
  try{
       const { topicId, moduleId}= await params;
       const {position}= await req.json();
       const mapping= await prisma.moduleTopic.create({
        data: { topicId: Number(topicId), moduleId: Number(moduleId), position:Number(position)},
       });

       return NextResponse.json({ success: true, data: mapping });
     }catch(error){
        console.error("Map modules and topics error:", error); // LOG FULL ERROR
      return NextResponse.json({ error: 'Failed to map modules and topics' }, { status: 500 });
     }
}