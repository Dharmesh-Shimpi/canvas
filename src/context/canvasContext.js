import React, { createContext, useContext, useState } from 'react';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
	const [canvas, setCanvas] = useState(null);
	const [thumbnail, setThumbnail] = useState(null);

	return (
		<CanvasContext.Provider
			value={{ canvas, setCanvas, thumbnail, setThumbnail }}>
			{children}
		</CanvasContext.Provider>
	);
};

export const useCanvas = () => useContext(CanvasContext);
