'use client';

import React from 'react';

const Preview = ({ entries, handleValueChange }) => {
	return (
		<div>
			<h1 className='text-2xl mb-2'>Live Preview</h1>

			<div>
				{entries.map((item, idx) => (
					<div key={idx} className='flex flex-col my-2'>
						<label className='font-medium'>{item.label}</label>
						<input
							type={item.type}
							{...(item.type === 'checkbox' ? { checked: item.value } : { value: item.value })}
							className='border-2 w-[150px]'
							onChange={(e) =>
								handleValueChange({
									index: idx,
									val: item.type === 'checkbox' ? e.target.checked : e.target.value,
								})
							}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default Preview;
