from flask import Blueprint, jsonify, request
from backend.models import Team, db


team_routes = Blueprint('teams', __name__)


@team_routes.route('/')
def index():
    response = Team.query.all()
    return {"users": [team.to_dict() for team in response]}
