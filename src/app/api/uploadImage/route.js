import { s3 } from '../../../../lib/aws';
import { PrismaClient } from '@prisma/client';
import { Buffer } from 'buffer';
import { authOptions } from '../auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

export async function POST(request) {
	try {
		const { dataURL } = await request.json();

		if (!dataURL) {
			return new Response(JSON.stringify({ error: 'Missing data' }), {
				status: 400,
			});
		}

		const base64Data = dataURL.replace(/^data:image\/png;base64,/, '');
		const buffer = Buffer.from(base64Data, 'base64');

		const fileName = `canvas-image-${Date.now()}.png`;

		const uploadParams = {
			Bucket: 'habittracker-s3-bucket',
			Key: fileName,
			Body: buffer,
			ContentEncoding: 'base64',
			ContentType: 'image/png',
		};

		const uploadResult = await s3.upload(uploadParams).promise();
		const fileUrl = uploadResult.Location;

		const session = await getServerSession(authOptions);
		if (!session) {
			return new Response(JSON.stringify({ error: 'Not authenticated' }), {
				status: 401,
			});
		}

		const userId = session.user.id;
		console.log(userId);
		
		const newImage = await prisma.image.create({
			data: {
				userId: userId,
				url: fileUrl,
				uploadedAt: new Date(),
			},
		});

		return new Response(JSON.stringify(newImage), { status: 200 });
	} catch (error) {
		console.error('Error uploading file:', error);
		return new Response(JSON.stringify({ error: 'Error uploading file' }), {
			status: 500,
		});
	}
}
