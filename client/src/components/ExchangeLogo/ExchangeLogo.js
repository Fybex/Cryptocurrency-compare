import React from 'react';
import binanceLogo from '../../assets/binance.svg';
import cryptoLogo from '../../assets/cryptocom.svg';

export default function ExchangeLogo(props) {
	const { exchange } = props;

	return (
		<img
			className='pair-card__column__item__logo'
			src={exchange === 'Binance' ? binanceLogo : cryptoLogo}
			alt={exchange}
		/>
	);
}
