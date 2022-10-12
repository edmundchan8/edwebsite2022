import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import Graph from './graph';
import Loading from '../../loading';

function Index() {

    const navigate = useNavigate();

    const [dividends, setDividends] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [dividend, setDividend] = useState('');
    const [date, setDate] = useState('');
    const [chartData, setchartData] = useState([]);
    var [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        apiClient.get('/api/showAllDividends').then(response => {
            setDividends(response.data);
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your dividend data');
                }
            });
        apiClient.get('/api/dividendChartData').then(response => {
            setchartData(response.data);
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your dividend data');
                }
            });
        }, []);

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    function handleSubmit(e){
        e.preventDefault();
         // set spinning logo
         setIsLoading(true);
        apiClient.post('/api/storeDividend', {
            tickerSymbol: tickerSymbol,
            dividend: dividend,
            date: date
        }).then(response => {
            let p = new Promise((resolve, reject) => {
                if(response){
                    setIsLoading(false);
                    navigate('/stockManager/dividends');
                    resolve('Promise success')
                }
                else {
                    reject('Promise failed');
                }
            });
            
        }).catch(error => {
            console.error(error.response);
        });
    }

    const curDividends = dividends.map((d, index) => {      
        return (
            <tr key={index}>
                <NavLink className='nav-links remove-link-underline' to={`/stockManager/dividends/${d.name}`} >{d.name}</NavLink>
                <td className='dividend-width'>{d.totalDividends}</td>
            </tr>
        )}
    );

    // loading / spinning wheel content
    var loadingContent = null;
    isLoading ? loadingContent = <Loading /> : loadingContent = null;

    return (
        <div className="align-middle">
            <Graph chartData={chartData}/>
            {loadingContent}
            <h1>Dividends</h1>
            <h3>Add Dividend</h3>
            <form name="orderForm" onSubmit={handleSubmit}>
                <label className='label-padding'>Ticker Symbol</label>
                <input type="text" name="tickerSymbol" value={tickerSymbol} placeholder='e.g. AAPL' 
                className='input-width' onChange={e => setTickerSymbol(e.target.value)}/>
                <label className='label-padding'>Dividend</label>
                <input type="text" name="dividend" value={dividend} className='input-width' 
                placeholder='e.g. 5' onChange={e => setDividend(e.target.value)} />
                <label className='label-padding'>Date</label>
                <input type="text" name="date" value={date} className='input-width' 
                placeholder='YYYY-MM-DD' onChange={e => setDate(e.target.value)} />
                <button>Submit</button>
            </form>
            
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total Dividend Received</th>
                    </tr>
                        {curDividends}
                </thead>
            </table>
            <br></br>
        </div>
    );
};
export default Index;