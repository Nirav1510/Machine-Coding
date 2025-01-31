// que. https://medium.com/womenintechnology/commonly-asked-machine-coding-problem-in-front-end-interviews-e16042ab1e10

'use client';

import React, { useState, useEffect } from 'react';

const Box: React.FC<{
	item: any;
	id: number;
	handleClick: (item: any) => void;
}> = ({ id, item, handleClick }) => {
	if (!item.isVisible) return <div />;

	return (
		<div
			onClick={() => handleClick(item)}
			className={`border-[1px] w-[50px] h-[50px] flex justify-center items-center ${
				item.isClicked ? 'bg-[yellow]' : 'bg-[green]'
			}`}
		>
			{id}
		</div>
	);
};

const HolyGrid: React.FC = () => {
	const [queue, setQueue] = useState<any>([]);
	const [grid, setGrid] = useState([
		{
			id: 0,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 1,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 2,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 3,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 4,
			isClicked: false,
			isVisible: false,
		},
		{
			id: 5,
			isClicked: false,
			isVisible: false,
		},
		{
			id: 6,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 7,
			isClicked: false,
			isVisible: true,
		},
		{
			id: 8,
			isClicked: false,
			isVisible: true,
		},
	]);

	const handleClick = (item: any) => {
		setGrid((prevGrid) =>
			prevGrid.map((gridItem) => (gridItem.id === item.id ? { ...gridItem, isClicked: true } : gridItem))
		);

		setQueue((prev: any) => [...prev, item]);
	};

	useEffect(() => {
		let copyQueue = [...queue];

		let queueCount = 0;

		if (queue.length === 7) {
			for (let i = 0; i < 7; i++) {
				let startItem = copyQueue.shift();
				queueCount++;
				setTimeout(() => {
					const newGrid = grid.map((gridItem: any) => {
						if (startItem.id === gridItem.id) {
							gridItem.isClicked = false;
						}
						return gridItem;
					});

					setGrid(newGrid);
				}, i * 1000);
			}
			if (queueCount === 7) {
				setQueue([]);
			}
		}
	}, [queue]);

	return (
		<div className='flex justify-center text-center'>
			<div className='grid grid-cols-3 gap-[5px] justify-center items-center w-1/2'>
				{grid.map((item, index) => {
					return <Box item={item} key={index} id={index + 1} handleClick={handleClick} />;
				})}
			</div>
		</div>
	);
};

export default HolyGrid;
