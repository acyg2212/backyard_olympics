
import React,{useState, useContext, useEffect} from "react";
import Team from "../../Models/Team";
import TeamsContext from "../../TeamsContex";
import './home.css';
import {useNavigate} from 'react-router-dom';
import homeImage from "../../assets/app_image.PNG"

function HomePage() {
  let navigate = useNavigate()
    let {teams, setTeams} = useContext(TeamsContext)
    let [redirect, setRedirect] = useState(false)
    console.log(teams)

    let addTeam = () => {
      navigate("/add-team")
    }

    let addEvent = () => {
      navigate("/add-event")
    }

    let seeTeams = () =>{
      navigate('/teams')
    }

    let seeEvents = () =>{
      navigate('/events')
    }

    let seeUpcomingMatches = () =>{
      navigate('/teams')
    }
   
  return (
    
      <div className="home-page container">
          <h1 className="text-center home-title">Welcome to the Backyard Olympics</h1>
          <img className="rounded-circle home-image img-fluid mx-auto d-block" src={homeImage}/>
          <button type = "button" onClick={()=>addTeam()}className = "btn btn-block btn-primary">
            Add Team
          </button>
          <button type = "button" onClick={()=>addEvent()}className = "btn btn-block btn-primary">
            Add Event
          </button>
          <button type = "button" onClick={()=>seeTeams()}className = "btn btn-block btn-primary">
            See Teams
          </button>
          <button type = "button" onClick={()=>seeEvents()}className = "btn btn-block btn-primary">
            See Events
          </button>
          <button type = "button" onClick={()=>seeUpcomingMatches()}className = "btn btn-block btn-primary">
            Upcoming Matches
          </button>
      </div>
  );
}

export default HomePage;