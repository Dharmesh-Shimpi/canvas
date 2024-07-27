import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export async function GET() {
	try {
		const videos = await prisma.recording.findMany();
		console.log(videos, 'end');

		return NextResponse.json({ videos, status: 200 });
	} catch (error) {
		console.error('Error fetching uploads:', error);
		return NextResponse.json(
			{ error: 'Error fetching uploads' },
			{ status: 500 },
		);
	}
}
