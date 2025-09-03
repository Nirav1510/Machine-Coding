import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { SimpleCache } from '@/utils/cache';
import { throttle as rawThrottle } from '@/utils/throttle';
import useDebouncedValue from '@/hooks/useDebounce';

const globalCache = new SimpleCache({ max: 200, ttl: 60_000 });

export default function useAutocomplete({
	fetchFn,
	minChars = 1,
	debounceMs = 250,
	throttleMs = 0,
	cache = globalCache,
}) {
	const [query, setQuery] = useState('');
	const [items, setItems] = useState([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [highlight, setHighlight] = useState(-1);
	const abortRef = useRef(null);

	const canSearch = query.trim().length >= minChars;

	const performFetch = useCallback(
		async (q) => {
			const key = q.trim().toLowerCase();
			if (!key) return [];
			const cached = cache.get(key);
			if (cached) return cached;

			abortRef.current?.abort();
			const controller = new AbortController();
			abortRef.current = controller;

			try {
				setLoading(true);
				setError(null);
				const result = await fetchFn(key, { signal: controller.signal });
				cache.set(key, result);
				return result;
			} catch (e) {
				if (e?.name !== 'AbortError') setError(e);
				return [];
			} finally {
				setLoading(false);
			}
		},
		[cache, fetchFn]
	);

	const networkCaller = useMemo(() => {
		if (throttleMs > 0) return rawThrottle(performFetch, throttleMs);
		return performFetch;
	}, [performFetch, throttleMs]);

	const debouncedQuery = useDebouncedValue(query, debounceMs);

	useEffect(() => {
		let active = true;
		if (!canSearch) {
			setItems([]);
			return;
		}
		(async () => {
			const res = await networkCaller(debouncedQuery);
			if (!active) return;
			if (Array.isArray(res)) setItems(res);
			setOpen(true);
			setHighlight(-1);
		})();
		return () => {
			active = false;
		};
	}, [debouncedQuery, canSearch, networkCaller]);

	const onChange = useCallback((e) => setQuery(e.target.value), []);

	const onKeyDown = useCallback(
		(e) => {
			if (!open || !items.length) return;
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				setHighlight((h) => (h + 1) % items.length);
			} else if (e.key === 'ArrowUp') {
				e.preventDefault();
				setHighlight((h) => (h - 1 + items.length) % items.length);
			} else if (e.key === 'Enter') {
				e.preventDefault();
				if (highlight >= 0) {
					setQuery(items[highlight]);
					setOpen(false);
				}
			} else if (e.key === 'Escape') {
				setOpen(false);
			}
		},
		[open, items, highlight]
	);

	const selectItem = useCallback((val) => {
		setQuery(val);
		setOpen(false);
	}, []);

	const clear = useCallback(() => {
		setQuery('');
		setItems([]);
		setOpen(false);
		setHighlight(-1);
	}, []);

	return { query, items, open, loading, error, highlight, setQuery, onChange, onKeyDown, selectItem, clear, setOpen };
}
