import { hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
	try {
		const { email, password } = await req.json();

		if (!email || !password) {
			return new Response(
				JSON.stringify({ error: 'Email and password are required' }),
				{ status: 400 },
			);
		}

		// if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return new Response(JSON.stringify({ error: 'User already exists' }), {
				status: 400,
			});
		}

		const hashedPassword = await hash(password, 10);

        const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return new Response(
			JSON.stringify({ message: 'User created successfully', user }),
			{ status: 201 },
		);
	} catch (error) {
		console.error('Registration error:', error);
		return new Response(JSON.stringify({ error: 'Registration failed' }), {
			status: 500,
		});
	}
}
