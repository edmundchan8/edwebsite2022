import React, {useState, useEffect} from 'react';
import apiClient from '../../../services/api';

function Orders() {

    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        apiClient.get('/api/showAll').then(response => {
            setStocks(response.data)
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your stock data');
                }
            });
        }, []);

    if(errorMsg){
        return (
            <div>
                <p>{errorMsg}</p>
            </div>
        )
    }

    var sumInvestment = 0;
    var sumValue = 0;
    var portfolioStatus = '';
    var statusClass = '';

    const curStocks = stocks.map((s, index) => {
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
                <td><a href='' className='remove_link_underline'>{s.name}</a></td>
                <td>{s.tickerSymbol}</td>
                <td>{parseFloat(s.quantity).toFixed(2)}</td>
                <td>${shareTotalInvest}</td>
                <td>${valueTotal}</td>
                <td className={diffColor}><strong>{difference}%</strong></td>
            </tr>
        )}
    );

    return (
        <div className="align-middle">
            <h1>Stocks</h1>
            <table>
                <thead>
                    <tr>
                        <th className='td-name'><a href='' className='remove_link_underline'>Name</a></th>
                        <th><a href='' className='remove_link_underline'>Ticker Symbol</a></th>
                        <th><a href='' className='remove_link_underline'>Quantity</a></th>
                        <th><a href='' className='remove_link_underline'>Invested Total</a></th>
                        <th><a href='' className='remove_link_underline'>Current Value</a></th>
                        <th><a href='' className='remove_link_underline'>Difference</a></th>
                    </tr>
                        {curStocks}
                </thead>
            </table>

            <h3 className={statusClass}>{portfolioStatus}</h3>
            <h3>Invested: ${sumInvestment.toFixed(2)}</h3>
            <h3>Portfolio Value: ${sumValue.toFixed(2)}</h3>
        </div>
    );
};
export default Orders;