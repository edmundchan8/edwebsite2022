import React from 'react';
import Navigation from './navigation';

function Index() {

    return (
        <div className="align-middle">
            <h1>Stock Manager</h1>
            < Navigation />
            {/*
            <div>
                <NavLink className='nav-links' to='/stockManager/stocks'>Stocks</NavLink>
                <NavLink className='nav-links' to='/stockManager/dividends'>Dividends</NavLink>
            </div>
            <Routes>
                <Route path="/stocks" element={ <Stocks/>} />
                <Route path="/dividends" element={ <Dividends />} />
            </Routes>
             <label>
                <p>Cash I have:</p>
                <input type="text" name="cash-amount"/>
            </label>
            <br/>
            <label>
                <button>Click me to update Stock Data</button>
            </label> */}
        </div>
    );
};
export default Index;