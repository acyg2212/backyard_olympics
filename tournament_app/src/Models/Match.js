import {uid} from 'uid';

class Match {

    static get TEAM_ONE() {
        return "team_one";
    }

    static get TEAM_TWO() {
        return "team_two";
    }

    constructor(team_one, team_two){
        this.id = uid()
        this.team_one = team_one
        this.team_two = team_two
        this.winner = null
        this.score_one = 0
        this.score_two = 0
    }

    setWinner(winner){
        this.winner= winner
    }

    matchEnded() {
        return this.winner !== null;
    }
}

export default Match;