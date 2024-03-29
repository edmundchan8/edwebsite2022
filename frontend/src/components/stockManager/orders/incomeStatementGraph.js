import React, { useEffect, useState } from 'react';
import Accordion from '../../accordion';
import apiClient from '../../../services/api';

function IncomeStatementGraph(props){

    const [data, setData] = useState([]);

    useEffect( () => {
        apiClient.get(`/api/getIncomeData/${props.tickerSymbol}`).then(response => {
            console.log(response.data[0]['incomeStatement']);
            setData(response.data[0]['incomeStatement']);
        })
        .catch( error => {
            console.error(error);
        });
    }, [])

    var graph = {};

    // when data variable is set
    if (typeof data !== 'undefined' && data.length > 0){
        console.log(data);
        // convert json to an OBJECT
        var parsedData = JSON.parse(data);
        
        var yearsArr;
        // loop from the parsedData OBJECT
        for (let x in parsedData){
            // x = key (e.g. years), parsedData[x] => value as array

            if (x === 'Years'){
                yearsArr = parsedData[x];
            }
            console.log(yearsArr);
            if (x !== 'Years' && typeof yearsArr !== 'undefined' && typeof parsedData[x] !== 'undefined'){
                // build up graph data

                graph[x] = [x, yearsArr.sort(), parsedData[x].sort()];
            }
        }
    }

    return (
        <div>
            <Accordion data={["Financial Graphs", false, graph]}/>
        </div>
    )

}

export default IncomeStatementGraph