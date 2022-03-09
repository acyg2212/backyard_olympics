import imp
import os
from flask import Flask
from flask_cors import CORS
from backend.config import Config
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, current_user
from flask_migrate import Migrate
from backend.models import db, User
from backend.API.user_routes import user_routes
from backend.API.team_routes import team_routes

app = Flask(__name__)
db.init_app(app)
migrate = Migrate(app, db)
app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(team_routes, url_prefix='/api/teams')
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
    role = current_user.role if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id, 'role': role}
