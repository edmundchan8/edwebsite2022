import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import Stocks from './stocks/index';
import Orders from './orders/index';
import ShowStocks from './orders/show';
import EditStocks from './orders/edit';
import DeleteStocks from './orders/delete';
import Dividends from './dividends/index';
import ShowDividend from './dividends/show';
import EditDividend from './dividends/edit';
import DeleteDividend from './dividends/delete';



function Navigation() {

    return (
        <div className="align-middle">
            <div>
                <NavLink className='nav-links' to='/stockManager/stocks'>Stocks</NavLink>
                <NavLink className='nav-links' to='/stockManager/orders'>Stock Orders</NavLink>
                <NavLink className='nav-links' to='/stockManager/dividends'>Dividends</NavLink>
            </div>
            <Routes>
                <Route path="/stocks/" element={ <Stocks/>} />
                <Route path="/orders/" element={ <Orders/>} />
                <Route path="/orders/:tickerSymbol" element={ <ShowStocks/>} />
                <Route path="/orders/:tickerSymbol/edit" element={ <EditStocks/>} />
                <Route path="/orders/:tickerSymbol/delete" element={ <DeleteStocks/>} />
                <Route path="/dividends/" element={ <Dividends />} />
                <Route path="/dividends/:name" element={ <ShowDividend />} />
                <Route path="/dividends/:name/edit" element={ <EditDividend />} />
                <Route path="/dividends/:name/delete" element={ <DeleteDividend />} />
            </Routes>
        </div>
    );
};
export default Navigation;