import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function DisplayOrders(props){
    
    const [owner, setOwner] = useState('Any');

    function handleChange(event){
        console.log(event.target.value);
        setOwner(event.target.value);
    }
    
    var curStocks = [];
    var portfolioStatus = '';
    var statusClass = '';
    
    var sumInvestment = 0;
    var sumValue = 0;

    useEffect( () => {
        curStocks = props.stocks.map((s, index) => {
            console.log(s.owner);
            if(owner === "" || owner === s.owner){
                var difference = parseFloat(-((s.totalInvested - s.currentValue)/s.totalInvested)*100).toFixed(2);
                var diffColor = '';
                if (difference < 0){
                    diffColor = 'text-warning';
                }
        
                var shareTotalInvest = parseFloat(s.totalInvested).toFixed(2);
                var valueTotal = parseFloat(s.currentValue).toFixed(2);
        
                sumInvestment += parseFloat(shareTotalInvest);
                sumValue += parseFloat(valueTotal);
        
                var investmentDiff = -((sumInvestment - sumValue)/sumInvestment) * 100;
        
                investmentDiff > 0 ? portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Gains' : portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Losses';
        
                investmentDiff < 0 ? statusClass = 'text-warning' : statusClass = '';
        
                return (
                    <tr key={index}>
                        <NavLink className='nav-links remove-link-underline' to={`/stockManager/orders/${s.tickerSymbol}`} >{s.name}</NavLink>
                        <td>{s.tickerSymbol}</td>
                        <td>{parseFloat(s.quantity).toFixed(3)}</td>
                        <td>${shareTotalInvest}</td>
                        <td>${valueTotal}</td>
                        <td className={diffColor}><strong>{difference}%</strong></td>
                    </tr>
                )} 
            }
        );
    }, [owner])

    return (
        <div>
            <h3 className={statusClass}>Portfolio Performance: {portfolioStatus}</h3>
            <h3>Invested: ${sumInvestment.toFixed(2)} | 
            Portfolio Value: ${sumValue.toFixed(2)}</h3>
            Sort by Owner
            <select onChange={handleChange}>
                <option value="">Any</option>
                <option value="Edmund">Edmund</option>
                <option value="Mum">Mum</option>
                <option value="Priscilla">Priscilla</option>
                <option value="Yau Yau">Yau Yau</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th className="td-name">Name</th>
                        <th>Ticker Symbol</th>
                        <th>Quantity</th>
                        <th>Invested Total</th>
                        <th>Current Value</th>
                        <th>Difference</th>
                    </tr>
                    {curStocks}
                </thead>
            </table>
        </div>
    )
}

export default DisplayOrders