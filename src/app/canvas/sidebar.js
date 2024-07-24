'use client';

import * as fabric from 'fabric';
import { CIcon } from '@coreui/icons-react';
import { cilRectangle, cilCircle, cilTriangle } from '@coreui/icons';

export function Sidebar({ canvas }) {
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
		}
	};

	return (
		<div>
			<CIcon
				icon={cilRectangle}
				className='h-5 w-5 cursor-pointer'
				onClick={addRectangle}
			/>
			<CIcon
				icon={cilCircle}
				className='h-5 w-5 cursor-pointer'
				onClick={addCircle}
			/>
			<CIcon
				icon={cilTriangle}
				className='h-5 w-5 cursor-pointer'
				onClick={addTriangle}
			/>
			<p
				onClick={addLine}
				className='h-5 w-5 cursor-pointer'>
				|
			</p>
		</div>
	);
}
