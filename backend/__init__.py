import os
from flask import Flask
from flask_cors import CORS
from backend.config import Config

app = Flask(__name__)


@app.route('/')
def index():
    return '<h1>This Works So Far</h1>'
