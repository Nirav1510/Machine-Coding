'use client';

import { useState } from 'react';

const useFormBuilder = () => {
	const [entries, setEntries] = useState([]);
	const [entryCount, setEntryCount] = useState({ number: 0, checkbox: 0, text: 0 });

	// Add new entry
	const addEntry = (type) => {
		setEntryCount((prev) => ({ ...prev, [type]: prev[type] + 1 }));

		const newEntry = {
			id: Date.now(),
			type,
			label: `${type} entry ${entryCount[type]}`,
			value: type === 'checkbox' ? false : '',
		};

		setEntries((prev) => [...prev, newEntry]);
	};

	// Remove entry by id
	const removeEntry = (id) => {
		setEntries((prev) => prev.filter((item) => item.id !== id));
	};

	// Generic updater
	const updateEntry = (index, updates) => {
		setEntries((prev) => {
			const updated = [...prev];
			updated[index] = { ...updated[index], ...updates };
			return updated;
		});
	};

	const handleLabelChange = ({ index, value }) => updateEntry(index, { label: value });
	const handleValueChange = ({ index, val }) => updateEntry(index, { value: val });

	// Submit handler
	const handleSubmit = () => {
		const formData = {};
		entries.forEach((item) => {
			formData[item.label] = item.value;
		});
		console.log('formData', formData);
	};

	return {
		entries,
		addEntry,
		removeEntry,
		handleLabelChange,
		handleValueChange,
		handleSubmit,
	};
};

export default useFormBuilder;
