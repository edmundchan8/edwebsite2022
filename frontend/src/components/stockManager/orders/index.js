import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import apiClient from '../../../services/api';
import Show from '../stocks/show';

function Index() {

    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [owner, setOwner] = useState('');
    

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
        return <div><p>{errorMsg}</p></div>
    }

    function handleSubmit(e){
        e.preventDefault();
        apiClient.post('/api/store', {
            tickerSymbol: tickerSymbol,
            price: price,
            quantity: quantity,
            date: date,
            owner: owner
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.error(error.response);
        });;
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
                {/* <Routes>
                    <Route path={`/show/${s.tickerSymbol}`} element={ <Show ticker={s.tickerSymbol} />} />{s.name}
                </Routes> */}
                <td><a href={`/stockManager/show/${s.tickerSymbol}`} value={s.tickerSymbol} className='remove_link_underline'>{s.name}</a></td>
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
            <h3 className={statusClass}>Portfolio Performance: {portfolioStatus}</h3>
            {/* Add an order */}
            <h3>Add Stock Order</h3>
            <form name="orderForm" onSubmit={handleSubmit}>
                <label className='label-padding'>Ticker Symbol</label>
                <input type="text" name="tickerSymbol" value={tickerSymbol} placeholder='e.g. AAPL' 
                className='input-width' onChange={e => setTickerSymbol(e.target.value)}/>
                <label className='label-padding' >Buy/Sell Price</label>
                <input type="text" name="price" value={price} className='input-width' 
                placeholder='e.g. 1.23' onChange={e => setPrice(e.target.value)} />
                <label className='label-padding'>Quantity</label>
                <input type="text" name="quantity" value={quantity} className='input-width' 
                placeholder='e.g. 5' onChange={e => setQuantity(e.target.value)} />
                <label className='label-padding'>Date</label>
                <input type="text" name="date" value={date} className='input-width' 
                placeholder='YYYY-MM-DD' onChange={e => setDate(e.target.value)} />
                <label className='label-padding'>Owner</label>
                <input type="text" name="owner" value={owner} className='input-width' 
                placeholder='e.g. Edmund' onChange={e => setOwner(e.target.value)} />
                <button>Submit</button>
            </form>
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
            <h3>Invested: ${sumInvestment.toFixed(2)}</h3>
            <h3>Portfolio Value: ${sumValue.toFixed(2)}</h3>
        </div>
    );
};
export default Index;