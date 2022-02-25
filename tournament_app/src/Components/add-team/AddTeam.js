
import React,{useState, useContext, useEffect} from "react";
import TeamsContext from "../../TeamsContex";
import './add-team.css'
import Team from "../../Models/Team";
import {useNavigate} from 'react-router-dom';

function AddTeam() {
    let navigate = useNavigate()
    let {teams, setTeams} = useContext(TeamsContext)
    let [teamName, setTeamName] = useState('');
    let [teamImg, setTeamImg] = useState("");
    
    let createTeam = () => {
        let team = new Team(teamName,teamImg)
        let oldTeams = []
        oldTeams.push(...teams)
        oldTeams.push(team)
        setTeams(oldTeams)
        navigate("/")
    }

    let goHome = () => {
        navigate('/')
    }
   
    console.log(teams)
    console.log(teamName)
    console.log(teamImg)
  return (
    <div className="add-team-page container">
        <h1 className="text-center">Add a Team</h1>
        <div>
            <div className="form-group">
                <label>Name</label>
                <input onChange={(e)=>setTeamName(e.target.value)}className="form-control"/>
            </div>
            <div className="form-group">
                <label>Image Url</label>
                <input onChange={(e)=>setTeamImg(e.target.value)} className="form-control"/>
            </div>
            <div className="row justify-content-around">
                
            <button onClick={()=>createTeam(teamName, teamImg)}  className='btn btn-success'>
                Submit
            </button>
            <button onClick={()=>goHome()}  className='btn btn-success cancel-btn'>
                Cancel
            </button>
            </div>
        </div>
    </div>
  );
}

export default AddTeam;