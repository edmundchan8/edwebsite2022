import React, {useEffect, useState} from 'react';
import apiClient from '../../../services/api'
import Graph from '../../graph'

function Index(){

    const [stockInfo, setStockInfo] = useState([]);

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

    // build tempArray for sorting purposes
    var tempArray = [];
    // for loop on object, stock info
    for (const stock in stockInfo){
        var name = stockInfo[stock].name;
        var curPrice = parseFloat(stockInfo[stock].price);
        var origPrice = parseFloat(stockInfo[stock].twoHundredDayAverage);
        // calculate % diff (cur - orig)/ ((orig+cur)/2) * 100
        tempArray.push({'key': 'Dip Finder', 'name': name, 'dip': (curPrice - origPrice)/((origPrice + curPrice)/2)*100})
    }

    // sort tempArray with compareDip functon
    tempArray.sort(compareDip);

    // compares 0th element with 1st element, if 1 change position, else -1 or 0, leave values where they are
    // once gone through, go to 1st element and compare, repeat
    function compareDip(a, b) {
        const dip1 = a.dip;
        const dip2 = b.dip;
    
        let comparison = 0;
    
        if (dip1 > dip2) {
            comparison = 1;
        } else if (dip1 < dip2) {
            comparison = -1;
        }
        return comparison;
    }

    // finally, build separate arrays for stock name (stockArray) and the dipArray
    var stockArray = [];
    var dipArray = [];
    for(const key in tempArray){
        stockArray.push(tempArray[key].name);
        dipArray.push(tempArray[key].dip);        
    }

    // build array to send to graph component in form of [True/False, [Graph Title, X-axis data, Y-axis data]]
    var graphArray = [];
    graphArray = [true, ['Dip Finder', stockArray, dipArray]];

    return(
        <div>
            <h1>Dip Finder</h1>
            <Graph data={graphArray} />
        </div>
    )
}

export default Index;