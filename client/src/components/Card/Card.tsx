import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ExchangeLogo from '../ExchangeLogo/ExchangeLogo';
import Exchange from 'src/utils/exchange';
import './Card.scss';

interface ICardProps {
	exchange: Exchange;
	index: number;
	openPrice: number;
	priceChange: number;
	symbol: string;
	symbol2: string;
}

export default function Card(props: ICardProps) {
	const { exchange, index, openPrice, priceChange, symbol, symbol2 } = props;

	const cardPriceChangeClass = classnames(
		'card__body__price-change',
		`card__body__price-change--${
			priceChange >= 0 ? 'positive' : 'negative'
		}`
	);

	return (
		<Link to={`/${symbol2}/${symbol}`} className='card'>
			<div className='card__header'>
				<div className='card__header__number'>{index + 1}</div>
				<div className='card__header_symbols'>
					<div className='card__header__symbol'>{symbol}</div>
					<div className='card__header__symbol card__header__symbol-2'>
						{symbol2}
					</div>
				</div>
			</div>
			<div className='card__body'>
				<div className='card__body__open-price'>{openPrice}</div>
				<div className='card__body__exchange'>
					<ExchangeLogo exchange={exchange} />
				</div>
				<div className={cardPriceChangeClass}>{`${
					priceChange > 0 ? '+' : ''
				}${priceChange}%`}</div>
			</div>
		</Link>
	);
}
