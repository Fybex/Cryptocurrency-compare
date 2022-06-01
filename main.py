from flask import Flask, jsonify, Response
from api import get_compared_pairs, get_pair

app = Flask(__name__)


@app.route("/", methods=["GET"])
@app.route("/<string:symbol>", methods=["GET"])
def coins_to_symbol(symbol: str = "USDT") -> Response:
    result = {"symbol": symbol, "pairs": get_compared_pairs(symbol)}
    return jsonify(result)


@app.route("/<string:symbol_2>/<string:symbol_1>", methods=["GET"])
def get_pair_price(symbol_2: str, symbol_1: str) -> Response:
    result = {"symbol": f"{symbol_1}{symbol_2}", "pair": get_pair(symbol_1, symbol_2)}
    return jsonify(result)
