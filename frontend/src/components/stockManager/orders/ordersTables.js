import React, {useEffect, useState} from "react";
import { NavLink } from 'react-router-dom';

function OrdersTable(props){

    const [data, setData] = useState();
    const [investmentSum, setInvestmentSum] = useState(0);
    const [portfolioStatus, setPortfolioStatus] = useState('');
    const [statusClass, setStatusClass] = useState('');
    const [sumTotal, setSumTotal] = useState(0);
    // const [breakPriceArr, setBreakPriceArr] = useState();

    var sumValue = 0;

    useEffect(()=>{
        var tempData = null;
        var valueTotal = 0;
        var investmentDiff = 0;
        var sumInvestment = 0;

        tempData = props.stockData.map((s, index) => {
            var difference = parseFloat(-((s.totalInvested - s.currentValue)/s.totalInvested)*100).toFixed(2);
            var diffColor = '';
            difference < 0 ? diffColor = 'text-warning' : diffColor = '';
    
            var totalInvest = parseFloat(s.totalInvested).toFixed(2);
    
            valueTotal = parseFloat(s.currentValue).toFixed(2);

            sumInvestment += parseFloat(totalInvest);

            sumValue += parseFloat(valueTotal);
            
            let breakPrice = s.breakPrice;

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
        setInvestmentSum(sumInvestment);
        setSumTotal(sumValue);
        // calculation done outside of .map as it won't work within .map function above
        investmentDiff = -((sumInvestment - sumValue)/sumInvestment) * 100;
        
        investmentDiff > 0 ? setPortfolioStatus(parseFloat(investmentDiff).toFixed(2) + '% in Gains') : setPortfolioStatus(parseFloat(investmentDiff).toFixed(2) + '% in Losses');
        
        investmentDiff < 0 ? setStatusClass('text-warning') : setStatusClass('');
        
        setData(tempData);

    },[props.stockData]);

    return(
        <div>
            <div className="align-middle margin-top-bottom">
                <span className={statusClass}>Portfolio Performance: {portfolioStatus}</span>|
                <span>Invested: ${investmentSum.toFixed(2)}</span>|
                <span>Portfolio Value: ${sumTotal.toFixed(2)}</span>    
            </div>
            
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