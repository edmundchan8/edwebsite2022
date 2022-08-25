import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Todolist from './components/todolist';
import Login from './components/login';
import Register from './components/register';

function AppRoutes() {

    const [loggedIn, setLoggedIn] = useState(false);

    function login(){
        setLoggedIn(true);  
    }
    return (
        <Router>
            <div className='navigation'>
                <NavLink className='nav-links' to='/login'>Login</NavLink>
                <NavLink className='nav-links' to='/register'>Register</NavLink>
                <NavLink className='nav-links' to='/todolist'>Todolist</NavLink>
            </div>
            <Routes>
                <Route path='/login' element={ <Login />} />
                <Route path='/register' element={ <Register  />} />
                <Route path='/todolist' element={ <Todolist />} />
            </Routes>
        </Router>
    );
};
export default AppRoutes;