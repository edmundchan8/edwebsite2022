import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './home';
import Login from './components/login';
// import Todolist from './components/todolist';
import StockManager from './components/stockManager/index';
import apiClient from './services/api';

function App() {

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
            if (response.status === 204){
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
            }
        })
    }

    // controls if the login or logout links/buttons appear
    var loginNavContent = null;
    !loggedIn ? loginNavContent = <NavLink 
    className='nav-links' to='/login'>Login</NavLink> : 
    loginNavContent = <button className='nav-links' onClick={logout}>Logout</button>;

    // Make stock app appear
    var stockManager = null;

    loggedIn ? stockManager = <NavLink className='nav-links' to='/stockManager/stocks'>Stock Manager</NavLink> : stockManager = null;
    return (
        <div>
            <Router>
                <div className='navigation'>
                    <NavLink className='nav-links' to='/home'>Home</NavLink>
                    {loginNavContent}
                    {stockManager}
                    {/* <NavLink className='nav-links' to='/todolist'>Todolist</NavLink> */}
                </div>
                <Routes>
                    <Route exact path="/home" element={ <Home/>} />
                    <Route exact path='/login' element={ <Login onLogin={login}/>} />
                    {/* <Route exact path='/todolist' element={ <Todolist />} /> */}
                    <Route path='/stockManager/*' element={<StockManager />}/>
                    <Route exact path="/" element={ <Home/>} />
                </Routes>
            </Router>
        </div>
    );
};
export default App;