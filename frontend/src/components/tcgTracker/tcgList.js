import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TcgSold from './tcgSold';
import TcgBought from './tcgBought';
import apiClient from '../../services/api';

function tcgList (){

    const navigate = useNavigate();

    const [list, setList] = useState([]);
    const [currentTcg, setCurrentTcg] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            apiClient.get('/api/getTcgs').then(response => {
                setList(response.data);
                setCurrentTcg(response.data[0]);
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
            // refreshes the page
            navigate(0);
        })
        .catch(error => {
            console.log(error.response.status);
        })
    }

    function updateListItem(e){
        setCurrentTcg(list[e]);
    }

    const tcgList = list.map((value, key) => {
        return (
            <tr key={key}>
                <td onClick={() => updateListItem(key)} >{value.name}</td>
                <td>{value.buyPrice}</td>
                <td>{value.sellPrice}</td>
                <td>{value.fees}</td>
                <td></td>
                <td><button onClick={() => deleteTcg(value.id)}>Delete </button></td>
            </tr>
        )}
    );

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>TCG Product</th>
                        <th>Buy Price</th>
                        <th>Sell Price</th>
                        <th>Fees</th>
                        <th>Profit?</th>
                    </tr>
                        {tcgList}
                </tbody>
            </table>
            
            <TcgBought />
            <TcgSold item={currentTcg} />
        </div>
    );
}

export default tcgList;