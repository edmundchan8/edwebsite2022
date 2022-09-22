import React, {useState, useEffect} from 'react';
import apiClient from '../../../services/api';

function Index() {

    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        apiClient.get('/api/stocks').then(response => {
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

    function updateData(){
        //getData
        apiClient.get('/api/getData').then(response => {
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const curStocks = stocks.map((s) => 
        <tr>
            <td>{s.name}</td>
            <td>{s.tickerSymbol}</td>
            <td>{s.price}</td>
            <td>{s.analystRating}</td>
            <td>{s.analystOpinion}</td>
            <td>{s.dividendRate}</td>
            <td>{s.forwardPE}</td>
        </tr>
    );

    return (
        <div className="align-middle">
            <button onClick={() => updateData()}>Update Data</button>
            <h1>Stocks</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker Symbol</th>
                        <th>Market Price</th>
                        <th>Analyst Rating</th>
                        <th>Analyst Opinion</th>
                        <th>Dividend Rate</th>
                        <th>Forward PE</th>
                    </tr>
                        {curStocks}
                </thead>
            </table>
        </div>
    );
};
export default Index;