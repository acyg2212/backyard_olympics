import React,{useState, useContext, useEffect} from "react";
import Team from "../../Models/Team";
import EventContext from "../../EventContext";
import './events.css';
import {useNavigate} from 'react-router-dom';


function Events() {
    let navigate = useNavigate()
    let {events, setEvents} = useContext(EventContext)
    let goHome = () => {
        navigate("/")
   }

  return (
    
      <div className="home-page container">
          <h1 className="text-center">Events</h1>
          <div className= "team-veiw">
              {events.map(event => {
                  return(
                  <div className="card card-team" key={event.id}>
                    <div className="card-body event-card">
                        <img className="img-team" src={event.img_url}/> 
                        <p>{event.eventName}</p>
                        <p>{event.description}</p>
                      
                    </div>
                  </div>)
              })}
          </div>
          <button type = "button" onClick={()=>goHome()}className = "btn btn-block btn-primary">
            Home
          </button>
      </div>
  );
}

export default Events;