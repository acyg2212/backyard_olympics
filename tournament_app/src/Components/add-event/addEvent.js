
import React,{useState, useContext, useEffect} from "react";
import EventContext from "../../EventContext";
import './addEvent.css'
import Event from "../../Models/Event";
import {useNavigate} from 'react-router-dom';

function AddEvent() {
    let navigate = useNavigate()
    let {events, setEvents} = useContext(EventContext)
    let [eventName, setEventName] = useState('');
    let [eventImg, setEventImg] = useState("");
    let [description, setDescription] =useState("");
    
    let createEvent = () => {
        let event = new Event(eventName,eventImg, description)
        let oldEvents = []
        oldEvents.push(...events)
        oldEvents.push(event)
        setEvents(oldEvents)
        navigate("/")
    }

    let cancelEvent = () => {
        navigate('/')
    }
   
    console.log(events)
    console.log(eventName)
    console.log(description)
  return (
    <div className="add-team-page container">
        <h1 className="text-center">Add an Event</h1>
        <div>
            <div className="form-group">
                <label>Event Name</label>
                <input onChange={(e)=>setEventName(e.target.value)}className="form-control"/>
            </div>
            <div className="form-group">
                <label>Image Url</label>
                <input onChange={(e)=>setEventImg(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Description of Event</label>
                <textarea onChange={(e)=>setDescription(e.target.value)} className="form-control"/>
            </div>
            <div className="row d-flex justify-content-around">
                <div >
                    <button onClick={()=>createEvent(eventName, eventImg, description)}  className='btn btn-success'>
                        Submit
                    </button>
                </div>
                <div >
                    <button onClick={()=>cancelEvent()}  className='btn btn-success'>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default AddEvent;