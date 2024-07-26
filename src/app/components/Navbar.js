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
		<nav className='flex flex-row justify-between items-center bg-gradient-to-tr from-gray-500 to-gray-800 text-white text-xl w-full h-24 z-10 drop-shadow-2xl '>
			<p className='flex items-center bg-clip-text text-transparent ml-9  text-6xl bg-gradient-to-tl from-purple-500 to-green-300 antialiased font-thin'>
				Canvas
			</p>

			<div className='flex flex-row w-120 mr-9 text-white'>
				<ScreenRecorder />
				<Image canvas={canvas} />
				<button
					onClick={handleSignOut}
					className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
					<CIcon
						icon={cilAccountLogout}
						className='h-7 w-7 m-2'
					/>
					Sign Out
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
