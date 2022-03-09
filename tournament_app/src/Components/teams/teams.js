
import React, { useState, useContext, useEffect } from "react";
import TeamsContext from "../../TeamsContex";
import './teams.css';
import { useNavigate } from 'react-router-dom';


function Teams() {
  let navigate = useNavigate()
  let { teams, setTeams } = useContext(TeamsContext)
  let goHome = () => {
    navigate("/")
  }

  return (

    <div className="home-page container">
      <h1 className="text-center">Countries</h1>
      <div className="team-veiw">
        {teams.map(team => {
          return (
            <div className="card card-team" key={team.id}>
              <div className="card-body team-card">
                <div className="teamName-div">
                  <p >{team.teamName}</p>
                  <img className="img-team" src={team.img_url} />
                </div>
                <div className="teamMember-div">
                  <p>{team.teamMemberOne}</p>
                  <p>{team.teamMemberTwo}</p>
                </div>
              </div>
            </div>)
        })}
      </div>
      <button type="button" onClick={() => goHome()} className="btn btn-block btn-primary">
        Home
      </button>
    </div>
  );
}

export default Teams;