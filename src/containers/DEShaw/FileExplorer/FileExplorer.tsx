'use client';

import React, { useState } from 'react';
import FileList from '@/components/DEShaw/FileExplorer/FileList';

interface File {
	name: string;
	isOpen?: boolean;
	files?: File[];
}

const initialData: File[] = [
	{
		name: 'node_modules',
	},
	{
		name: 'public',
		isOpen: false,
		files: [
			{
				name: 'index.html',
				isOpen: false,
			},
		],
	},
	{
		name: 'src',
		isOpen: true,
		files: [
			{
				name: 'App.js',
			},
			{
				name: 'components',
				isOpen: false,
				files: [{ name: 'File.js' }],
			},
		],
	},
	{
		name: 'Git',
		isOpen: false,
		files: [
			{
				name: '.gitignore',
			},
			{
				name: 'Commits',
				isOpen: false,
				files: [{ name: 'First commit' }],
			},
		],
	},
];

const FileExplorer: React.FC = () => {
	const [data, setData] = useState<File[]>(initialData);
	const [inputValue, setInputValue] = useState<string>('');

	const handleAddFile = (path: number[]) => {
		if (inputValue.trim().length === 0) {
			alert('Please enter a file name in the input box');
			return;
		}
		const newFile: File = { name: inputValue };
		setData((prevData) => {
			const newData = [...prevData];
			let folder: File[] = newData;

			path.forEach((index) => {
				folder = folder[index]?.files || [];
			});

			folder.push(newFile);
			return newData;
		});
		setInputValue('');
	};

	const handleConvertToFolder = (path: number[]) => {
		setData((prevData) => {
			const newData = [...prevData];
			let folder: File[] = newData;

			path.slice(0, -1).forEach((index) => {
				folder = folder[index]?.files || [];
			});

			const fileIndex = path[path.length - 1];
			if (folder[fileIndex] && !Array.isArray(folder[fileIndex]?.files)) {
				folder[fileIndex] = { ...folder[fileIndex], files: [] };
			}

			return newData;
		});
	};

	return (
		<div className='layout-row justify-content-between'>
			<ul data-testid='files'>
				<FileList
					path={[]}
					data={data}
					firstLevel={true}
					handleAddFile={handleAddFile}
					handleConvertToFolder={handleConvertToFolder}
				/>
			</ul>

			<input
				type='text'
				value={inputValue}
				data-testid='input-box'
				className='mt-15 mr-35 w-15'
				placeholder='Enter an item'
				style={{ borderColor: 'black' }}
				onChange={(e) => setInputValue(e.target.value)}
			/>
		</div>
	);
};

export default FileExplorer;
