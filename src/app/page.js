'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CanvasProvider } from '../context/canvasContext';
import Canvas from './canvas/page';
import Navbar from './components/Navbar';
import Loading from './components/loading';
import Gallery from './components/gallery';

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') {
			return;
		}

		if (!session) {
			router.push('/login');
		}
	}, [status, session, router]);

	if (status === 'loading') {
		return <Loading />;
	}

	return (
		<main className=' flex flex-col h-screen w-screen'>
			<CanvasProvider>
				<Navbar />
				<div className='flex flex-row  h-full w-full'>
					<Gallery />
					<Canvas />
				</div>
			</CanvasProvider>
		</main>
	);
}
