'use client';

import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';
import { useCanvas } from '../../context/canvasContext';

const Canvas = () => {
	const ref = useRef(null);
	const { canvas, setCanvas } = useCanvas();

	useEffect(() => {
		if (ref.current) {
			const options = {
				height: '300',
				width: '500',
				backgroundColor: '#494d57',
			};

			const c = new fabric.Canvas(ref.current, options);

			setCanvas(c);
			c.renderAll();
			return () => {
				setCanvas(null);
				c.dispose();
			};
		}
	}, [setCanvas]);

	return (
		<div className='container mx-0 flex flex-col bg-gradient-to-br from-gray-500 to-gray-800 h-full w-5/6 z-0 '>
			<div className='flex flex-col items-start '>
				<Sidebar />
				<canvas
					className='shadow-xl'
					ref={ref}></canvas>
			</div>
		</div>
	);
};

export default Canvas;
