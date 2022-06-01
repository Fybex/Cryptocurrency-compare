import React from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import './Cards.scss';

export default function Cards(props) {
	const { pairs: rawPairs, count, handleShowMore } = props;

	if (!rawPairs) return null;

	const pairs = rawPairs.length > count ? rawPairs.slice(0, count) : rawPairs;

	return (
		<div className='cards'>
			<div className='cards__designations'>
				<div className='cards__designations__header card__header'>
					<div className='cards__designations__header__number'>#</div>
					<div className='cards__designations__header__symbol'>
						NAME
					</div>
				</div>
				<div className='cards__designations__body card__body'>
					<div className='cards__designations__body__open-price'>
						PRICE
					</div>
					<div className='cards__designations__body__exchange'>
						BEST EXCHANGE
					</div>
					<div className='cards__designations__body__price-change'>
						24H CHANGE
					</div>
				</div>
			</div>
			<div className='cards__container'>
				{pairs.map((item, index) => (
					<Card item={item} index={index} key={index} />
				))}
			</div>
			{rawPairs.length > count && (
					<Button className='cards__show-more-button' onClick={handleShowMore}>Load more</Button>
			)}
		</div>
	);
}
