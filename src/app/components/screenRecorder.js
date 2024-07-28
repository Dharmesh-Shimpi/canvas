import { useState, useRef } from 'react';
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilMediaPlay, cilMediaStop, cilSave } from '@coreui/icons';

const ScreenRecorder = () => {
	const [isRecording, setIsRecording] = useState(false);
	const [recordedBlob, setRecordedBlob] = useState(null);
	const mediaRecorderRef = useRef(null);
	const [stream, setStream] = useState(null);

	const startRecording = async () => {
		try {
			const displayMediaStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
			});
			setStream(displayMediaStream);
			const mediaRecorder = new MediaRecorder(displayMediaStream);
			mediaRecorderRef.current = mediaRecorder;
			const chunks = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					chunks.push(event.data);
				}
			};

			mediaRecorder.onstop = () => {
				const blob = new Blob(chunks, { type: 'video/mp4' });
				setRecordedBlob(blob);
			};

			mediaRecorder.start();
			setIsRecording(true);
		} catch (err) {
			console.error('Error starting screen recording:', err);
		}
	};

	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setIsRecording(false);
		}
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
	};

	const saveRecording = async () => {
		if (recordedBlob) {
			const dataURL = await new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onloadend = () => resolve(reader.result);
				reader.onerror = reject;
				reader.readAsDataURL(recordedBlob);
			});
			try {
				const response = await axios.post('/api/uploadVideo', { dataURL });

				console.log('Upload result:', response.data);
			} catch (error) {
				console.error('Error uploading video:', error);
			}
		} else {
			alert('No recording to save.');
		}
	};

	return (
		<div className='flex flex-row w-45 h-fit text-white '>
			{!isRecording ? (
				<button
					onClick={startRecording}
					className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
					<CIcon
						icon={cilMediaPlay}
						className='
					h-6 m-2'
					/>
					Start Recording
				</button>
			) : (
				<button
					onClick={stopRecording}
					className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
					<CIcon
						icon={cilMediaStop}
						className='
					h-6 m-2'
					/>
					Stop Recording
				</button>
			)}
			{recordedBlob && !isRecording && (
				<button
					onClick={saveRecording}
					className='text-sm p-2 hover:text-purple-300 flex flex-row justify-center items-center'>
					<CIcon
						icon={cilSave}
						className='
					h-6 m-2 '
					/>
					Save Recording
				</button>
			)}
		</div>
	);
};

export default ScreenRecorder;
