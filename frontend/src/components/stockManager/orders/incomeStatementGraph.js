import React, {useEffect} from 'react';
import apiClient from '../../../services/api';

function IncomeStatementGraph(props){

    useEffect( () => {
        apiClient.get(`/api/getIncomeData/${props.tickerSymbol}`).then(response => {
            // console.log(response.data[0]['incomeStatement']);
        })
        .catch( error => {
            console.error(error);
        });
    })

    return (
        <div>
            <h3>Income Statement Graph Component</h3>
        </div>
    )

}

export default IncomeStatementGraph