'use client';

import React from 'react';
import Autocomplete from '@/containers/AutoComplete/AutoComplete';
import { searchCities } from '@/containers/AutoComplete/api';

export default function App() {
	return (
		<div className='min-h-screen bg-gray-50 p-6'>
			<div className='mx-auto max-w-2xl space-y-8'>
				<h1 className='text-2xl font-semibold'>React Autocomplete</h1>
				<Autocomplete fetchFn={searchCities} onSelect={(v) => alert(`Selected: ${v}`)} />
			</div>
		</div>
	);
}
