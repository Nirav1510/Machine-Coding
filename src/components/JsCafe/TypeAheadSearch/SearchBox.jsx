import React, { useState } from 'react';
import useFetchPromise from './useFetchPromise';

const SearchBox = ({
	id,
	name,
	label,
	styles,
	listBox,
	maxItems,
	placeholder,
	debounceWait,
	autoComplete,
	errorMessage,
	noItemMessage,
	transformData,
	dataPromise,
}) => {
	const [query, setQuery] = useState('');
	const [activeIdx, setActiveIdx] = useState(null);
	const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
	const [data, setData, error] = useFetchPromise(
		query,
		transformData,
		dataPromise,
		debounceWait,
		isAutoComplete,
		maxItems
	);

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	const handleKeyUp = (e) => {
		const keyCode = e.keyCode;
		if (keyCode === 13) {
			//user enter
			if (activeIdx === null) return;
			setQuery(data[activeIdx].name);
			setData(null);
			setActiveIdx(null);
			setIsAutoComplete(false);
			return;
		} else if (keyCode === 40) {
			//user move down
			setIsAutoComplete(true);
			if (!data || data.length === 0) return;
			if (activeIdx === null || activeIdx === data.length - 1) {
				setActiveIdx(0);
			} else {
				setActiveIdx((prev) => prev + 1);
			}
		} else if (keyCode === 38) {
			//move up
			setIsAutoComplete(true);
			if (activeIdx === 0) {
				setActiveIdx(data.length - 1);
			} else {
				setActiveIdx((prev) => prev - 1);
			}
		}
	};

	return (
		<div>
			<label className={styles?.label} htmlFor={name}>
				{label}
			</label>
			<br />

			<input
				id={id}
				type='text'
				name={name}
				value={query}
				autoComplete='off'
				onChange={handleChange}
				className={styles?.input}
				placeholder={placeholder}
				onKeyUp={handleKeyUp}
			/>

			{data && data.length > 0 && listBox(data, activeIdx)}
			{query && data && data.length === 0 && noItemMessage()}
			{error && errorMessage()}
		</div>
	);
};

export default SearchBox;
