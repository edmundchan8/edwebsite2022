import React from 'react'
import TcgBought from './tcgBought';
import TcgSold from './tcgSold';
import TcgList from './tcgList';

function index(){

    return(
        <div>
            <h1>TCG Tracker</h1>
            <TcgList />
        </div>
    );

}

export default index;