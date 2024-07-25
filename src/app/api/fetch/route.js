import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

export async function GET(req) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) {
			return new Response(JSON.stringify({ error: 'Not authenticated' }), {
				status: 401,
			});
		}
		const userId = session.user.id;
		console.log(userId);

		const images = await prisma.image.findMany({
			where: { userId},
        });
        
        const videos = await prisma.recording.findMany({
            where: { userId },
        });

		return new Response(JSON.stringify({ images, videos }), {
			status: 200,
        });
        
	} catch (error) {
		console.error('Error fetching uploads:', error);
		return new Response(JSON.stringify({ error: 'Error fetching uploads' }), {
			status: 500,
		});
	}
}
