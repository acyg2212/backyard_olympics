import {uid} from 'uid';

class Team{
    constructor(teamName, img_url) {
        this.id=uid()
        this.teamName = teamName
        this.img_url = img_url
    }
}

export default Team;