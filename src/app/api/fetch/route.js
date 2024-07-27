import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const session = await getServerSession({ req, ...authOptions });

		if (!session) {
			return new Response(JSON.stringify({ error: 'Not authenticated' }), {
				status: 401,
			});
		}

		const userId = session.user.id;

		const images = await prisma.image.findMany({
			where: { userId },
		});

		const videos = await prisma.recording.findMany({
			where: { userId },
		});

		return NextResponse.json({ images, videos }, { status: 200 });
	} catch (error) {
		console.error('Error fetching uploads:', error);
		return NextResponse.json(
			{ error: 'Error fetching uploads' },
			{ status: 500 },
		);
	}
}
