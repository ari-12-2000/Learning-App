import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export class ResourceController{
    static async getAllResources() {
        try {
            const resources = await prisma.resource.findMany({
                
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return NextResponse.json({ success: true, data: resources });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
        }
    }

    static async getResourceById({ params }: { params: { id: string } }) {
        try {
            const resource = await prisma.resource.findUnique({
                where: { id: Number((await params).id) },
                
            });

            if (!resource) {
                return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
            }

            return NextResponse.json({ success: true, data: resource });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
        }
    }

    static async createResource(req: NextRequest) {
        try {
            const data = await req.json();
            const resource = await prisma.resource.create({
                data,
            });
            return NextResponse.json({ success: true, data: resource });
        } catch (error) {
            console.error('Error creating resource:', error);
            return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
        }
    }

    static async updateResource(req: NextRequest, { params }: { params: { id: string } }) {
        try {
            const data = await req.json();
            const resource = await prisma.resource.update({
                where: { id: Number((await params).id) },
                data,
            });
            return NextResponse.json({ success: true, data: resource });
        } catch (error) {
            return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
        }
    }
}