from flask import Blueprint, jsonify, request, session
from backend.models import User, db
from flask_login import login_user, LoginManager, current_user, logout_user, login_required


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    return {"users": [user.to_dict() for user in response]}


@user_routes.route('/login', methods=['GET', 'POST'])
def login():
    print("HERE!!!!")
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {"errors": ["Please re-enter email and password"]}, 400

    authenticated1, user1 = User.authenticate1(email, password)

    if authenticated1:
        user = user1
        authenticated = authenticated1
    else:
        authenticated = False
        user = None

    if authenticated:
        print("HERE #2!!!!!!")
        login_user(user)
        return {"current_user_id": current_user.id,
                "current_user": current_user.to_dict()}

    return {"errors": ["Invalid username, email, and/or password"]}, 401


@user_routes.route('/signup', methods=['POST'])
def signup():

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    password2 = request.json.get('password2', None)
    firstName = request.json.get("firstName", None)
    lastName = request.json.get("lastName", None)
    email = request.json.get('email', None)
    role = "player"

    if not username or not password or not firstName or not lastName or not email:
        return {"errors": ["Missing required parameters"]}, 400

    if not password == password2:
        return {"errors": ["Passwords must match each other"]}, 400

    new_user = User(
        username=username,
        firstName=firstName,
        lastName=lastName,
        email=email,
        password=password,
        role=role

    )
    db.session.add(new_user)
    db.session.commit()
    # return redirect('/api/users')

    login_user(new_user)
    return {"current_user_id": current_user.id,
            "current_user": current_user.to_dict()}


@user_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {'msg': 'You have been logged out'}, 200


@user_routes.route('/<int:id>')
def get_first_name(id):
    get_first = User.query.filter(User.id == id).all()

    return {"user": current_user.to_dict()}
