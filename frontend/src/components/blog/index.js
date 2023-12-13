import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Create from './create';

function Index(){
    return (
        <div>
            <h1>Blog</h1>
            <NavLink to='/blog/create'>Add a Blog</NavLink>
            <br></br>
            <NavLink to='/'>Filter by Tags</NavLink>
            <Routes>
                <Route exact path='/create' element={ <Create />} />
            </Routes>
        </div>
    )
}

export default Index