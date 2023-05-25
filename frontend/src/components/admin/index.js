import React from 'react'
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import AdminStocks from './adminStocks';
import ChangePassword from './changePassword';

function Index(){
    return (
        <div>
            <h1>Admin</h1>
            <NavLink to='/admin/adminStocks'>Edit Stocks</NavLink>
            <br></br>
            <NavLink to='/admin/changePassword'>Change Password</NavLink>
            <Routes>
                <Route exact path='/adminStocks' element={ <AdminStocks />} />
                <Route exact path='/changePassword' element={ <ChangePassword />} />
            </Routes>
        </div>
    )
}

export default Index