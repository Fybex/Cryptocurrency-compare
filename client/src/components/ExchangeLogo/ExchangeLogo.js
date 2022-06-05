import React from 'react';
import binanceLogo from '../../assets/binance.svg';
import cryptoLogo from '../../assets/cryptocom.svg';
import EXCHANGE from '../../constants/exchange';

export default function ExchangeLogo(props) {
	const { exchange } = props;

	const logo = () => {
		switch (exchange) {
			case EXCHANGE.BINANCE:
				return binanceLogo;
			case EXCHANGE.CRYPTO_COM:
				return cryptoLogo;
			default:
				return null;
		}
	};

	return (
		<img
			className='pair-card__column__item__logo'
			src={logo()}
			alt={exchange}
		/>
	);
}
