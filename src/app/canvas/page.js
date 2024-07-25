'use client';

import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';
import { useCanvas } from '../../context/canvasContext';

const Canvas = () => {
	const ref = useRef(null);
	const options = { height: 600, width: 1200, backgroundColor: 'white' };
	const { canvas, setCanvas } = useCanvas();

	useEffect(() => {
		if (ref.current) {
			const c = new fabric.Canvas(ref.current, options);
			setCanvas(c);
			c.renderAll();
			return () => {
				setCanvas(null);
				c.dispose();
			};
		}
	}, [setCanvas]);

	const handleDrop = (e) => {
		e.preventDefault();
		const url = e.dataTransfer.getData('text/plain');
		if (url && canvas) {
			fabric.util.loadImage(
				url,
				(imgElement) => {
					const img = new fabric.Image(imgElement, {
						left: e.clientX - ref.current.getBoundingClientRect().left,
						top: e.clientY - ref.current.getBoundingClientRect().top,
						selectable: true,
						hoverCursor: 'pointer',
					});
					canvas.add(img);
					canvas.renderAll();
				},
				(err) => {
					console.error('Image loading error:', err);
				},
			);
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	return (
		<div
			className='flex justify-start items-center bg-gradient-to-r from-pink-500 to-green-500 h-full w-5/6 z-0'
			onDrop={handleDrop}
			onDragOver={handleDragOver}>
			<Sidebar canvas={canvas} />
			<canvas ref={ref}></canvas>
		</div>
	);
};

export default Canvas;
