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

    const curStocks = stocks.map((s) => 
        <tr>
            <td>{s.date}</td>
            <td>{s.name}</td>
            <td>{s.tickerSymbol}</td>
            <td>{parseFloat(s.quantity).toFixed(2)}</td>
            <td>{parseFloat(s.totalInvested).toFixed(2)}</td>
            <td>{s.owner}</td>
        </tr>
    );

    return (
        <div className="align-middle">
            <h1>Stocks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Ticker Symbol</th>
                        <th>Quantity</th>
                        <th>Invested Total</th>
                        <th>Owner</th>
                    </tr>
                        {curStocks}
                </thead>
            </table>
        </div>
    );
};
export default Orders;