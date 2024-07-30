import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';

export async function getSession(request) {
	try {
		return await getServerSession({request, authOptions});
	} catch (error) {
		console.error('Error getting session:', error);
		return NextResponse.json({ error: 'Error getting session' }, { status: 500 });
	}
}
