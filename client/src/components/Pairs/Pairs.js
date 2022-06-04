import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Button from '../Button/Button';
import './Pairs.scss';
import Spinner from '../Spinner/Spinner';

export default function Pairs() {
	const { symbol = 'USDT' } = useParams();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [pairs, setPairs] = useState(null);
	const [showCount, setShowCount] = useState(10);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setLoading(true);
		fetch(`https://cryptocurrency-compare.herokuapp.com/${symbol}`).then(
			response => {
				response.json().then(data => {
					setData(data);
					setLoading(false);
				});
			}
		);
	}, [symbol]);

	const handleShowMore = () => {
		setShowCount(showCount + 10);
	};

	const handleSearch = search => {
		setSearch(search);
	};

	useEffect(() => {
		if (data) {
			const filteredData = data.pairs.filter(item => {
				return item.symbol.toLowerCase().includes(search.toLowerCase());
			});
			setPairs(filteredData);
		}
	}, [search, data]);

	return loading ? (
		<Spinner />
	) : (
		<div className='pairs'>
			<div className='pairs__navbar'>
				<Search onSearch={handleSearch} />
				{symbol !== 'USDT' && (
					<Link to='/' className='pairs__navbar__back-button'>
						<Button>Back</Button>
					</Link>
				)}
			</div>
			{pairs && pairs.length > 0 ? (
				<>
					<Cards
						pairs={pairs}
						count={showCount}
						handleShowMore={handleShowMore}
					/>
				</>
			) : (
				<div className='pairs__no-pairs'>
					<h1>No pairs found</h1>
				</div>
			)}
		</div>
	);
}
