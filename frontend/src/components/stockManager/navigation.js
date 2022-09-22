import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Stocks from './stocks/index';
import Orders from './stocks/orders';
import Dividends from './dividends/index';

function Navigation() {

    return (
        <div className="align-middle">
            <div>
                <NavLink className='nav-links' to='/stockManager/stocks'>Stocks</NavLink>
                <NavLink className='nav-links' to='/stockManager/showAll'>Stock Orders</NavLink>
                <NavLink className='nav-links' to='/stockManager/dividends'>Dividends</NavLink>
            </div>
            <Routes>
                <Route path="/stocks" element={ <Stocks/>} />
                <Route path="/showAll" element={ <Orders/>} />
                <Route path="/dividends" element={ <Dividends />} />
            </Routes>
        </div>
    );
};
export default Navigation;