"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Sidebar } from './sidebar';
import { useSession, signIn } from 'next-auth/react';

const Canvas = () => {
	const { status } = useSession();
	const ref = useRef();
	const options = { height: 400, width: 800, backgroundColor: 'white' };
	const [canvas, setCanvas] = useState();

	useEffect(() => {
		if (status === 'unauthenticated') {
			signIn();
		}
	}, [status]);

	useEffect(() => {
		const c = new fabric.Canvas(ref.current, options);
		c.renderAll();
		setCanvas(c);
		return () => {
			setCanvas(null);
			c.dispose();
		};
	}, []);

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (status === 'unauthenticated') {
		return <p>Loading...</p>;
	}

	return (
		<div className='flex justify-center flex-row items-center bg-emerald-400 h-5/6 w-5/6 border-2 border-slate-600 border-solid'>
			<Sidebar canvas={canvas} />
			<canvas ref={ref} />
		</div>
	);
};

export default Canvas;
