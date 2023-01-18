import React, {useState, useEffect} from 'react';
import apiClient from '../../services/api';

function tcgList (){

    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            apiClient.get('/api/getTcgs').then(response => {
                console.log(response.data);
                setList(response.data);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    console.log("error getting data");
                }
            });
        }
        
        fetchData()
            .catch(console.error);
    }, []);

    function deleteTcg(e){
        console.log(e);
        apiClient.delete(`/api/deleteTcg/${e}`).then(response => {
            console.log(response);
            alert("TCG Item removed");
        })
        .catch(error => {
            console.log(error.response.status);
        })
    }

    const tcgList = list.map((value, key) => {
        return (
            <tr key={key}>
                <td>{value.name}</td>
                <td>{value.buyPrice}</td>
                <td>{value.sellPrice}</td>
                <td>{value.fees}</td>
                <td></td>
                <td><button onClick={() => deleteTcg(value.id)}>Delete </button></td>
            </tr>
        )}
    );

    return (
        <table>
            <tbody>
                <tr>
                    <td>TCG Product</td>
                    <td>Buy Price</td>
                    <td>Sell Price</td>
                    <td>Fees</td>
                    <td>Profit?</td>
                </tr>
                    {tcgList}
            </tbody>
        </table>
    );
}

export default tcgList;