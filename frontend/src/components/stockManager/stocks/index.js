import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import Loading from '../../loading';

function Index() {

    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    var [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        apiClient.get('/stocks').then(response => {
            setStocks(response.data)
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
        // set spinning logo
        setIsLoading(true);
        apiClient.post('/getData').then(response => {
            console.log(response);
            new Promise((resolve, reject) => {
                if (response.data){
                    setIsLoading(false);
                    setErrorMsg(response.data.message);
                    navigate('/stockManager/stocks');
                    resolve('Promise success')
                }
                else {
                    reject('Promise failed');
                }
            })
        })
        .catch(error => {
            console.error(error);
            setErrorMsg(error.message);
            setIsLoading(false);
        });
    }

    // loading / spinning wheel content
    var loadingContent = null;
    isLoading ? loadingContent = <Loading /> : loadingContent = null;

    const curStocks = stocks.map((s, index) => {
        // styling and setting forwardPE
        var peClass = '';
        var forPeVal = null;
        s.forwardPE == null ? forPeVal = '-' : forPeVal = s.forwardPE;

        s.forwardPE < 0 ? peClass = 'text-warning' : peClass = '';

        // setting dividendValue
        var dividendValue = '';
        s.dividendRate > 0 ? dividendValue = '$' + s.dividendRate : dividendValue = '-';
        return(
            <tr key={index}>
                <td className="td-larger">{s.name}</td>
                <td className="td-smaller">{s.tickerSymbol}</td>
                <td className="td-smaller">${s.price}</td>
                <td className="td-smaller">{s.analystRating}</td>
                <td className="td-smaller">{s.analystOpinion.replace('_', ' ')}</td>
                <td className="td-smaller">{dividendValue}</td>
                <td className={peClass}>{forPeVal}</td>
            </tr>
        )}
    );

    return (
        <div className="align-middle">
            <h2>{errorMsg}</h2>
            <button onClick={() => updateData()}>Update Data</button>
            {loadingContent}
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