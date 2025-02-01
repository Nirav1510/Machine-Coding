'use client';

import React, { useState } from 'react';
import { initialStructure } from './constant';
import FolderStructure from '@/components/FolderStructure/FolderStructure';

type Folder = {
	id: string;
	name: string;
	isFolder: boolean;
	isOpen?: boolean;
	items: Folder[];
};

const FileExplorer: React.FC = () => {
	const [folders, setFolders] = useState<Folder>(initialStructure);

	const toggleFolder = (folderId: string) => {
		const toggleRecursive = (folder: Folder): Folder => {
			if (folder.id === folderId) {
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

		setFolders(toggleRecursive(folders));
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

				return {
					...folder,
					items: [...folder.items, newFile],
				};
			}

			if (folder.isFolder) {
				return {
					...folder,
					items: folder.items.map(addFileRecursive),
				};
			}

			return folder;
		};

		setFolders(addFileRecursive(folders));
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
					items: [],
				};

				return {
					...folder,
					items: [...folder.items, newFolder],
				};
			}

			if (folder.isFolder) {
				return {
					...folder,
					items: folder.items.map(addFolderRecursive),
				};
			}

			return folder;
		};

		setFolders(addFolderRecursive(folders));
	};

	const deleteFile = (folderId: string) => {
		const deleteFileRecursive = (folder: Folder | null): Folder | null => {
			if (!folder) return null;
			if (folder.id === folderId) {
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

		setFolders(deleteFileRecursive(folders) || folders);
	};

	const deleteFolder = (folderId: string) => {
		const deleteFolderRecursive = (folder: Folder | null): Folder | null => {
			if (!folder) return null;
			if (folder.id === folderId) {
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

		setFolders(deleteFolderRecursive(folders) || folders);
	};

	return (
		<div>
			<div className='flex justify-center items-center font-bold text-xl'>Folder Structure</div>

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
