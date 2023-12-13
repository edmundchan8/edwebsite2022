import React, { useEffect, useState, useRef } from 'react';
import apiClient from '../../../services/api';


const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

function Index(){

    const [owner, setOwner] = useState('AAPL');
    const [errorMsg, setErrorMsg] = useState('');
    const [orders, setOrders] = useState([]);

    function handleChange(event){
        setOwner(event.target.value);
    } 

    useEffect( () => {

        const fetchData = async () => { 

            // get stocks
            apiClient.get(`/api/getAllBuyOrders`).then(response => {
                setOrders(response.data);
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

    }, [])

    // First, sort the data array in descending order of dates.
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Then, create a new array to hold the top 3 objects for each name.
    let result = [];

    // Use a JavaScript Map to keep track of counts.
    let counts = new Map();

    for (let i = 0; i < orders.length; i++) {
        let name = orders[i].name;
        if (!counts.has(name)) {
            counts.set(name, 1);
            result.push(orders[i]);
        } else {
            let count = counts.get(name);
            if (count < 3) {
                counts.set(name, count + 1);
                result.push(orders[i]);
            }
        }
    }

    // Now, 'result' contains the 3 objects with the highest dates for each name.
    result.sort( (a,b) => a.name.localeCompare(b.name));  

    return (
        <div>
            <h1>Order History page</h1>
            <table className="align-middle">
                <thead>
                    <tr>
                        <th className="td-name">TickerSymbol</th>
                        <th>Date</th>
                        <th>Current Price</th>
                        <th>Bought Price</th>
                        <th>Gains/Loss</th>
                    </tr>
                </thead>
                <thead>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td>{item.tickerSymbol}</td>
                            <td>{item.date}</td>
                            <td>{item.currentPrice}</td>
                            <td>${item.price}</td>
                            <td>{((item.currentPrice - item.price )/ ((parseFloat(item.currentPrice) + parseFloat(item.price)) / 2)).toFixed(2) }%</td>
                        </tr>
                    ))}
                </thead>
            </table>         
        </div>
    );
}

export default Index