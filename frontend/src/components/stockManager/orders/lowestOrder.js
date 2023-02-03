import React, {useState} from 'react';

function LowestOrder(props){

    const [lowPrice, setLowPrice] = useState(null);
    const [recentPrice, setRecentPrice] = useState(null);
    
    const length = props.stockData.length;
    Object.keys(props.stockData).map((key, index) => {
        if (lowPrice === null || lowPrice > props.stockData[key].price && props.stockData[key].price > 1){
            setLowPrice(props.stockData[key].price);
        }

        if (recentPrice === null){
            if (props.stockData[key].quantity > 0){
                setRecentPrice(props.stockData[key].price);
            }
        }
    });

    return (
        <div>
            <p>The lowest buy price for this stock is: ${lowPrice} </p>
            <p>Last buy price for this stock is: ${recentPrice} </p>
        </div>
    );
}

export default LowestOrder;