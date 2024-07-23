import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';

export const Canvas = () => {
	const ref = useRef();
	const options = { height: 400, width: 800, backgroundColor: 'white' };
	const [canvas, setCanvas] = useState();
	useEffect(() => {
		const c = new fabric.Canvas(ref.current, options);
		setCanvas(c);
		return () => {
			setCanvas(null);
			c.dispose();
		};
	}, []);

	return (
		<div>
			<Sidebar canvas={canvas} />
			<canvas ref={ref} />
		</div>
	);
};
