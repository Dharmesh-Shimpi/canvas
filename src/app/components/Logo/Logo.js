'use client';

import React from 'react';
import css from './Logo.module.css';

function Logo() {
	return <p className={`font-thin ${css.text} ${css.customGradient}`}>canvas</p>;
}

export default Logo;
