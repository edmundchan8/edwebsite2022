import React, {useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import apiClient from '../../../services/api';
import Graph from './graph';

function Show() {

    // Get name from URL
    const params = useParams();

    const [dividends, setDividends] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    

    useEffect(() => {
        const fetchData = async () => { 
            apiClient.get(`/api/dividends/${params.name}`).then(response => {
                setDividends(response.data);
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
                <td><NavLink className='' to={{pathname :"edit"}} state={{d}} >Edit</NavLink></td>
            </tr>
        )}
    );

    return (
        <div>
            <Graph chartData={dividends}/>
            <h4>Dividends</h4>
            <h4>{params.name}</h4>
            <table className="align-middle">
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