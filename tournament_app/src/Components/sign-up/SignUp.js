import React, { useState, useContext } from 'react';
import "./SignUp.css"
import UserContext from '../../UserContext';
// let history = useHistory();


const SignUp = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("")
    // const token = useSelector(state => state.authentication.token);
    // const dispatch = useDispatch();
    const { fetchWithCSRF, setCurrentUserId, setCurrentUser } = useContext(UserContext);
    const [errors, setErrors] = useState([]);



    const submitForm = e => {
        e.preventDefault();
        // Make the following an IIFE?
        async function signupUser() {
            const response = await fetchWithCSRF(`/api/users/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName,
                    email,
                    username,
                    lastName,
                    password,
                    password2
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.current_user_id)
                setCurrentUser(responseData.current_user);
                // history.push('/')
                // history.push('/users')
            }
        }
        signupUser();
    }

    return (
        <div className="sign-up-container container">
            <form className="sign-up-form" onSubmit={submitForm}>
                <h3 className='text-center signup-header multicolortext'>Create a Backyard Olympic's Account</h3>
                <div className='login-div'>
                    <p className="form-p">Create a new account below</p>
                    <a className="form-link" href=" /login">or sign in here.</a>
                </div>
                {errors.length ? errors.map(err => <li key={err} >{err}</li>) : ''}
                <label for="firstname">First Name</label>
                <input onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    className='form-control'
                    type="text"
                    id="firstname"
                    placeholder="First Name"
                    required />
                <label for="lastname">Last Name</label>
                <input onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    className='form-control'
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    required />
                <label for="username">Username</label>
                <input onChange={e => setUsername(e.target.value)}
                    value={username}
                    className='form-control'
                    type="text"
                    id="username"
                    placeholder="username"
                    required />
                <label for="email">Email</label>
                <input onChange={e => setEmail(e.target.value)}
                    value={email}
                    className='form-control'
                    type="email"
                    placeholder="Email"
                    id="email"
                    required />
                <label for="password">Password</label>
                <input onChange={e => setPassword(e.target.value)}
                    value={password}
                    className='form-control'
                    type="password"
                    placeholder="Password"
                    id="password"
                    required />
                <label for="confirmpassword">Confirm Password</label>
                <input onChange={e => setPassword2(e.target.value)}
                    value={password2}
                    className='form-control'
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmpassword"
                    required />
                <button className="btn btn-block btn-primary button-signin" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;