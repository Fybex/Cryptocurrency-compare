import Exchange from './exchange';

type TypePair = {
	ask_price: number;
	bid_price: number;
	exchange: Exchange;
	high_price: number;
	low_price: number;
	volume: number;
};

export default TypePair;
