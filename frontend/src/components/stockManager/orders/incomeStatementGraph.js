import React, { useEffect, useState } from 'react';
import apiClient from '../../../services/api';

function IncomeStatementGraph(props){

    const [data, setData] = useState([]);

    useEffect( () => {
        apiClient.get(`/api/getIncomeData/${props.tickerSymbol}`).then(response => {
            // console.log(response.data[0]['incomeStatement']);
            setData(response.data[0]['incomeStatement']);
        })
        .catch( error => {
            console.error(error);
        });
    }, [])

    if (data.length > 0 ){
        // convert json to an OBJECT
        var parsedData = JSON.parse(data);
        
        // loop from the parsedData OBJECT
        for (let x in parsedData){
            // x = key (e.g. years), parsedData[x] => value as array

            var yearsArr;
            var dataArr;
            // work with years only first
            if (x === 'Years'){
                yearsArr = parsedData[x];
            }
            else if (x === 'New-Cash-Flow') {
                dataArr = parsedData[x];

            }
        }

        // for(var i = 0; i < Object.keys(parsedData).length; i++){
        //     console.log(parsedData[i]);
        // }
        
        // parsedData.forEach(element => {
        //     console.log(element)
        // });
    }

    return (
        <div>
            <h3>Income Statement Graph Component</h3>
        </div>
    )

}

export default IncomeStatementGraph