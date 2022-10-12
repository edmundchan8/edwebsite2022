import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import apiClient from '../../../services/api';

function Show() {

    // Get tickerSymbol from URL
    const params = useParams();
    
    const [stock, setStock] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('Any');
    const [data, setData] = useState(); 
    const [totalInvested, setTotalInvested] = useState();
    const [currentPrice, setCurrentPrice] = useState();
    const [totalQuantity, setTotalQuantity] = useState();

    useEffect(() => {
        const fetchData = async () => { 
            apiClient.get(`/api/orders/${params.tickerSymbol}`).then(response => {
                console.log(response.data);
                setStock(response.data)
                setName(response.data[0].name);
                setCurrentPrice(response.data[0].currentPrice);
                var totalInvest = 0;
                var totalQuant = 0;
                var currentData = stock.map((s, index) => {
                    if (owner === 'Any' || owner === s.owner){
                        var price = 0;
                        s.price === 0 ? price = 'Stock Split' : price = '$' + parseFloat(s.price).toFixed(3);
                        
                        var totalInvested = 0;
                        s.price === 0 ? totalInvested = '-' : totalInvested = '$' + (parseFloat(s.quantity) * parseFloat(s.price)).toFixed(3);
                        totalInvest += parseFloat(s.quantity) * parseFloat(s.price);

                        totalQuant += parseFloat(s.quantity);

                        return (
                            <tr key={index}>
                                <td>{s.date}</td>
                                <td>{parseFloat(s.quantity).toFixed(3)}</td>
                                <td>{price}</td>
                                <td>{totalInvested}</td>
                                <td>{s.owner}</td>
                            </tr>
                        )
                    }
                    else{
                        return;
                    }
                });

                setTotalInvested(totalInvest.toFixed(2));
                setData(currentData);
                setTotalQuantity(totalQuant);

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
            <h1>{name}</h1>
            <h4>Current Share Price ${currentPrice} | Total Shares {totalQuantity}</h4>
            <h4>Total Invested: ${totalInvested} | Current Value ${(totalQuantity * currentPrice).toFixed(3)} | Difference ${((totalQuantity * currentPrice) - totalInvested).toFixed(3)}</h4>
            <select value={owner} onChange={changeOwner}>
            <option value='Any'>Any</option>
                <option value='Edmund'>Edmund</option>
                <option value='Yau Yau'>Yau Yau</option>
                <option value='Mum'>Mum</option>
                <option value='Priscilla'>Priscilla</option>
            </select>
             <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Buy/Sell Price</th>
                        <td>Total Spent</td>
                        <td>Owner</td>
                    </tr>
                    {data}
                </thead>
            </table>
        </div>
    );
};
export default Show;