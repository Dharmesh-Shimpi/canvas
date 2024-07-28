import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './loading';
import * as fabric from 'fabric';
import { useCanvas } from '@/context/canvasContext';
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';

const POLL_INTERVAL = 1000;

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { canvas } = useCanvas();

	const fetchUploads = async () => {
		try {
			const response = await axios.get('/api/fetch');
			setImages(response.data.images);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUploads();
		const intervalId = setInterval(fetchUploads, POLL_INTERVAL);
		return () => clearInterval(intervalId);
	}, []);

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
			<div className=' overflow-auto flex flex-col justify-start items-center relative z-0'>
				{!loading && images.length > 0
					? images.map((upload) => (
							<img
								key={upload.id}
								src={upload.url}
								alt={`Upload ${upload.id}`}
								className='w-11/12 rounded-lg shadow-lg m-2 cursor-pointer'
								onClick={(e) => handleImageClick(e, upload.url)}
							/>
					  ))
					: !loading && <p className='m-5'>Upload Images to show here!!</p>}
			</div>
		</div>
	);
};

export default Gallery;
