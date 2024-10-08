'use client';

import * as fabric from 'fabric';
import { useState } from 'react';
import { CIcon } from '@coreui/icons-react';
import {
	cilRectangle,
	cilCircle,
	cilTriangle,
	cilTextShapes,
} from '@coreui/icons';
import { useSelector } from 'react-redux';
import css from './sidebar.module.css';

export function Sidebar() {
	const { canvas } = useSelector((state) => state.canvas);
	const [visible, setVisible] = useState(false);
	const toggleVisibility = () => {
		setVisible(!visible);
	};

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

	return (
		<div className='flex flex-row justify-end items-center my-5 h-10 '>
			<p
				className='mx-1 cursor-pointer flex items-center hover:text-purple-300'
				onClick={toggleVisibility}>
				<CIcon
					icon={cilTextShapes}
					className='h-6 mr-2 cursor-pointer '
					onClick={addRectangle}
				/>
				Add shapes
			</p>
			<div
				className={`${
					visible ? css.display : css.none
				} rounded-full shadow-lg px-3 bg-gray-500`}>
				<p
					className='mx-1 cursor-pointer flex items-center hover:text-purple-300'
					onClick={addRectangle}>
					<CIcon
						icon={cilRectangle}
						className='h-7 cursor-pointer m-2  font-thin'
					/>
					Rectangle
				</p>
				<p
					className='mx-1 cursor-pointer flex items-center justify-center hover:text-purple-300'
					onClick={addCircle}>
					<CIcon
						icon={cilCircle}
						className='h-6 cursor-pointer m-2 hover:text-gray-400'
					/>
					Circle
				</p>
				<p
					className='mx-1 cursor-pointer flex items-center hover:text-purple-300'
					onClick={addTriangle}>
					<CIcon
						icon={cilTriangle}
						className='h-6 cursor-pointer m-2 hover:text-gray-400'
					/>
					Triangle
				</p>
			</div>
		</div>
	);
}
