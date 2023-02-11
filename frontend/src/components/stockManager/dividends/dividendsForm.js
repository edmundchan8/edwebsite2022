import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/api';
import Loading from '../../loading';

function DividendsForm(){

    const navigate = useNavigate();

    var [isLoading, setIsLoading] = useState(false);
    const [tickerSymbol, setTickerSymbol] = useState('');
    const [dividend, setDividend] = useState('');
    const [date, setDate] = useState('');

    function handleSubmit(e){

        e.preventDefault();
         // set spinning logo
         setIsLoading(true);
        apiClient.post('/api/storeDividend', {
            tickerSymbol: tickerSymbol,
            dividend: dividend,
            date: date
        }).then(response => {
            new Promise((resolve, reject) => {
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

    // loading / spinning wheel content
    var loadingContent = null;
    isLoading ? loadingContent = <Loading /> : loadingContent = null;

    return(
        <div>
            {loadingContent}
            <h3>Dividends</h3>
            <h4>Add Dividend</h4>
            <form name="orderForm" onSubmit={handleSubmit}>
                <label className='label-padding'>Ticker Symbol</label>
                <input type="text" name="tickerSymbol" value={tickerSymbol} placeholder='e.g. AAPL' 
                className='order-input' onChange={e => setTickerSymbol(e.target.value)}/>
                <br></br>
                <label className='label-padding'>Dividend</label>
                <input type="text" name="dividend" value={dividend} className='order-input' 
                placeholder='e.g. 5' onChange={e => setDividend(e.target.value)} />
                <br></br>
                <label className='label-padding'>Date</label>
                <input type="text" name="date" value={date} className='order-input' 
                placeholder='YYYY-MM-DD' onChange={e => setDate(e.target.value)} />
                <div className="submit-align-right">
                    <button className="submit-styling">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default DividendsForm;