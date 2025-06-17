import { NextRequest, NextResponse } from 'next/server';
import { ResourceController } from '@/controllers/resourceController';

export async function GET({ params }: { params: { id: string } }) {
    return ResourceController.getResourceById({ params });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    return ResourceController.updateResource(req, { params });
}