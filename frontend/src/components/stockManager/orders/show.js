import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import apiClient from '../../../services/api';

function Show() {

    // Get tickerSymbol from URL
    const params = useParams();
    
    const [stock, setStock] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => { 
            apiClient.get(`/api/orders/${params.tickerSymbol}`).then(response => {
                setStock(response.data)
                console.log(response.data);
                setName(response.data[0].name);
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
        }, []);

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    const curStock = stock.map((s, index) => {
        var price = 0;
        s.price === 0 ? price = 'Stock Split' : price = '$' + parseFloat(s.price).toFixed(3);
        
        var totalInvested = 0;
        s.price === 0 ? totalInvested = '-' : totalInvested = '$' + (parseFloat(s.quantity) * parseFloat(s.price)).toFixed(3);
        return (
            <tr key={index}>
                <td>{s.date}</td>
                <td>{parseFloat(s.quantity).toFixed(3)}</td>
                <td>{price}</td>
                <td>{totalInvested}</td>
                <td>{s.owner}</td>
            </tr>
        )});

    return (
        <div className="align-middle">
            <h2>{name}</h2>
             <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Buy/Sell Price</th>
                        <td>Total Spent</td>
                        <td>Owner</td>
                    </tr>
                    {curStock}
                </thead>
            </table>
        </div>
    );
};
export default Show;