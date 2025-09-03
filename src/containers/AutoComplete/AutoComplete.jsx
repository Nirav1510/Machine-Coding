'use client';

import React, { useRef } from 'react';
import useClickOutside from '@/hooks/useOutsideClick';
import useAutocomplete from '@/containers/AutoComplete/useAutoComplete';

const Autocomplete = ({
	fetchFn,
	placeholder = 'Search…',
	minChars = 1,
	debounceMs = 250,
	throttleMs = 0,
	className = '',
	onSelect,
}) => {
	const rootRef = useRef(null);
	const { query, items, open, loading, error, highlight, onChange, onKeyDown, selectItem, clear, setOpen } =
		useAutocomplete({ fetchFn, minChars, debounceMs, throttleMs });

	useClickOutside(rootRef, () => setOpen(false));

	const handleSelect = (val) => {
		selectItem(val);
		onSelect?.(val);
	};

	return (
		<div ref={rootRef} className={`relative w-full max-w-md ${className}`}>
			<div className='flex items-center gap-2 rounded-2xl border bg-white px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-black'>
				<input
					value={query}
					onChange={onChange}
					onKeyDown={onKeyDown}
					placeholder={placeholder}
					className='w-full bg-transparent outline-none'
					aria-autocomplete='list'
					aria-expanded={open}
					aria-controls='ac-listbox'
					aria-activedescendant={highlight >= 0 ? `ac-opt-${highlight}` : undefined}
				/>
				{query && (
					<button className='text-sm text-gray-600 hover:text-black' onClick={clear} aria-label='Clear'>
						✕
					</button>
				)}
			</div>

			{open && (
				<div className='absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border bg-white shadow-lg'>
					{loading && <div className='px-3 py-2 text-sm text-gray-500'>Loading…</div>}
					{error && <div className='px-3 py-2 text-sm text-red-600'>{String(error.message || 'Error')}</div>}
					{!loading &&
						!error &&
						(items.length ? (
							<ul role='listbox' id='ac-listbox' className='max-h-64 overflow-auto'>
								{items.map((item, i) => (
									<li
										key={item + i}
										id={`ac-opt-${i}`}
										role='option'
										aria-selected={i === highlight}
										className={`${i === highlight ? 'bg-gray-100' : ''} cursor-pointer px-3 py-2 hover:bg-gray-100`}
										onMouseDown={(e) => e.preventDefault()}
										onClick={() => handleSelect(item)}
									>
										{item}
									</li>
								))}
							</ul>
						) : (
							<div className='px-3 py-2 text-sm text-gray-500'>No results</div>
						))}
				</div>
			)}
		</div>
	);
};

export default Autocomplete;
