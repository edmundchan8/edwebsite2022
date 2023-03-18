import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import LowestOrder from './lowestOrder';
import StockTable from './stockTable';
import apiClient from '../../../services/api';

function Show() {

    // Get tickerSymbol from URL
    const params = useParams();
    
    const [stock, setStock] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [owner, setOwner] = useState('');

    useEffect(() => {
        const fetchData = async () => { 
            apiClient.get(`/api/orders/${params.tickerSymbol}`).then(response => {
                
                // filter the stock data based on whether we have a specific owner or not
                // If we have an owner, then we filter the stock data to only return those
                // that match the owner, then set that to our stock data
                let tempResponseData = null;

                if (owner !== ''){
                    tempResponseData = response.data.filter(s => {
                        return s.name === owner;
                    })
                    setStock(tempResponseData);
                } else {
                    setStock(response.data)
                }

                if (owner === 'Any'){
                    setStock(response.data)
                }

                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401){
                        setErrorMsg('Please login to see your stock data');
                    }
                });
            }
            
            fetchData()
            .catch(console.error);
        }, [owner]);

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    function changeOwner(event){
        setOwner(event.target.value);
    }

    return (
        <div className="align-middle">
            <LowestOrder stockData={stock} />
            <h1>{owner}</h1>
            <select value={owner} onChange={changeOwner}>
            <option value='Any'>Any</option>
                <option value='Edmund'>Edmund</option>
                <option value='Yau Yau'>Yau Yau</option>
                <option value='Mum'>Mum</option>
                <option value='Priscilla'>Priscilla</option>
                <option value="RothIRA">RothIRA</option>
            </select>
            <StockTable stockData={stock}/>
        </div>
    );
};
export default Show;