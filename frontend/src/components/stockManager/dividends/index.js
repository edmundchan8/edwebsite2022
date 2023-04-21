import React, { useState, useEffect } from 'react';
import apiClient from '../../../services/api';
import DividendGraph from './dividendGraph';
import DividendsTable from './dividendsTable';
import DividendsForm from './dividendsForm';
import HandleDividendData from './handleDividendData';

function Index() {

    // const navigate = useNavigate();

    const [heldDividends, setHeldDividends] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const [chartData, setchartData] = useState([]);
    
    useEffect(() => {
        apiClient.get('/api/dividendChartData').then(response => {
            setchartData(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your dividend data');
                }
            });
        
        apiClient.get('/api/showCurrentDividendsSummed').then(response => {
            setHeldDividends(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your dividend data');
                }
            });
        }, []);

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    return (
        <div>
            <HandleDividendData dividendData={chartData} />
            <DividendsForm />
            <DividendsTable dividends={heldDividends} />
            <br></br>
        </div>
    );
};
export default Index;