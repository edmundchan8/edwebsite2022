import React, { useEffect, useState } from 'react'
import apiClient from '../../services/api';
import Admin from './index'

function AdminStocks(){

    const [stockInfo, setStockInfo] = useState([]);
    const [name, setName] = useState('');
    const [ticker, setTicker] = useState('');

    useEffect(() => {
        apiClient.get('/api/stocks').then(response => {
            console.log(response);
            setStockInfo(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    console.log('Please login to see your stock data');
                }
            });
    }, []);

    function handleAddStock(event){
        var stock = {name: name, tickersymbol: ticker, price: 0.00, 
        twoHundredDayAverage: 0.00, forwardPE: 0, dividendRate: 0, incomeStatement: {}};

        // stock = JSON.stringify(stock);
        event.preventDefault();
        apiClient.post('/api/addStockToDatabase/', stock).then(response => {
            console.log(response);
            console.log('success');
        })
        .catch(error => {
            console.log(error);
            console.log("error here");
        })
    }

    function handleDeleteStock(event){

        apiClient.post('/api/deleteStockDatabase/', {id: event.target.id}).then(response => {
            console.log(response);
            console.log('success');
        })
        .catch(error => {
            console.log(error);
            console.log("error here");
        })
    }

    function handleChange(e){
        if (e.target.name == 'add-stock'){
            setName((...prev) => e.target.value);
        }
        if (e.target.name == 'add-ticker'){
            setTicker((...prev) => e.target.value);
        }
    }

    return (
        <div>
            <h1>All Stocks</h1>
            <form>
                <label>Stock Name</label>
                <input 
                    type="text" 
                    name="add-stock" 
                    value={name}
                    onChange={e => handleChange(e)}
                />
                <br></br>
                <label>Stock Ticker</label>
                <input 
                    type="text" 
                    name="add-ticker" 
                    value={ticker}
                    onChange={e => handleChange(e)}
                />
                <input 
                    type="submit" 
                    name="Add Stock"
                    onClick={(event) => handleAddStock(event)}
                    />
            </form>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Edit/Delete</th>
                    </tr>
                    {
                        stockInfo.map(stock => (
                            <tr key={stock.id}>
                                <td>{stock.name}</td>
                                <td><button onClick={(e) => handleDeleteStock(e)} id={stock.id} name={stock.name}>Delete</button></td>
                            </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminStocks