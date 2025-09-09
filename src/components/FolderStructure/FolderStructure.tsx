'use client';

import React from 'react';

type FolderItem = {
	id: string;
	name: string;
	isFolder: boolean;
	isOpen?: boolean;
	items: FolderItem[];
};

type FolderStructureProps = {
	items: FolderItem;
	deleteFile: (id: string) => void;
	deleteFolder: (id: string) => void;
	toggleFolder: (id: string) => void;
	addFileToFolder: (id: string) => void;
	addFolderToFolder: (id: string) => void;
};

const FolderStructure: React.FC<FolderStructureProps> = ({
	items,
	deleteFile,
	deleteFolder,
	toggleFolder,
	addFileToFolder,
	addFolderToFolder,
}) => {
	const renderTree = (folder: FolderItem) => {
		if (!folder) return null;

		if (folder.isFolder) {
			return (
				<div key={folder.id} className='ml-5'>
					<div className='flex items-center cursor-pointer'>
						<div onClick={() => toggleFolder(folder.id)} className='text-blue-600'>
							{folder.isOpen ? '[-]' : '[+]'} {folder.name}
						</div>

						<div className='ml-5 flex gap-3 text-red-400'>
							<button onClick={() => deleteFolder(folder.id)}>[--] Delete Folder</button>
							<button onClick={() => addFileToFolder(folder.id)}>[+] Add File</button>
							<button onClick={() => addFolderToFolder(folder.id)}>[++] Add Folder</button>
						</div>
					</div>

					{folder.isOpen && folder.items.map((child: FolderItem) => renderTree(child))}
				</div>
			);
		}

		return (
			<div key={folder.id} className='ml-6 flex items-center'>
				<span className='text-blue-600'>{folder.name}</span>

				<button onClick={() => deleteFile(folder.id)} className='ml-3 text-red-400'>
					[-] Delete File
				</button>
			</div>
		);
	};

	return <div>{renderTree(items)}</div>;
};

export default FolderStructure;
