import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Todolist from './components/todolist';
import Login from './components/login';
import Register from './components/register';
import apiClient from './services/api';

function AppRoutes() {

    const [loggedIn, setLoggedIn] = useState(false);

    function login(){
        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    }

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

    var loginContent = null;
    console.log("current " + sessionStorage.getItem('loggedIn'));
    console.log(loggedIn);
    !loggedIn ? loginContent = <NavLink 
    className='nav-links' to='/login'>Login</NavLink> : 
    loginContent = <button className='nav-links' onClick={logout}>Logout</button>;
    return (
        <Router>
            <div className='navigation'>
                <NavLink className='nav-links' to='/'>Home</NavLink>
                {loginContent}
                <NavLink className='nav-links' to='/register'>Register</NavLink>
                <NavLink className='nav-links' to='/todolist'>Todolist</NavLink>
            </div>
            <Routes>
                <Route path='/login' element={ <Login onLogin={login}/>} />
                <Route path='/register' element={ <Register  />} />
                <Route path='/todolist' element={ <Todolist />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;