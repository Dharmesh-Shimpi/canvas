import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './loading';
import VideoPlayer from './remotion';
import { useCanvas } from '@/context/canvasContext';

const POLL_INTERVAL = 5000;

const Gallery = () => {
	const [images, setImages] = useState([]);
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedVideo, setSelectedVideo] = useState(null);
	const { thumbnail } = useCanvas();
	const fetchUploads = async () => {
		try {
			const response = await axios.get('/api/fetch');
			setImages(response.data.images);
			setVideos(response.data.videos);
			console.log(videos);
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

	if (loading) return <Loading />;
	if (error) return <p>Error loading uploads: {error.message}</p>;

	return (
		<>
			<div className='flex w-1/4 flex-row bg-gray-500'>
				<div className='flex justify-start flex-col w-1/2 items-center'>
					<h2 className='mt-5'>Images</h2>
					{images ? (
						images.map((upload) => (
							<img
								key={upload.id}
								src={upload.url}
								alt={`Upload ${upload.id}`}
								className=' w-1/2 border-gray-200 rounded shadow mb-2'
							/>
						))
					) : (
						<p>Add Images</p>
					)}
				</div>

				<div className='flex justify-start flex-col w-1/2 items-center'>
					<h2 className='mt-5'>Videos</h2>
					{videos ? (
						videos.map((upload) => (
							<div
								key={upload.id}
								className='w-full h-auto border border-gray-200 rounded shadow cursor-pointer'
								onClick={() => setSelectedVideo(upload.url)}>
								<p className='text-center'>click here</p>
							</div>
						))
					) : (
						<p>Add Videos</p>
					)}
				</div>
			</div>
			{selectedVideo && (
				<div className='fixed h-72 w-96 top-48 left-96 z-10 '>
					<button
						onClick={() => setSelectedVideo(null)}
						className='relative text-gray-700 text-2xl border-black border-2 rounded-lg w-10'>
						&times;
					</button>
					<VideoPlayer videoUrl={selectedVideo} />
				</div>
			)}
		</>
	);
};

export default Gallery;
