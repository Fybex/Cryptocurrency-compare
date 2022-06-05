import React, { useEffect, useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import Button from '../../components/Button/Button';
import Cards from '../../components/Cards/Cards';
import Search from '../../components/Search/Search';
import Spinner from '../../components/Spinner/Spinner';
import API_URL from '../../constants/api';
import './Pairs.scss';

export default function Pairs() {
	const { symbol = 'USDT' } = useParams();
	const navigate = useNavigate();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [pairs, setPairs] = useState(null);
	const [showCount, setShowCount] = useState(10);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const fetchPairs = async () => {
			setLoading(true);

			const response = await fetch(`${API_URL}${symbol}`);

			const data = await response.json();
			setData(data);

			setLoading(false);
		};

		fetchPairs();
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
					<Button onClick={() => navigate(-1)}>Back</Button>
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
