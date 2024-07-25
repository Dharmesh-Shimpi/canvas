'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Loading from '../components/loading';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		const result = await signIn('credentials', {
			redirect: false,
			email,
			password,
		});

		setLoading(false);

		if (result.ok) {
			router.push('/');
		} else {
			alert('Login failed');
		}
	};

	return (
		<div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
			<div className='w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md'>
				<h2 className='text-2xl font-bold text-center'>Login</h2>
				<form
					onSubmit={handleLogin}
					className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-gray-700'>Email</label>
						<input
							type='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className='block w-full p-2 mt-1 border border-gray-300 rounded text-black'
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>
							Password
						</label>
						<input
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className='block w-full p-2 mt-1 border border-gray-300 rounded text-black'
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex justify-center items-center'>
						{loading && <Loading />}
						{!loading && 'Login'}
					</button>
				</form>
				<div className='text-center'>
					<p className='text-sm'>
						Don't have an account?{' '}
						<Link
							href='/register'
							className='text-blue-500 hover:underline'>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
