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
	const renderTree = (items: FolderItem) => {
		return items.items.map((item) => {
			if (item.isFolder) {
				return (
					<div key={item.id} className='ml-[20px]'>
						<div className='flex items-center'>
							<div onClick={() => toggleFolder(item.id)} className='text-red-400'>
								{item.isOpen ? '[-]' : '[+]'} {item.name}
							</div>

							<button onClick={() => deleteFolder(item.id)} className='ml-5 mt-1.5'>
								[--] Delete Folder
							</button>
						</div>

						{item.isOpen && (
							<div>
								{renderTree(item)}

								<div className='flex flex-wrap'>
									<button onClick={() => addFileToFolder(item.id)} className='ml-5 mt-1.5'>
										[+] Add File
									</button>

									<button onClick={() => addFolderToFolder(item.id)} className='ml-5 mt-1.5'>
										[+] Add Folder
									</button>
								</div>
							</div>
						)}
					</div>
				);
			} else {
				return (
					item.name && (
						<div key={item.id} className='ml-[20px] text-blue-400'>
							{item.name}

							<button onClick={() => deleteFile(item.id)} className='ml-5 mt-1.5 text-black'>
								[--] Delete File
							</button>
						</div>
					)
				);
			}
		});
	};

	return <div>{renderTree(items)}</div>;
};

export default FolderStructure;
