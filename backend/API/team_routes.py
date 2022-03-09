from flask import Blueprint, jsonify, request
from backend.models import Team, db


team_routes = Blueprint('teams', __name__)


@team_routes.route('/')
def index():
    response = Team.query.all()
    return {"teams": [team.to_dict() for team in response]}


@team_routes.route('/create', methods=['POST'])
def create():

    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    teamName = request.json.get('teamName', None)
    imgURL = request.json.get('teamImg', None)
    teamMemberOne = request.json.get('teamMemberOne', None)
    teamMemberTwo = request.json.get('teamMemberTwo', None)

    if not teamName or not imgURL or not teamMemberOne or not teamMemberTwo:
        return {"errors": ["Please re-enter team name, image url, team member one and team member two"]}, 400

    new_team = Team(
        teamName=teamName,
        imgURL=imgURL,
        teamMemberOne=teamMemberOne,
        teamMemberTwo=teamMemberTwo
    )

    db.session.add(new_team)
    db.session.commit()

    return 200
