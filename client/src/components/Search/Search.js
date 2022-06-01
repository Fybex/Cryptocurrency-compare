import React, { useState } from 'react';
import './Search.scss';

export default function Search(props) {
	const { onSearch } = props;
	const [search, setSearch] = useState('');

	const handleSearch = event => {
		event.preventDefault();
		setSearch(event.target.value);
		onSearch(event.target.value);
	};

	return (
		<div className='search'>
			<input
				type='text'
				placeholder='Search coin...'
				value={search}
				onChange={handleSearch}
			/>
		</div>
	);
}
