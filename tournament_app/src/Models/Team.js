import { uid } from 'uid';

class Team {
    constructor(teamName, img_url, teamMemberOne, teamMemberTwo) {
        this.id = uid()
        this.teamName = teamName
        this.img_url = img_url
        this.teamMemberOne = teamMemberOne
        this.teamMemberTwo = teamMemberTwo
    }
}

export default Team;