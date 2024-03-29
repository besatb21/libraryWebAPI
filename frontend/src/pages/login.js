import axios from "axios";
import { useNavigate } from 'react-router-dom';

import React, { useState, useEffect } from "react";
import '../styles.css'
import { AUTHENTICATION } from "../constants";
import Home from "./home";
import { NavBar } from "../components/Navbar";

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
    useEffect(()=>{},[localStorage]);
    async function handleSubmit() {

        console.log(username, "  ", password);
        await axios.post(AUTHENTICATION, { "username": username, "password": password })
            .then((res) => {
                localStorage.setItem("token", res.data['token']);
                localStorage.setItem("username", res.data['user'].username);
                localStorage.setItem("role", res.data['user'].role);
                if (res.data['author'].length)
                    localStorage.setItem("author_id", res.data['author'][0].id);

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
                <>  <NavBar/>
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


                    </div></> : <Home/>}
        </>
    );


}


export function LogoutComponent() {
    const navigate = useNavigate();
    function logout() {
        localStorage.clear();
        navigate('/');
    }
    return <><NavBar/>{localStorage.length > 0 &&logout()}</>;
}