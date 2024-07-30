'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '../context/store';
import { FetchProvider } from '../context/fetchContext.js';
import Canvas from './canvas/canvas.js';
import Navbar from './components/Navbar';
import Loading from './components/Loading/loading.js';
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
		return (
			<main className='flex justify-center items-center h-screen w-screen'>
				<Loading />
			</main>
		);
	}

	return (
		<Provider store={store}>
			<main className='flex flex-col h-screen w-screen'>
				<FetchProvider>
					<Navbar />
					<div className='overflow-auto flex justify-center items-center h-full w-full bg-gradient-to-br from-gray-500 to-gray-800'>
						<div className='overflow-auto flex flex-row max-h-full max-w-full'>
							<Gallery />
							<Canvas />
						</div>
					</div>
				</FetchProvider>
			</main>
		</Provider>
	);
}
