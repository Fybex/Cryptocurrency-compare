import React, { useState } from 'react';
import './Search.scss';

type SearchProps = {
	onSearch: (search: string) => void;
};

export default function Search(props: SearchProps) {
	const { onSearch } = props;
	const [search, setSearch] = useState('');

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
