import imp
import os
from flask import Flask
from flask_cors import CORS
from backend.config import Config
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user

from backend.models import db, User

app = Flask(__name__)

login_manager = LoginManager(app)
CSRFProtect(app)

CORS(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get('FLASK_ENV') else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')


@app.route('/api/csrf/restore')
def restore_csrf():
    id = current_user.id if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id}
