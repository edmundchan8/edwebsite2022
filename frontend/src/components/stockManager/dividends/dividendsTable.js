import React from 'react';
import { NavLink } from 'react-router-dom';

function DividendsTable(props){

    const curDividends = props.dividends.map((d, index) => {      
        return (
            <tr key={index}>
                <td>
                    <NavLink className='remove-link-underline' to={`/stockManager/dividends/${d.name}`} >
                    {d.name}</NavLink>
                </td>
                <td className='dividend-width'>${d.totalDividends}</td>
            </tr>
        )}
    );

    return (
        <table className="align-middle">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total Dividend Received</th>
                </tr>
                    {curDividends}
            </thead>
        </table>
    )

}

export default DividendsTable;