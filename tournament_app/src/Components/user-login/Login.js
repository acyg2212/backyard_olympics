import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import UserContext from '../../UserContext'
import "./Login.css"

function LogIn(props) {
    let navigate = useNavigate();
    const [email, setemail] = useState("acyg22");
    const [password, setPassword] = useState("password");
    const [errors, setErrors] = useState([]);
    const { fetchWithCSRF, setCurrentUserId, setCurrentUser } = useContext(UserContext);
    //let history = useHistory();

    const submitForm = (e) => {
        e.preventDefault();

        // Make the following an IIFE?
        async function loginUser() {
            const response = await fetchWithCSRF(`/api/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.current_user_id);
                setCurrentUser(responseData.current_user);
                navigate('/')
            }
        }
        loginUser();
    }
    return (
        <div className="authContain container">
            <div className="authForm">
                <div className="authFormDiv">
                    <h1 className="text-center multicolortext">
                        Backyard Olympics
                    </h1>
                    <div class="signup-link-div">
                        <p className="form-p text-center">Sign in below or</p>
                        <a className="form-link" href='/sign-up'>create an account.</a>
                    </div>
                    <div className="authFormInnerWrap">
                        <form onSubmit={submitForm}>
                            {errors.length ? errors.map((err) => <li key={err} style={{ color: "red" }}>{err}</li>) : ''}
                            Username or email
                            <input
                                type="text"
                                placeholder="Username or email"
                                value={email}
                                onChange={(e) => setemail(e.target.value)}
                                name="usernameoremail"
                                className='form-control' />
                            Password
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                className='form-control'
                            />
                            <button type="submit" className="btn btn-block btn-primary" style={{
                                height: `2rem`,
                                paddingLeft: `.5em`,
                                paddingRight: `.5em`,
                                marginTop: '15px',
                                fontWeight: `600`
                            }
                            }>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LogIn;