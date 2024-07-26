'use client';

import * as fabric from 'fabric';
import { CIcon } from '@coreui/icons-react';
import { cilRectangle, cilCircle, cilTriangle } from '@coreui/icons';
import { useCanvas } from '../../context/canvasContext';

export function Sidebar() {
	const { canvas } = useCanvas();
	const addRectangle = () => {
		if (canvas) {
			const rect = new fabric.Rect({
				left: 100,
				top: 100,
				fill: 'red',
				width: 50,
				height: 50,
				stroke: 'black',
				strokeWidth: 2,
			});
			canvas.add(rect);
			canvas.renderAll();
		}
	};

	const addCircle = () => {
		if (canvas) {
			const circle = new fabric.Circle({
				left: 150,
				top: 150,
				fill: 'green',
				radius: 50,
				stroke: 'black',
				strokeWidth: 2,
			});
			canvas.add(circle);
			canvas.renderAll();
		}
	};

	const addTriangle = () => {
		if (canvas) {
			const triangle = new fabric.Triangle({
				left: 200,
				top: 200,
				fill: 'blue',
				width: 50,
				height: 50,
				stroke: 'black',
				strokeWidth: 2,
			});
			canvas.add(triangle);
			canvas.renderAll();
		}
	};

	const addLine = () => {
		if (canvas) {
			const line = new fabric.Line([50, 100, 200, 200], {
				left: 300,
				top: 100,
				stroke: 'black',
				strokeWidth: 2,
			});
			canvas.add(line);
			canvas.renderAll();
		}
	};

	return (
		<div className='flex flex-row justify-end items-center mx-10'>
			<p className='mx-1'>Shapes :</p>
			<CIcon
				icon={cilRectangle}
				className='h-10 w-9 cursor-pointer m-2 hover:text-gray-400 font-thin'
				onClick={addRectangle}
			/>
			<CIcon
				icon={cilCircle}
				className='h-7 w-7 cursor-pointer m-2 hover:text-gray-400'
				onClick={addCircle}
			/>
			<CIcon
				icon={cilTriangle}
				className='h-7 w-7 cursor-pointer m-2 hover:text-gray-400'
				onClick={addTriangle}
			/>
			<p
				onClick={addLine}
				className='text-3xl cursor-pointer m-2 hover:text-gray-400'>
				\
			</p>
		</div>
	);
}
