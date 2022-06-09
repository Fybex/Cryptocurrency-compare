import Exchange from './exchange';

type TypePairs = {
	exchange: Exchange;
	open_price: number;
	price_change: number;
	price_change_24h: number;
	symbol: string;
	symbol_2: string;
};

export default TypePairs;
