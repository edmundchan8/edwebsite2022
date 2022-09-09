import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from 'react-router-dom';
import Todolist from './components/todolist';
import Login from './components/login';
import Home from './home';
import apiClient from './services/api';

function AppRoutes() {

    // set if we are logged in
    const [loggedIn, setLoggedIn] = useState(false);

    // log in function, setting variable to true as well as sessionStorage
    function login(){
        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    }

    // log out sents an api post request to loginController, which sets logged in to false
    // as sets sessionStorage to false as well
    function logout(){
        apiClient.post('/logout').then(response => {
            console.log(response);
            if (response.status === 204){
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                console.log(sessionStorage.getItem('loggedIn'));
            }
        })
    }

    // controls if the login or logout links/buttons appear
    var loginContent = null;
    !loggedIn ? loginContent = <NavLink 
    className='nav-links' to='/login'>Login</NavLink> : 
    loginContent = <button className='nav-links' onClick={logout}>Logout</button>;

    return (
        <Router>
            <div className='navigation'>
                <NavLink className='nav-links' to='/home'>Home</NavLink>
                {loginContent}
                <NavLink className='nav-links' to='/todolist'>Todolist</NavLink>
            </div>
            <Routes>
                <Route exact path="/home" element={ <Home/>} />
                <Route exact path='/login' element={ <Login onLogin={login}/>} />
                <Route exact path='/todolist' element={ <Todolist />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;