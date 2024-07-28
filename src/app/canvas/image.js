import axios from 'axios';
import { CIcon } from '@coreui/icons-react';
import { cilCloudUpload } from '@coreui/icons';

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
			className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
			<CIcon
				icon={cilCloudUpload}
				className='h-6 m-2'
			/>
			Upload Image
		</button>
	);
};
