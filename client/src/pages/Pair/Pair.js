import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';
import Button from '../../components/Button/Button';
import ExchangeLogo from '../../components/ExchangeLogo/ExchangeLogo';
import Spinner from '../../components/Spinner/Spinner';
import API_URL from '../../constants/api';
import './Pair.scss';

export default function Pair() {
	const { symbol, symbol2 } = useParams();

	const [pair, setPair] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPair = async () => {
			setLoading(true);

			const response = await fetch(`${API_URL}${symbol}/${symbol2}`);

			const data = await response.json();
			setPair(data.pair);

			setLoading(false);
		};

		fetchPair();
	}, [symbol, symbol2]);

	const columnItem = (item, property, pair) => {
		const min = pair.reduce((min, p) => {
			return p[property] < min ? p[property] : min;
		}, Infinity);

		const classes = classnames('pair-card__column__item', {
			'pair-card__column__item--best-option': item[property] === min,
			'pair-card__column__item--worst-option': item[property] !== min,
		});

		return <div className={classes}>{item[property] ?? '-'}</div>;
	};

	return loading ? (
		<Spinner />
	) : (
		<div className='pair-card__wrapper'>
			<div className='pair-card'>
				<h1 className='pair-card__header'>
					<span className='pair-card__header__symbol'>{symbol2}</span>
					<span className='pair-card__header__symbol-2'>
						{symbol}
					</span>
				</h1>
				<div className='pair-card__row'>
					<div className='pair-card__column'>
						<div className='pair-card__column__item-designation'>
							Exchange
						</div>
						<div className='pair-card__column__item-designation'>
							Bid price
						</div>
						<div className='pair-card__column__item-designation'>
							Ask price
						</div>
						<div className='pair-card__column__item-designation'>
							High price
						</div>
						<div className='pair-card__column__item-designation'>
							Low price
						</div>
					</div>
					{pair?.map((item, index) => (
						<div className='pair-card__column' key={index}>
							<div className='pair-card__column__item'>
								<ExchangeLogo exchange={item.exchange} />
							</div>
							{columnItem(item, 'bid_price', pair)}
							{columnItem(item, 'ask_price', pair)}
							{columnItem(item, 'high_price', pair)}
							{columnItem(item, 'low_price', pair)}
						</div>
					))}
				</div>
			</div>
			<Link to={`/${symbol}`} className='pair-card__back-button'>
				<Button>Back to {symbol} pairs</Button>
			</Link>
		</div>
	);
}
