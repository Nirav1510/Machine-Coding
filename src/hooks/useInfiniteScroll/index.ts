'use client';

import { useState, useEffect, useRef } from 'react';

const useInfiniteScroll = (fetchMoreItems: (page: number) => Promise<any>) => {
	const [items, setItems] = useState<any>([]);
	const [page, setPage] = useState(1);
	const [showLoader, setShowLoader] = useState(false);
	const loaderRef = useRef(null);

	const loadItems = async () => {
		setShowLoader(true);
		const newItems = await fetchMoreItems(page);
		setItems((prev: any) => [...prev, ...newItems]);
		setShowLoader(false);
	};

	useEffect(() => {
		loadItems();
	}, [page, fetchMoreItems]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 1.0 }
		);

		if (loaderRef.current) {
			observer.observe(loaderRef.current);
		}

		return () => {
			if (loaderRef.current) {
				observer.unobserve(loaderRef.current);
			}
		};
	}, []);

	return { items, loaderRef, showLoader };
};

export default useInfiniteScroll;
