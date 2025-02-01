export const initialStructure = {
	id: '1',
	name: 'root',
	isFolder: true,
	items: [
		{
			id: '2',
			name: 'src',
			isFolder: true,
			items: [
				{
					id: '7',
					name: 'container',
					isFolder: true,
					items: [
						{
							id: '3',
							name: 'App.js',
							isFolder: false,
							items: [],
						},
					],
				},
				{
					id: '4',
					name: 'components',
					isFolder: true,
					items: [
						{
							id: '8',
							name: 'MyApp.js',
							isFolder: false,
							items: [],
						},
					],
				},
			],
		},
		{
			id: '5',
			name: 'package.json',
			isFolder: false,
			items: [],
		},
		{
			id: '6',
			name: 'package-lock.json',
			isFolder: false,
			items: [],
		},
	],
};
