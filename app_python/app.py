"""
An Application to show Current time in Moscow
"""
import logging
import os
import json

from datetime import datetime
from flask import Flask, jsonify
from waitress import serve
import pytz

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(message)s')

app = Flask(__name__)
FILE_NAME = "./data/visits.json"

@app.route('/')
def index():
    """This is the entry point for specified root"""
    visits = 0
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r", encoding="utf-8") as file:
            visits = json.load(file)
    else:
        os.makedirs(os.path.dirname(FILE_NAME), exist_ok=True)
    with open(FILE_NAME, "w", encoding="utf-8") as file:
        json.dump(visits + 1, file)

    timezone = pytz.timezone("Europe/Moscow")
    now = datetime.now(timezone).strftime("%H:%M:%S - %d/%m/%Y")
    return f'<h1>{str(now)}</h1>'


@app.route("/visits")
def visit():
    """Sends back the total number of visits to the root endpoint."""
    visits = 0
    if os.path.exists(FILE_NAME):
        with open(FILE_NAME, "r", encoding="utf-8") as file:
            visits = json.load(file)
    return jsonify(visits)

@app.route("/health")
def health():
    return "OK"

if __name__ == '__main__':
    serve(app, host="0.0.0.0", port=8080)
