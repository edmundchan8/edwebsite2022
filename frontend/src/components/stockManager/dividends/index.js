import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';
// import Graph from './graph';

function Index() {

    const [dividends, setDividends] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [dividend, setDividend] = useState('');
    const [date, setDate] = useState('');
    // const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        // const fetchData = async () => {
        //     apiClient.get('/api/showAllDividends').then(response => {
        //         setChartData({
        //             labels: response.data.map((dividend) => dividend.totalDividends),
        //             datasets: [
        //             {
        //                 label: "Dividend Amount",
        //                 data: response.data.map((dividend) => dividend.date),
        //                 backgroundColor: [
        //                 "#ffbb11",
        //                 "#ecf0f1",
        //                 "#50AF95",
        //                 "#f3ba2f",
        //                 "#2a71d0"
        //                 ]
        //             }]
        //         });
        //         console.log(response.data);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //             if (error.response.status === 401){
        //                 setErrorMsg('Please login to see your dividend data');
        //             }
        //         });
        // }
        apiClient.get('/api/showAllDividends').then(response => {
            setDividends(response.data)
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your dividend data');
                }
            });
        // fetchData()
        }, 
    []);
    

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    function handleSubmit(e){
        e.preventDefault();
        apiClient.post('/api/storeDividend', {
            tickerSymbol: tickerSymbol,
            dividend: dividend,
            date: date
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error.response);
        });
    }

    const curDividends = dividends.map((d, index) => {
                
        return (
            <tr key={index}>
                <td className='dividend-width'>{d.name}</td>
                <td className='dividend-width'>{d.totalDividends}</td>
            </tr>
        )}
    );

    return (
        <div className="align-middle">
            {/* <Graph setChartData={chartData} /> */}
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
        </div>
    );
};
export default Index;