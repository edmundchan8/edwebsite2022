import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import Loading from '../../loading';
import DisplayOrders from './displayOrders';

function Index() {

    const navigate = useNavigate();
    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [owner, setOwner] = useState('');
    var [isLoading, setIsLoading] = useState(false);

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
        // set spinning logo
        setIsLoading(true);
        apiClient.post('/api/store', {
            tickerSymbol: tickerSymbol,
            price: price,
            quantity: quantity,
            date: date,
            owner: owner
        }).then(response => {
            let p = new Promise((resolve, reject) => {
                if(response){
                    setIsLoading(false);
                    navigate('/stockManager/orders');
                    resolve('Promise success')
                }
                else {
                    reject('Promise failed');
                }
            });
        }).catch(error => {
            console.error(error.response);
        });;
    }

    // loading / spinning wheel content
    var loadingContent = null;
    isLoading ? loadingContent = <Loading /> : loadingContent = null;

    return (
        <div className="align-middle">
            {loadingContent}
            <h1>Stocks</h1>
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
            <DisplayOrders stocks={stocks} />
        </div>
    );
};
export default Index;