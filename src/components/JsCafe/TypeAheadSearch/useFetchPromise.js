import { useState, useEffect, useCallback } from 'react';
import { debounce } from '@/utils/method';

const useFetchPromise = (query, transformData, dataPromise, debounceWait, autoComplete, maxItems) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);

	const fetchData = useCallback(
		debounce(async (query, transformData, signal) => {
			try {
				const response = await dataPromise(query, signal);
				if (!response?.ok) throw new Error(response?.statusText);
				const data = await response.json();
				console.log(data);
				setData(transformData(data, maxItems));
			} catch (error) {
				console.error(`error while fetching data with query=${query}`, error);
				if (!signal.aborted) {
					setError(error);
				}
			}
		}, debounceWait),
		[]
	);

	useEffect(() => {
		if (!query || !autoComplete) {
			setData(null);
			setError(null);
			return;
		}
		const controller = new AbortController();
		const signal = controller.signal;

		fetchData(query, transformData, signal);

		return () => {
			controller.abort();
		};
	}, [query, transformData, fetchData, autoComplete]);

	return [data, setData, error];
};

export default useFetchPromise;
