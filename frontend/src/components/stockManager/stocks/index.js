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
        apiClient.get('/api/stocks').then(response => {
            console.log(response);
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
        apiClient.post('/api/getData').then(response => {
            console.log(response);
            new Promise((resolve, reject) => {
                if (response.data){
                    setIsLoading(false);
                    setErrorMsg(response.data.message);
                    navigate('/stockManager/stocks');
                    resolve('Promise success');
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
        // stop stocks with 0 quantity (stocks I sold out of) from appearing
        if (s.quantity <= 0){
            return;
        }
        
        // styling and setting forwardPE
        var peClass = '';
        var forPeVal = null;
        s.forwardPE == null ? forPeVal = '-' : forPeVal = s.forwardPE;

        s.forwardPE < 0 ? peClass = 'text-warning' : peClass = '';

        // setting dividendValue
        var dividendValue = '';
        s.dividendRate > 0 ? dividendValue = s.dividendRate : dividendValue = '-';

        var dividendRateMonth = '';
        dividendValue !== '-' ? dividendRateMonth = '/$' + dividendValue/4 : dividendRateMonth = '';

        return(
            <tr className="align-middle" key={index}>
                <td className="">{s.name}</td>
                <td className="">{s.tickerSymbol}</td>
                <td className="">${s.price}</td>
                {/* <td className="td-smaller">{s.analystRating}</td>
                <td className="td-smaller">{s.analystOpinion.replace('_', ' ')}</td> */}
                <td className="td-smaller">${dividendValue}{dividendRateMonth}</td>
                <td className={peClass}>{forPeVal}</td>
            </tr>
        )}
    );

    return (
        <div>
            <h2>{errorMsg}</h2>
            <div className="align-middle">
                <button onClick={() => updateData()}>Update Data</button>
            </div>

            {loadingContent}
            <h2>Stocks</h2>
            <table >
                <thead>
                    <tr className="align-middle">
                        <th>Name</th>
                        <th>Ticker Symbol</th>
                        <th>Market Price</th>
                        {/* <th>Analyst Rating</th>
                        <th>Analyst Opinion</th> */}
                        <th className="td-smaller">Dividend Rate (Annual)/Monthly)</th>
                        <th>Forward PE</th>
                    </tr>
                    {curStocks}
                </thead>
            </table>
        </div>
    );
};
export default Index;