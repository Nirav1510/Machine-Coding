import React, { useState, useRef, useEffect } from 'react';
// import { DropdownProps, DropdownItem } from './Dropdown.types';

export interface DropdownItem {
	label: string;
	value: string | number;
}

export interface DropdownProps {
	items: DropdownItem[];
	placeholder?: string;
	onSelect: (item: DropdownItem) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ items, placeholder = 'Select...', onSelect }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<DropdownItem | null>(null);
	const [focusedIndex, setFocusedIndex] = useState<number>(-1);

	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!isOpen) {
			if (e.key === 'Enter' || e.key === ' ') {
				setIsOpen(true);
				e.preventDefault();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				setFocusedIndex((prev) => (prev + 1) % items.length);
				break;
			case 'ArrowUp':
				setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
				break;
			case 'Enter':
			case ' ':
				if (focusedIndex >= 0) {
					handleSelect(items[focusedIndex]);
				}
				break;
			case 'Escape':
				setIsOpen(false);
				break;
		}
	};

	const handleSelect = (item: DropdownItem) => {
		setSelected(item);
		setIsOpen(false);
		onSelect(item);
	};

	return (
		<div className='relative w-52' ref={dropdownRef}>
			<button
				type='button'
				className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500'
				onClick={() => setIsOpen((prev) => !prev)}
				onKeyDown={handleKeyDown}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
			>
				{selected ? selected.label : placeholder}
			</button>

			{isOpen && (
				<ul
					className='absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto z-10'
					role='listbox'
				>
					{items.map((item, index) => (
						<li
							key={item.value}
							role='option'
							aria-selected={selected?.value === item.value}
							className={`px-3 py-2 cursor-pointer ${focusedIndex === index ? 'bg-gray-100' : ''} ${
								selected?.value === item.value ? 'bg-gray-200 font-medium' : ''
							}`}
							tabIndex={0}
							onClick={() => handleSelect(item)}
							onMouseEnter={() => setFocusedIndex(index)}
						>
							{item.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
