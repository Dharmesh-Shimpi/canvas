import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './loading';
import * as fabric from 'fabric';
import { useCanvas } from '@/context/canvasContext';
import CIcon from '@coreui/icons-react';
import { cilImage } from '@coreui/icons';

const POLL_INTERVAL = 5000;

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
		<div className='flex justify-start flex-col w-1/6 items-center bg-gray-500 shadow-xl'>
			<div className='flex flex-row justify-start items-end drop-shadow-md py-5 h-30 w-5/6 z-10'>
				<CIcon
					className='h-6 mx-2'
					icon={cilImage}
				/>
				<h2 className=' text-base'>Images</h2>
			</div>
			<div className=' overflow-auto flex flex-col justify-start items-center relative pt-5 z-0'>
				{loading && <Loading />}
				{error && <p>Error loading uploads</p>}
				{images.length > 0 ? (
					images.map((upload) => (
						<img
							key={upload.id}
							src={upload.url}
							alt={`Upload ${upload.id}`}
							className='w-5/6 rounded-lg shadow-lg m-2 cursor-pointer'
							onClick={(e) => handleImageClick(e, upload.url)}
						/>
					))
				) : (
					<p>Add Images</p>
				)}
			</div>
		</div>
	);
};

export default Gallery;
