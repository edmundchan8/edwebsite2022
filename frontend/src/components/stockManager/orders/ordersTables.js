import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom';

function OrdersTable(props){

    const [data, setData] = useState();

    // var tempData = null;
    // var valueTotal = 0;
    // var investmentDiff = 0;
    var portfolioStatus = '';
    var statusClass = '';
    var sumInvestment = 0;
    var sumValue = 0;
    // var breakPrice = 0;

    useEffect(()=>{
        var tempData = null;
        var valueTotal = 0;
        var investmentDiff = 0;
        // var portfolioStatus = '';
        // var sumInvestment = 0;
        // var sumValue = 0;
        var breakPrice = 0;

        tempData = props.stockData.map((s, index) => {
            var difference = parseFloat(-((s.totalInvested - s.currentValue)/s.totalInvested)*100).toFixed(2);
            var diffColor = '';
            difference < 0 ? diffColor = 'text-warning' : diffColor = '';
    
            var totalInvest = parseFloat(s.totalInvested).toFixed(2);
    
            valueTotal = parseFloat(s.currentValue).toFixed(2);
    
            sumInvestment += parseFloat(totalInvest);
            sumValue += parseFloat(valueTotal);
    
            // calculate the stock break price - Current Value / number of stocks
            breakPrice = valueTotal / s.quantity;
            return (
                <tr className="align-middle" key={index}>
                    <td><NavLink className='remove-link-underline' to={`/stockManager/orders/${s.tickerSymbol}`} >{s.name}</NavLink></td>
                    <td>{s.tickerSymbol}</td>
                    <td>{parseFloat(s.quantity).toFixed(3)}</td>
                    <td>${totalInvest}</td>
                    <td>${valueTotal}</td>
                    <td>${parseFloat(breakPrice).toFixed(3)}</td>
                    <td className={diffColor}><strong>{difference}%</strong></td>
                </tr>
            )
        });
    
        // calculation done outside of .map as it won't work within .map function above
        investmentDiff = -((sumInvestment - sumValue)/sumInvestment) * 100;
        investmentDiff > 0 ? portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Gains' : portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Losses';
        investmentDiff < 0 ? statusClass = 'text-warning' : statusClass = '';
        
        setData(tempData);

    },[props]);

    return(
        <div>
            <p className={statusClass}><b>Portfolio Performance: {portfolioStatus}</b> |
            Invested: ${sumInvestment.toFixed(2)} | <b>Portfolio Value: ${sumValue.toFixed(2)}</b></p>
            <table className="align-middle">
                <thead>
                    <tr>
                        <th className="td-name">Name</th>
                        <th>Ticker Symbol</th>
                        <th>Quantity</th>
                        <th>Invested Total</th>
                        <th>Current Value</th>
                        <th>Break Price</th>
                        <th>Difference</th>
                    </tr>
                </thead>
                <thead>
                    {data}
                </thead>
            </table>
        </div>
    );

}

export default OrdersTable;