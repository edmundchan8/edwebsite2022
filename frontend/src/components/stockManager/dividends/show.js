import React, {useState, useEffect } from 'react';
import apiClient from '../../../services/api';
import { useParams } from "react-router-dom";
import Graph from './graph';

function Show() {

    // Get ID from URL
    const params = useParams();

    const [dividends, setDividends] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    

    useEffect(() => {
        const fetchData = async () => { 
            apiClient.get(`/api/dividends/${params.name}`).then(response => {
                setDividends(response.data)
                })
                .catch(error => {
                    if (error.response.status === 401){
                        setErrorMsg('Please login to see your dividend data');
                    }
                });
            }; 
            fetchData()
            .catch(console.error);
        }, []);

    if(errorMsg){
        return <div><p>{errorMsg}</p></div>
    }

    const curDividends = dividends.map((d, index) => {      
        return (
            <tr key={index}>
                <td className='dividend-width'>{d.date}</td>
                <td className='dividend-width'>${d.dividend}</td>
            </tr>
        )}
    );

    return (
        <div className="align-middle">
            <Graph chartData={dividends}/>
            <h1>Dividends</h1>
            <h2>{params.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Dividends Received</th>
                    </tr>
                        {curDividends}
                </thead>
            </table>
        </div>
    );
};
export default Show;