import requests
from constants import binance_url, crypto_url


def request_wrapper(url: str) -> dict:
    response = requests.get(url)
    response_json = response.json()
    return response_json


def filter_pairs_response(
    response_json: dict,
    coin: str,
    symbol: str,
    price_change: str,
    open_price: str,
    exchange: str,
) -> list[dict]:
    response_json = [
        item for item in response_json if item[symbol][-len(coin):] == coin
    ]
    response_json = [
        {
            "symbol": item[symbol][:-len(coin)].replace("_", ""),
            "symbol_2": coin,
            "price_change": float(item[price_change]),
            "open_price": float(item[open_price]),
            "exchange": exchange,
        }
        for item in response_json
    ]

    return response_json


def get_binance_pairs(coin: str) -> list[dict]:
    response = request_wrapper(binance_url)
    return filter_pairs_response(
        response, coin, "symbol", "priceChange", "askPrice", "Binance"
    )


def get_crypto_pairs(coin: str) -> list[dict]:
    response = request_wrapper(crypto_url)["result"]["data"]
    return filter_pairs_response(response, coin, "i", "c", "k", "Crypto.com")


def compare_exchanges(exchange_1: list[dict], exchange_2: list[dict]) -> list[dict]:
    result = []

    for item in exchange_1:
        for item_2 in exchange_2:
            if item_2["symbol"] not in [item["symbol"] for item in exchange_1]:
                result.append(item_2)
            if item["symbol"] == item_2["symbol"]:
                result.append(min(item, item_2, key=lambda x: x["open_price"]))
        if item["symbol"] not in [item_2["symbol"] for item_2 in exchange_2]:
            result.append(item)

    result = [dict(t) for t in {tuple(d.items()) for d in result}]

    result.sort(key=lambda x: x["open_price"], reverse=True)

    return result


def get_compared_pairs(coin: str) -> list[dict]:
    binance_pairs = get_binance_pairs(coin)
    crypto_pairs = get_crypto_pairs(coin)
    return compare_exchanges(binance_pairs, crypto_pairs)


def filter_pair_response(
    response_json: dict,
    bid_price: str,
    ask_price: str,
    high_price: str,
    low_price: str,
    volume: str,
    exchange: str,
) -> dict:
    if bid_price in response_json and ask_price in response_json:
        response_json = {
            "bid_price": float(response_json[bid_price]),
            "ask_price": float(response_json[ask_price]),
            "high_price": float(response_json[high_price]),
            "low_price": float(response_json[low_price]),
            "volume": float(response_json[volume]),
            "exchange": exchange,
        }

        return response_json

    return {
        "exchange": exchange,
    }


def get_binance_pair(symbol_1: str, symbol_2: str) -> dict:
    request_url = f"{binance_url}?symbol={symbol_1}{symbol_2}"
    response = request_wrapper(request_url)
    return filter_pair_response(
        response, "bidPrice", "askPrice", "highPrice", "lowPrice", "volume", "Binance"
    )


def get_crypto_pair(symbol_1: str, symbol_2: str) -> dict:
    request_url = f"{crypto_url}?instrument_name={symbol_1}_{symbol_2}"
    response = request_wrapper(request_url)["result"]["data"]
    return filter_pair_response(response, "b", "a", "h", "l", "v", "Crypto.com")


def get_pair(symbol_1: str, symbol_2: str) -> list[dict]:
    binance_pair = get_binance_pair(symbol_1, symbol_2)
    crypto_pair = get_crypto_pair(symbol_1, symbol_2)
    return [binance_pair, crypto_pair]
