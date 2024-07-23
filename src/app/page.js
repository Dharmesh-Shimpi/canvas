'use client';

import React, { useEffect, useState } from 'react';
import { Canvas } from '@/pages/canvas';

export default function Home() {

	return (
    <main className='flex justify-center align-middle bg-lime-950 h-screen w-screen'>
      <Canvas />
		</main>
	);
}
