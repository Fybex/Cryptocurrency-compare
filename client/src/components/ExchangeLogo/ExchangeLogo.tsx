import React from 'react';
import binanceLogo from '../../assets/binance.svg';
import cryptoLogo from '../../assets/cryptocom.svg';
import Exchange from '../../types/exchange';

type ExchangeLogoProps = {
	exchange: Exchange;
};

export default function ExchangeLogo(props: ExchangeLogoProps) {
	const { exchange } = props;

	const logo = () => {
		switch (exchange) {
			case Exchange.Binance:
				return binanceLogo;
			case Exchange.CryptoCom:
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
