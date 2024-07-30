import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const FetchContext = createContext();

export const useFetch = () => useContext(FetchContext);

export const FetchProvider = ({ children }) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchUploads = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/fetch');
			setImages(response.data.images);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUploads();
	}, [setImages]);

	return (
		<FetchContext.Provider value={{ images, loading, error }}>
			{children}
		</FetchContext.Provider>
	);
};
