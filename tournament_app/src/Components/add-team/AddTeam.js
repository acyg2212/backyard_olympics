
import React, { useState, useContext, useEffect } from "react";
import TeamsContext from "../../TeamsContex";
import './add-team.css'
import Team from "../../Models/Team";

import { useNavigate } from 'react-router-dom';
import UserContext from "../../UserContext";

function AddTeam() {
    let navigate = useNavigate()
    let { teams, setTeams } = useContext(TeamsContext)
    let { fetchWithCSRF, setFetchWithCSRF } = useContext(UserContext)
    let [teamName, setTeamName] = useState('');
    let [teamImg, setTeamImg] = useState("");
    let [errors, setErrors] = useState([])

    let createTeam = (e) => {
        e.preventDefault();
        async function signupUser() {
            const response = await fetchWithCSRF(`/api/teams/create`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    teamName,
                    teamImg,

                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {

                // history.push('/')
                // history.push('/users')
            }
        }
        signupUser();
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
            <form className="sign-up-form" onSubmit={createTeam}>
                <h1 className="text-center">Add a Team</h1>
                <div>
                    <div className="form-group">
                        <label>Name</label>
                        <input onChange={(e) => setTeamName(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Image Url</label>
                        <input onChange={(e) => setTeamImg(e.target.value)} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Team Member 1</label>
                        <select className="form-control">
                            <option>--choose player--</option>
                            <option>The Bro</option>
                            <option>J</option>
                            <option>The Duane</option>
                            <option>The Russell</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Team Member 2</label>
                        <select className="form-control">
                            <option>--choose player--</option>
                            <option>The Bro</option>
                            <option>J</option>
                            <option>The Duane</option>
                            <option>The Russell</option>
                        </select>
                    </div>
                    <div className="row justify-content-around">

                        <button type="submit" className='btn btn-success'>
                            Submit
                        </button>
                        <button onClick={() => goHome()} className='btn btn-success cancel-btn'>
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddTeam;