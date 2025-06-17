import { NextRequest} from 'next/server';
import { ResourceController } from '@/controllers/resourceController';

export async function GET() {
    return ResourceController.getAllResources();
}

export async function POST(req: NextRequest) {
    return ResourceController.createResource(req);
}