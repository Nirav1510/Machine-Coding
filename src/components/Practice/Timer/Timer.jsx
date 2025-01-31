'use client';

import React from 'react';
import useTimer from '@/containers/Practice/TimerApp/useTimer';

const Timer = ({ label, delay }) => {
	const [time, onPlay, onPause, onReset, onRestart] = useTimer(delay);

	return (
		<div className='w-full'>
			<div className='flex flex-col justify-center items-center'>
				<div>{label}</div>
				<div>{time}</div>
			</div>

			<div className='flex justify-evenly'>
				<button onClick={() => onPause()} className='p-2 bg-green-300'>
					Pause
				</button>

				<button onClick={() => onPlay()} className='p-2 bg-red-300'>
					Play
				</button>

				<button onClick={() => onReset()} className='p-2 bg-purple-300'>
					Reset
				</button>

				<button onClick={() => onRestart()} className='p-2 bg-blue-300'>
					Restart
				</button>
			</div>
		</div>
	);
};

export default Timer;
