import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
	return (
		<video
			src={videoUrl}
			controls
			className='w-auto h-auto'
			autoPlay
		/>
	);
};

export default VideoPlayer;
