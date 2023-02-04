import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

function StockTable (props) {

    var totalInvest = 0;
    var totalQuant = 0;
    var data = null;

    const [totalInvested, setTotalInvested] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentData, setCurrentData] = useState(null);

    useEffect( () => {
        data = props.stockData.map((s, index) => {
            if (index === 0){
                setCurrentPrice(props.stockData[0].currentPrice);
            }
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
                    <td>{s.name}</td>
                    <td><NavLink className='' to={{pathname :"edit"}} state={{s}} >Edit</NavLink></td>
                </tr>
            );
        });

        setTotalInvested(totalInvest.toFixed(2));
        setTotalQuantity(totalQuant);
        setCurrentData(data);
    }, [props]);

    return(
        <div>
            <h5>Current Share Price ${currentPrice} | Break Price ${(totalInvested / totalQuantity).toFixed(2)}</h5>
            <h5>Total Invested: ${totalInvested} | Current Value ${(totalQuantity * currentPrice).toFixed(2)}</h5>
            <h5>Total Shares {totalQuantity} | Difference ${((totalQuantity * currentPrice) - totalInvested).toFixed(2)}</h5>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Buy/Sell Price</th>
                        <th>Total Spent</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <thead>
                    {currentData}
                </thead>
            </table>
        </div>
    );
}

export default StockTable