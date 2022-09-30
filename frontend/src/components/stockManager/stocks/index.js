import React, {useState, useEffect} from 'react';
import apiClient from '../../../services/api';

function Index() {

    const [stocks, setStocks] = useState([]);
    const [financeApi, setFinanceApi] = useState('05i93571A13ATlFNYcZW32h8o8WmsCIq8hwIOFUj');
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
            setErrorMsg(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    // function getApiKey(){
    //     return financeApi;
    // }

    const curStocks = stocks.map((s, index) => {
        // styling and setting forwardPE
        var peClass = '';
        var forPeVal = null;
        forPeVal < 0 ? peClass = 'text-warning' : peClass = '';
        forPeVal == null ? forPeVal = '-' : forPeVal = s.forwardPE;

        // setting dividendValue
        var dividendValue = '';
        s.dividendRate > 0 ? dividendValue = s.dividendRate + '%' : dividendValue = '-';
        return(
            <tr key={index}>
                <td className="td-name">{s.name}</td>
                <td className="td-smaller">{s.tickerSymbol}</td>
                <td>${s.price}</td>
                <td className="td-smaller">{s.analystRating}</td>
                <td>{s.analystOpinion}</td>
                <td className="td-smaller">{dividendValue}</td>
                <td className={peClass}>{forPeVal}</td>
            </tr>
        )}
    );

    return (
        <div className="align-middle">
            <h2>{errorMsg}</h2>
            <button onClick={() => updateData()}>Update Data</button>
            <input type="text" name="current-api" value={financeApi} onChange={e => setFinanceApi(e.target.value)}/>
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