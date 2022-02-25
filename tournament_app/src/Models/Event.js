import {uid} from 'uid';

class Event{
    constructor(eventName, img_url, description) {
        this.id=uid()
        this.eventName= eventName
        this.img_url = img_url
        this.description = description
    }
}

export default Event;