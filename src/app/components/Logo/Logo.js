'use client';

import React from 'react';
import css from './Logo.module.css';

function Logo() {
	return (
		<h1 className={`font-thin ${css.text} ${css.customGradient}`}>Canvas</h1>
	);
}

export default Logo;
