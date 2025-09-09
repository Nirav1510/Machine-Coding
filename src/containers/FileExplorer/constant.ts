export const initialStructure = [
	{
		id: '1',
		name: 'root',
		isFolder: true,
		isOpen: true,
		items: [
			{
				id: '2',
				name: 'src',
				isFolder: true,
				isOpen: false,
				items: [
					{
						id: '7',
						name: 'container',
						isFolder: true,
						isOpen: false,
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
						isOpen: false,
						items: [
							{
								id: '8',
								name: 'MyComponent.js',
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
	},
];
