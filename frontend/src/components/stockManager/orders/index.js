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
        apiClient.post('api/store', {
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
        <div >
            {loadingContent}
            <h1>Stocks</h1>
            {/* Add an order */}
            <h3>Add Stock Order</h3>
            <form name="orderForm" onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column'}}>
                <label className='label-padding'>Ticker Symbol: 
                <input type="text" name="tickerSymbol" value={tickerSymbol} placeholder='e.g. AAPL' 
                className='order-input' onChange={e => setTickerSymbol(e.target.value)}/></label>
                <label className='label-padding' >Buy/Sell Price: 
                <input type="text" name="price" value={price} className='order-input' 
                placeholder='e.g. 1.23' onChange={e => setPrice(e.target.value)} /></label>
                <label className='label-padding'>Quantity: 
                <input type="text" name="quantity" value={quantity} className='order-input' 
                placeholder='e.g. 5' onChange={e => setQuantity(e.target.value)} /></label>
                <label className='label-padding'>Date: 
                <input type="text" name="date" value={date} className='order-input' 
                placeholder='YYYY-MM-DD' onChange={e => setDate(e.target.value)} /></label>
                <label className='label-padding'>Owner: 
                <input type="text" name="owner" value={owner} className='order-input' 
                placeholder='e.g. Edmund' onChange={e => setOwner(e.target.value)} /></label>
                <div className="submit-align-right">
                    <button className="submit-styling">Submit</button>
                </div>
            </form>
            <DisplayOrders />
        </div>
    );
};
export default Index;