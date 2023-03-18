import React, { useState, useEffect } from 'react';
import OrdersTable from './ordersTables';
import apiClient from '../../../services/api';

function DisplayOrders(){

    const [stocks, setStocks] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [owner, setOwner] = useState('Any');

    function handleChange(event){
        setOwner(event.target.value);
    } 

    useEffect( () => {
        const fetchData = async () => { 

            apiClient.get(`/api/showAll/${owner}`).then(response => {
                setStocks(response.data)
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.status === 401){
                        setErrorMsg('Please login to see your stock data');
                    }
                });
    
            if(errorMsg){
                return <div><p>{errorMsg}</p></div>
            }
        }
        fetchData()
        .catch(console.error);
    }, [owner])

    return (
        <div>
            <h5>Sort by Owner 
                <select onChange={handleChange}>
                    <option value="Any">Any</option>
                    <option value="Edmund">Edmund</option>
                    <option value="Mum">Mum</option>
                    <option value="Priscilla">Priscilla</option>
                    <option value="Yau Yau">Yau Yau</option>
                    <option value="RothIRA">RothIRA</option>
                </select>
            </h5>
            <OrdersTable stockData={stocks} />
        </div>
    )
}

export default DisplayOrders