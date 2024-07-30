'use client';

import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';
import { useDispatch } from 'react-redux';
import { setCanvas } from '../../context/canvas.redux';

const Canvas = () => {
	const ref = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (ref.current) {
			const options = {
				height: 300,
				width: 500,
				backgroundColor: '#494d57',
			};

			const c = new fabric.Canvas(ref.current, options);

			dispatch(setCanvas(c));
			c.renderAll();
			return () => {
				dispatch(setCanvas(null));
				c.dispose();
			};
		}
	}, [dispatch]);

	return (
		<div className='mx-0 flex z-0'>
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
