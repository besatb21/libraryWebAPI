import axios from "axios";
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import '../styles.css'
import { AUTHENTICATION } from "../constants";


export default function LoginComponent() {

    const navigate = useNavigate();
    const [loggedOut, setLoggedOut] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');

    function handleUsernameInput(event) {
        setUsername(event.target.value);
    }

    function handlePasswordInput(event) {
        setPassword(event.target.value);
    }

    async function handleSubmit() {

        console.log(username, "  ", password);
        await axios.post(AUTHENTICATION, { "username": username, "password": password })
            .then((res) => {
                // console.log(res.data['user']);
                localStorage.setItem("token", res.data['token']);
                localStorage.setItem("username", res.data['user'].username);
                localStorage.setItem("role", res.data['user'].role);
                if (errorMessages.length == 0)
                setLoggedOut(false);
    
                navigate('/home');

            })
            .catch((err) => {
                if (err.response.status == 404) {
                    setUsername('');
                    setPassword('');
                    setErrorMessages("Username/password is incorrect!!!");
                }
            });

    }

   

    return (
        
    <>
    {loggedOut ?
        <>
            <div className="form-div">
                <form className="form-body">


                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input required name="username" type="text" value={username}
                            onChange={handleUsernameInput} className="form-control" id="username" placeholder="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input required name="password" type="password" value={password}
                            onChange={handlePasswordInput} className="form-control" id="password" placeholder="password" />
                    </div>
                    {errorMessages && (
                        <div className="error"> {errorMessages} </div>
                    )}
                    <button type="button" onClick={handleSubmit} className="btn btn-primary">Login</button>
                </form>


            </div></>:""}

</>
    );


}


export function LogoutComponent() {
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        navigate('/');
    }
    return <>{localStorage.length > 0 ? <button type="button" className="btn  btn-outline-primary" onClick={logout}>Logout {localStorage.getItem('username')}</button> : ""}</>;
}