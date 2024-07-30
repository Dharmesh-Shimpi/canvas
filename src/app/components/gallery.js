'use client';

import * as fabric from 'fabric';
import { useSelector } from 'react-redux';
import { useFetch } from '@/context/fetchContext';
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';
import Loading from './Loading/loading';

const Gallery = () => {
	const { images, loading, error } = useFetch();
	const canvas = useSelector((state) => state.canvas.canvas);

	const handleImageClick = (e, url) => {
		e.preventDefault();
		if (canvas) {
			fabric.Image.fromURL(url, (img) => {
				img.scaleToHeight(100);
				img.scaleToWidth(100);
				img.scale(0.5).set({ top: 0, left: 0 });
				canvas.add(img);
				canvas.renderAll();
			});
		}
	};

	return (
		<div className='container flex justify-start flex-col h-full w-[200px] items-center bg-gray-500 shadow-xl m-5 rounded-xl'>
			<div className='flex flex-row justify-center items-end drop-shadow-md py-5 z-10 mx-5'>
				<CIcon
					className='h-6'
					icon={cilImage}
				/>
				<h2 className=' text-base mx-2'>Images</h2>
			</div>
			{loading && <Loading />}
			{error && <p>Error loading uploads</p>}
			<div className=' overflow-auto flex flex-col justify-start items-center relative z-0 max-h-[500px]'>
				{images.length > 0 ? (
					images.map((upload) => (
						<img
							key={upload.id}
							src={upload.url}
							alt={`Upload ${upload.id}`}
							className='w-11/12 rounded-lg shadow-lg m-2 cursor-pointer'
							onClick={(e) => handleImageClick(e, upload.url)}
						/>
					))
				) : (
					<p className='m-5'>Upload Images to show here!!</p>
				)}
			</div>
		</div>
	);
};

export default Gallery;
