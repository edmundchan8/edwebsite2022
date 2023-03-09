import React, { useEffect, useState } from 'react';
import IncomeStatementGraph from './incomeStatementGraph';
import apiClient from '../../../services/api';

function Data(props) {

    // const [incomeData, setIncomeData] = useState([]); 

    useEffect( () => {

    }, []);

    function updateStockIncome(){
        apiClient.post(`/api/updateIncomeData/${props.tickerSymbol}`).then(response => {
            console.log(response);
        }).
        catch( error => {
            console.error(error);
        });
    }    

    return (
        <div>
            <button onClick={() => updateStockIncome()}>Update Quarterly Report</button>
            <IncomeStatementGraph tickerSymbol={props.tickerSymbol} />
        </div>
    );
}

export default Data;