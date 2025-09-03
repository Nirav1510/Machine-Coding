'use client';

import React from 'react';

const FormBuilder = ({ entries, addEntry, removeEntry, handleLabelChange }) => {
	return (
		<div>
			<h1 className='text-2xl mb-2'>Form Builder</h1>

			<div className='flex items-center gap-2 mb-4'>
				<button onClick={() => addEntry('text')} className='border-2 bg-red-200 px-2'>
					Add Text
				</button>
				<button onClick={() => addEntry('number')} className='border-2 bg-blue-200 px-2'>
					Add Number
				</button>
				<button onClick={() => addEntry('checkbox')} className='border-2 bg-green-200 px-2'>
					Add Checkbox
				</button>
			</div>

			{entries.map((item, idx) => (
				<div key={idx} className='flex items-center gap-2 my-2'>
					<input
						type='text'
						value={item.label}
						className='border-2 w-[150px]'
						onChange={(e) => handleLabelChange({ value: e.target.value, index: idx })}
					/>
					<button onClick={() => removeEntry(item?.id)} className='border-2 bg-red-700 text-white px-2'>
						Remove
					</button>
				</div>
			))}
		</div>
	);
};

export default FormBuilder;
