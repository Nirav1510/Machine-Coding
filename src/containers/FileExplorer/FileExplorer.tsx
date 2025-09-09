'use client';

import React, { useState } from 'react';
import { initialStructure } from './constant';
import FolderStructure from '@/components/FolderStructure/FolderStructure';

export type Folder = {
	id: string;
	name: string;
	isFolder: boolean;
	isOpen?: boolean;
	items: Folder[];
};

const FileExplorer: React.FC = () => {
	const [folders, setFolders] = useState<Folder[]>(initialStructure as Folder[]);

	const toggleFolder = (folderId: string) => {
		const toggleRecursive = (folder: Folder): Folder => {
			if (folderId === folder.id) {
				return { ...folder, isOpen: !folder.isOpen };
			}

			if (folder.isFolder) {
				return {
					...folder,
					items: folder.items.map(toggleRecursive),
				};
			}

			return folder;
		};

		setFolders(folders.map(toggleRecursive));
	};

	const addFileToFolder = (folderId: string) => {
		const fileName = prompt('Enter the new file name:');
		if (!fileName) return;

		const addFileRecursive = (folder: Folder): Folder => {
			if (folder.id === folderId && folder.isFolder) {
				const newFile: Folder = {
					id: Date.now().toString(),
					name: fileName,
					isFolder: false,
					items: [],
				};
				return { ...folder, items: [...folder.items, newFile] };
			}

			if (folder.isFolder) {
				return { ...folder, items: folder.items.map(addFileRecursive) };
			}

			return folder;
		};

		setFolders(folders.map(addFileRecursive));
	};

	const addFolderToFolder = (folderId: string) => {
		const folderName = prompt('Enter the new folder name:');
		if (!folderName) return;

		const addFolderRecursive = (folder: Folder): Folder => {
			if (folder.id === folderId && folder.isFolder) {
				const newFolder: Folder = {
					id: Date.now().toString(),
					name: folderName,
					isFolder: true,
					isOpen: false,
					items: [],
				};
				return { ...folder, items: [...folder.items, newFolder] };
			}

			if (folder.isFolder) {
				return { ...folder, items: folder.items.map(addFolderRecursive) };
			}

			return folder;
		};

		setFolders(folders.map(addFolderRecursive));
	};

	const deleteFile = (folderId: string) => {
		const deleteFileRecursive = (folder: Folder): Folder | null => {
			if (folder.id === folderId && !folder.isFolder) {
				alert(`File "${folder.name}" deleted`);
				return null;
			}

			if (folder.isFolder) {
				return {
					...folder,
					items: folder.items.map(deleteFileRecursive).filter(Boolean) as Folder[],
				};
			}

			return folder;
		};

		setFolders(folders.map(deleteFileRecursive).filter(Boolean) as Folder[]);
	};

	const deleteFolder = (folderId: string) => {
		const deleteFolderRecursive = (folder: Folder): Folder | null => {
			if (folder.id === folderId && folder.isFolder) {
				console.log(`Folder "${folder.name}" deleted`);
				return null;
			}

			if (folder.isFolder) {
				return {
					...folder,
					items: folder.items.map(deleteFolderRecursive).filter(Boolean) as Folder[],
				};
			}

			return folder;
		};

		setFolders(folders.map(deleteFolderRecursive).filter(Boolean) as Folder[]);
	};

	const addRootFolder = () => {
		const name = prompt('Enter root folder name');
		if (!name) return;

		const newFolder: Folder = {
			id: Date.now().toString(),
			name,
			isFolder: true,
			isOpen: false,
			items: [],
		};

		setFolders([...folders, newFolder]);
	};

	const addRootFile = () => {
		const name = prompt('Enter root file name');
		if (!name) return;

		const newFile: Folder = {
			id: Date.now().toString(),
			name,
			isFolder: false,
			items: [],
		};

		setFolders([...folders, newFile]);
	};

	return (
		<div>
			<div className='flex justify-center items-center font-bold text-xl'>Folder Structure</div>

			<div className='mb-4 flex gap-4'>
				<button onClick={addRootFolder} className='text-green-600'>
					[+] Add Root Folder
				</button>
				<button onClick={addRootFile} className='text-green-600'>
					[+] Add Root File
				</button>
			</div>

			<FolderStructure
				items={folders}
				deleteFile={deleteFile}
				deleteFolder={deleteFolder}
				toggleFolder={toggleFolder}
				addFileToFolder={addFileToFolder}
				addFolderToFolder={addFolderToFolder}
			/>
		</div>
	);
};

export default FileExplorer;
