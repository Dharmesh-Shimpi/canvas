'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Image } from '../canvas/uploadImage';
import { useSelector } from 'react-redux';
import ScreenRecorder from './screenRecorder';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout, cilExternalLink } from '@coreui/icons';
import Logo from './Logo/Logo';
import Link from 'next/link';

const Navbar = () => {
	const router = useRouter();

	const { canvas } = useSelector((state) => state.canvas);

	const handleSignOut = () => {
		signOut({ redirect: false });
		router.push('/login');
	};

	return (
		<nav className='flex justify-center items-center bg-gradient-to-tl from-gray-500 to-gray-800 text-white w-full h-20 z-10 drop-shadow-2xl '>
			<div className='flex flex-row justify-between items-center  text-white w-5/6 min-w h-20'>
				<Logo />
				<div className='flex flex-row w-120 mr-9 text-white'>
					<a
						href='https://remotion-lake.vercel.app/'
						target='_blank'
						rel='videos'
						className=' flex flex-row items-center justify-center m-2
						'>
						<CIcon
							icon={cilExternalLink}
							className='h-5 m-2'
						/>
						Videos
					</a>

					<ScreenRecorder />
					<Image canvas={canvas} />
					<button
						onClick={handleSignOut}
						className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
						<CIcon
							icon={cilAccountLogout}
							className='h-6 m-2'
						/>
						Sign Out
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
