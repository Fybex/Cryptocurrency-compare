import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import ExchangeLogo from '../ExchangeLogo/ExchangeLogo';
import './Card.scss';

export default function Card(props) {
	const { item, index } = props;
	const {
		symbol,
		symbol_2: symbol2,
		open_price: openPrice,
		exchange,
		price_change: priceChange,
	} = item;

	const cardPriceChangeClass = classnames(
		'card__body__price-change',
		priceChange >= 0
			? 'card__body__price-change--positive'
			: 'card__body__price-change--negative'
	);

	return (
		<Link
			to={`${symbol2 !== 'USDT' ? `/${symbol2}` : ''}/${symbol}`}
			className='card'
		>
			<div className='card__header'>
				<div className='card__header__number'>{index + 1}</div>
				<div className='card__header_symbols'>
					<div className='card__header__symbol'>{symbol}</div>
					{symbol2 !== 'USDT' && (
						<div className='card__header__symbol card__header__symbol-2'>
							{symbol2}
						</div>
					)}
				</div>
			</div>
			<div className='card__body'>
				<div className='card__body__open-price'>{openPrice}</div>
				<div className='card__body__exchange'>
					<ExchangeLogo exchange={exchange} />
				</div>
				<div className={cardPriceChangeClass}>{priceChange}</div>
			</div>
		</Link>
	);
}
