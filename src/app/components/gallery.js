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
				canvas.add(img);
				canvas.renderAll();
			});
		}
	};

	return (
		<div className='flex justify-start flex-col w-2/6 items-center bg-gray-500 overflow-auto shadow-xl'>
			<div className='flex flex-row justify-center items-center fixed shadow-xl h-15 w-fit z-10'>
				<CIcon
					className='h-7 w-7 m-2'
					icon={cilImage}
				/>
				<h2 className='my-5 text-xl text-center'>Images</h2>
			</div>
			<div className=' flex flex-col justify-start items-center relative top-20 z-0'>
				{loading && <Loading />}
				{error && <p>Error loading uploads</p>}
				{images ? (
					images.map((upload) => (
						<img
							key={upload.id}
							src={upload.url}
							alt={`Upload ${upload.id}`}
							className=' w-5/6 rounded-lg shadow-lg m-2'
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