import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Home from './home';
import Login from './components/login';
import Todolist from './components/todolist';
import StockManager from './components/stockManager/index';
// import apiClient from './services/api';
import TcgTracker from './components/tcgTracker/index';
import FowPeasant from './components/fowPeasant/index';

function App() {

    //navigate to another route on logout
    // const navigate = useNavigate();

    // set if we are logged in
    const [loggedIn, setLoggedIn] = useState(false);

    // log in function, setting variable to true as well as sessionStorage
    function login(){
        setLoggedIn(true);
        sessionStorage.setItem('loggedIn', true);
    }

    // log out sents an api post request to loginController, which sets logged in to false
    // as sets sessionStorage to false as well
    // function logout(){
    //     apiClient.post('/api/logout').then(response => {
    //         if (response.status === 200){
    //             setLoggedIn(false);
    //             sessionStorage.setItem('loggedIn', false);
    //             navigate('/home');
    //         }
    //     })
    // }

    // controls if the login or logout links/buttons appear
    // var loginNavContent = null;
    // !loggedIn ? loginNavContent = <NavLink 
    // className='nav-links' to='/login'>Login</NavLink> : 
    // loginNavContent = <button className='nav-links' onClick={logout}>Logout</button>;

    // Make stock app appear here
    var stockManager = null;

    loggedIn ? stockManager = <NavLink className='nav-links remove-link-underline' to='/stockManager'>Stock Manager</NavLink> : stockManager = null;
    return (
        <div>
            <div className='navigation'>
                <NavLink className='nav-links remove-link-underline' to='/home'>Home</NavLink>
                {/* {loginNavContent} */}
                {stockManager}
                <NavLink className='nav-links remove-link-underline' to='/todolist'>Todolist</NavLink>
                <NavLink className='nav-links remove-link-underline' to='/tcgtracker'>TCG Tracker</NavLink>
                <NavLink className='nav-links remove-link-underline' to='/fowPeasant'>FOW Peasant</NavLink>
            </div>
            <Routes>
                <Route exact path="/home" element={ <Home/>} />
                <Route exact path='/login' element={ <Login onLogin={login}/>} />
                <Route exact path='/todolist' element={ <Todolist />} />
                <Route exact path='/tcgtracker' element={ <TcgTracker />} />
                <Route exact path='/fowPeasant' element={ <FowPeasant />} />
                <Route path='/stockManager/*' element={<StockManager />}/>
                <Route exact path="/" element={ <Home/>} />
            </Routes>
        </div>
    );
};
export default App;