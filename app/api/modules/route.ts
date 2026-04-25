import { ModuleController } from "@/controllers/moduleController";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
  return ModuleController.createModule(req);
}

export async function GET(){
  console.log("Fetching all modules");
  return ModuleController.getAllModules();
}