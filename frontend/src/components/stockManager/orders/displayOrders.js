import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiClient from '../../../services/api';

function DisplayOrders(){

    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [owner, setOwner] = useState('Any');
    
    function handleChange(event){
        setOwner(event.target.value);
    }
    
    var data;

    var portfolioStatus = '';
    var statusClass = '';
    
    var sumInvestment = 0;
    var sumValue = 0;
    var valueTotal;
    var investmentDiff;

    useEffect( () => {
        const fetchData = async () => { 

            apiClient.get(`/api/showAll/${owner}`).then(response => {
                setStocks(response.data)
                console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401){
                        setErrorMsg('Please login to see your stock data');
                    }
                });
    
            if(errorMsg){
                return <div><p>{errorMsg}</p></div>
            }
        }
        fetchData()
        .catch(console.error);
    }, [owner])


    data = stocks.map((s, index) => {
        var difference = parseFloat(-((s.totalInvested - s.currentValue)/s.totalInvested)*100).toFixed(2);
        var diffColor = '';
        difference < 0 ? diffColor = 'text-warning' : diffColor = '';

        var totalInvest = parseFloat(s.totalInvested).toFixed(2);

        valueTotal = parseFloat(s.currentValue).toFixed(2);

        sumInvestment += parseFloat(totalInvest);
        sumValue += parseFloat(valueTotal);

        return (
            <tr className="align-middle" key={index}>
                <td><NavLink className='remove-link-underline' to={`/stockManager/orders/${s.tickerSymbol}`} >{s.name}</NavLink></td>
                <td>{s.tickerSymbol}</td>
                <td>{parseFloat(s.quantity).toFixed(3)}</td>
                <td>${totalInvest}</td>
                <td>${valueTotal}</td>
                <td className={diffColor}><strong>{difference}%</strong></td>
            </tr>
        )
    });

    // calulation done outside of .map as it won't work within .map function above
    investmentDiff = -((sumInvestment - sumValue)/sumInvestment) * 100;
    investmentDiff > 0 ? portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Gains' : portfolioStatus = parseFloat(investmentDiff).toFixed(2) + '% in Losses';
    investmentDiff < 0 ? statusClass = 'text-warning' : statusClass = '';


    return (
        <div>
            <h4 className={statusClass}>Portfolio Performance: {portfolioStatus}</h4>
            <h5>Invested: ${sumInvestment.toFixed(2)} | 
            Portfolio Value: ${sumValue.toFixed(2)}</h5>
            <h5>Sort by Owner 
                <select onChange={handleChange}>
                    <option value="Any">Any</option>
                    <option value="Edmund">Edmund</option>
                    <option value="Mum">Mum</option>
                    <option value="Priscilla">Priscilla</option>
                    <option value="Yau Yau">Yau Yau</option>
                    <option value="RothIRA">RothIRA</option>
                </select>
            </h5>

            <table className="align-middle">
                <thead>
                    <tr>
                        <th className="td-name">Name</th>
                        <th>Ticker Symbol</th>
                        <th>Quantity</th>
                        <th>Invested Total</th>
                        <th>Current Value</th>
                        <th>Difference</th>
                    </tr>
                    {data}
                </thead>
            </table>
        </div>
    )
}

export default DisplayOrders