import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import Loading from '../../loading';
import DisplayOrders from './displayOrders';

function Index() {

    const navigate = useNavigate();

    const [tickerSymbol, setTickerSymbol] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [owner, setOwner] = useState('');
    var [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        // set spinning logo
        setIsLoading(true);
        apiClient.post('/store', {
            tickerSymbol: tickerSymbol,
            price: price,
            quantity: quantity,
            date: date,
            owner: owner
        }).then(response => {
            new Promise((resolve, reject) => {
                if(response){
                    setIsLoading(false);
                    navigate('/stockManager/orders');
                    resolve('Promise success')
                    console.error(response);

                }
                else {
                    reject('Promise failed');
                    console.error(response);
                    
                }
            });
        }).catch(error => {
            console.error(error.response);
        });
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
                className='input-styling' onChange={e => setTickerSymbol(e.target.value)}/>
                <label className='label-padding' >Buy/Sell Price</label>
                <input type="text" name="price" value={price} className='input-styling' 
                placeholder='e.g. 1.23' onChange={e => setPrice(e.target.value)} />
                <label className='label-padding'>Quantity</label>
                <input type="text" name="quantity" value={quantity} className='input-styling' 
                placeholder='e.g. 5' onChange={e => setQuantity(e.target.value)} />
                <label className='label-padding'>Date</label>
                <input type="text" name="date" value={date} className='input-styling' 
                placeholder='YYYY-MM-DD' onChange={e => setDate(e.target.value)} />
                <label className='label-padding'>Owner</label>
                <input type="text" name="owner" value={owner} className='input-styling' 
                placeholder='e.g. Edmund' onChange={e => setOwner(e.target.value)} />
                <button>Submit</button>
            </form>
            <DisplayOrders />
        </div>
    );
};
export default Index;