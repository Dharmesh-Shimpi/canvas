import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './canvas.redux';

const store = configureStore({
	reducer: {
		canvas: canvasReducer,
	},
});

export default store;
