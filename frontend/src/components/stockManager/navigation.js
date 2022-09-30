import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Stocks from './stocks/index';
import Orders from './orders/index';
import Dividends from './dividends/index';
import ShowDividend from './dividends/show';

function Navigation() {

    return (
        <div className="align-middle">
            <div>
                <NavLink className='nav-links' to='/stockManager/stocks'>Stocks</NavLink>
                <NavLink className='nav-links' to='/stockManager/orders'>Stock Orders</NavLink>
                <NavLink className='nav-links' to='/stockManager/dividends'>Dividends</NavLink>
            </div>
            <Routes>
                <Route path="/stocks" element={ <Stocks/>} />
                <Route path="/orders/" element={ <Orders/>} />
                <Route path="/dividends/" element={ <Dividends />} />
                <Route path="/dividends/:name" element={ <ShowDividend />} />
            </Routes>
        </div>
    );
};
export default Navigation;