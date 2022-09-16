import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Stocks from './stocks/index';
import Dividends from './dividends/index';

function Navigation() {

    return (
        <div className="align-middle">
            <div>
                <NavLink className='nav-links' to='/stockManager/stocks'>Stocks</NavLink>
                <NavLink className='nav-links' to='/stockManager/dividends'>Dividends</NavLink>
            </div>
            <Routes>
                <Route path="/stocks" element={ <Stocks/>} />
                <Route path="/dividends" element={ <Dividends />} />
            </Routes>
        </div>
    );
};
export default Navigation;