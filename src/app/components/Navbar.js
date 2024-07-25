'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Image } from '../canvas/image';
import { useCanvas } from '../../context/canvasContext';
import ScreenRecorder from './screenRecorder';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';

const Navbar = () => {
	const router = useRouter();

	const { canvas } = useCanvas();

	const handleSignOut = () => {
		signOut({ redirect: false });
		router.push('/login');
	};

	return (
		<nav className='flex flex-row justify-between bg-black text-white text-xl w-full h-24'>
			<p className='flex items-center bg-clip-text text-transparent ml-9 font-bold text-3xl bg-gradient-to-r from-purple-300 to-yellow-300'>
				Canvas
			</p>

			<div className='flex flex-row w-120 mr-9 text-white'>
				<ScreenRecorder />
				<Image canvas={canvas} />
				<button
					onClick={handleSignOut}
					className='text-sm p-2 hover:text-purple-300'>
					Sign Out
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
