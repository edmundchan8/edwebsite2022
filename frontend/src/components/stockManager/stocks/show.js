import React, {useState, useEffect} from 'react';
import apiClient from '../../../services/api';

function Show(props) {

    const [stock, setStock] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        apiClient.get(`/api/stocks/${props.tickerSymbol}`).then(response => {
            setStock(response.data)
            console.log(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see your stock data');
                }
            });
        }, []);

    if(errorMsg){
        return (
            <div>
                <p>{errorMsg}</p>
            </div>
        )
    }

    return (
        <div className="align-middle">
            <h2>This should show 1 single show</h2>
        </div>
    );
};
export default Show;