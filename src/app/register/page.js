'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import Loading from '../components/loading';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);

			const response = await axios.post('/api/auth/register', {
				email,
				password,
			});

			setLoading(false);
			
			if (response.status === 201) {
				router.push('/login');
			} else {
				console.error('Registration failed', response.data);
				alert(response.data.error || 'Registration failed');
			}
		} catch (error) {
			console.error('Registration failed', error);
			alert('Registration failed');
		}
	};

	return (
		<div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
			<div className='w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md'>
				<h2 className='text-2xl font-bold text-center'>Register</h2>
				<form
					onSubmit={handleRegister}
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
						{!loading && 'Register'}
					</button>
				</form>
				<div className='text-center'>
					<p className='text-sm'>
						Already have an account?{' '}
						<Link
							href='/login'
							className='text-blue-500 hover:underline'>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
