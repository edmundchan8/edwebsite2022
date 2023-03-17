import React, {useState, useEffect} from 'react';

function LowestOrder(props){

    const [lowPrice, setLowPrice] = useState(null);
    const [recentPrice, setRecentPrice] = useState(null);

    useEffect( () => {

        // when component re-renders, we need to reset the temp values so that we can 
        // set new state values
        let tempLowPrice = null;
        let tempRecentPrice = null;

        // grab the length of props data minus 1, which will grab the very last price from props
        let length = props.stockData.length - 1;

        Object.keys(props.stockData).forEach((key, index) => {
            if ((tempLowPrice === null || tempLowPrice > props.stockData[key].price) && props.stockData[key].price > 1){
                tempLowPrice = props.stockData[key].price;
            }
    
            if (index === length){
                tempRecentPrice = props.stockData[length].price;
            }
        });
        
        setLowPrice(tempLowPrice);
        setRecentPrice(tempRecentPrice);
    }, [props]);
    
    return (
        <div>
            <p>Lowest buy price: ${lowPrice} | Last buy price: ${recentPrice} </p>
        </div>
    );
}

export default LowestOrder;