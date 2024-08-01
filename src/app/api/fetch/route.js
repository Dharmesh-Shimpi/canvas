
import prisma from '../../lib/prisma';
import { getSession } from '../../lib/auth';
import { NextResponse } from 'next/server';

export async function GET(request) {
	try {
		const session = await getSession(request);

		if (!session) {
			return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
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
