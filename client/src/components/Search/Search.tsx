import React, { useState } from 'react';
import './Search.scss';

interface ISearchProps {
	onSearch: (search: string) => void;
}

export default function Search(props: ISearchProps) {
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
