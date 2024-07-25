import axios from 'axios';

export const Image = ({ canvas }) => {
	const uploadImage = async () => {
		if (canvas) {
			const dataURL = canvas.toDataURL('image/png');
			try {
				const response = await axios.post('/api/uploadImage', { dataURL });
				console.log('Upload result:', response.data);
			} catch (error) {
				console.error('Error uploading image:', error);
			}
		}
	};

	return (
		<button
			onClick={uploadImage}
			className='text-sm p-2 hover:text-purple-300'>
			Upload Image
		</button>
	);
};
