import { ModuleController } from "@/controllers/moduleController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }){
    return ModuleController.getModuleById({ params });
}
export async function PUT(req: NextRequest, { params }: { params: Promise<{ moduleId: string }> }) {
  return ModuleController.updateModule(req,{params});
}

export async function DELETE({ params }: { params: Promise<{ moduleId: string }> }) {
  return ModuleController.deleteModule({ params });
}