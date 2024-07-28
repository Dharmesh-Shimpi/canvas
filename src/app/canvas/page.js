'use client';

import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';
import { useCanvas } from '../../context/canvasContext';
import css from './canvas.module.css';

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
		<div className=' mx-0 flex z-0'>
			<div className='flex flex-col items-start'>
				<Sidebar />
				<div className='h-[500px] w-[800px] overflow-auto'>
					<canvas
						className='shadow-xl'
						ref={ref}></canvas>
				</div>
			</div>
		</div>
	);
};

export default Canvas;
