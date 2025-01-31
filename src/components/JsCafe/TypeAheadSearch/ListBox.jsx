import React from 'react';
import './ListBox.css';

const ListBox = ({ items, activeIdx }) => {
	return (
		<ul className='listBoxContainer'>
			{items.map((item, index) => (
				<li className={`listBoxItem ${index === activeIdx ? 'activeItem' : ''}`} key={index}>
					{item.name}
				</li>
			))}
		</ul>
	);
};

export default ListBox;
