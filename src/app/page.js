'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CIcon } from '@coreui/icons-react';
import { cibGoogle } from '@coreui/icons';

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/canvas');
		}
	}, [status, router]);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	return (
		<main className='flex justify-center flex-col items-center bg-slate-400 h-screen w-screen'>
			{!session ? (
				<>
					<p className='text-xl m-5'>Please Login to continue</p>
					<button
						onClick={() => signIn('google')}
						className='border-black border-2 rounded-xl text-2xl  p-4 flex flex-row justify-center items-center text-black hover:shadow-slate-700 shadow-md'>
						<CIcon
							className='h-5 w-5 m-2'
							icon={cibGoogle}
						/>
						Sign in with Google
					</button>
				</>
			) : (
				<>
					<p>Welcome, {session.user.name}!</p>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			)}
		</main>
	);
}
