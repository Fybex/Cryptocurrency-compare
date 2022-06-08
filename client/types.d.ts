import Exchange from 'src/utils/exchange';

export {};

declare global {
	interface IPair {
		ask_price: number;
		bid_price: number;
		exchange: Exchange;
		high_price: number;
		low_price: number;
		volume: number;
	}

	interface IPairs {
		exchange: Exchange;
		open_price: number;
		price_change: number;
		price_change_24h: number;
		symbol: string;
		symbol_2: string;
	}
}
