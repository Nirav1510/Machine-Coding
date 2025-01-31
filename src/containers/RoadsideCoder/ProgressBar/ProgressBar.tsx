'use client';

import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
	const [percent, setPercent] = useState(0);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			setProgress((prev) => prev + 1);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		setPercent(Math.min(100, Math.max(0, progress)));
	}, [progress]);

	return (
		<div className='flex flex-col items-center justify-center h-screen w-screen gap-4'>
			<div>Progress Bar</div>
			<div className='progress-bar w-[300px] h-[40px] overflow-hidden relative rounded-[18px] bg-[#f1dddd]'>
				<div
					className={`w-full h-full absolute flex justify-center items-center z-10 ${
						percent > 49 ? 'text-white' : 'text-black'
					}`}
				>
					{percent}%
				</div>

				<div
					role='progressbar'
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={percent}
					style={{ transform: `translate(${percent - 100}%)` }}
					className={`absolute h-full m-auto flex justify-center items-center bg-[green] w-full`}
				/>
			</div>
			<div>{percent !== 100 ? 'Loading...' : 'Completed!'}</div>
		</div>
	);
};

export default ProgressBar;
