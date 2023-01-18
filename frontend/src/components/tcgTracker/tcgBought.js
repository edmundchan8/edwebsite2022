import React, {useState} from 'react';
import apiClient from '../../services/api';
import { useNavigate } from 'react-router-dom';

function tcgBought(){

    const navigate = useNavigate();

    const [tcgName, setTcgName] = useState('');
    const [buyPrice, setBuyPrice] = useState(0);
    const [shippingPaid, setShippingPaid] = useState(0);

    function handleSubmit(e){
        e.preventDefault();
        apiClient.post('api/storeTcg', {
            tcgName: tcgName,
            buyPrice: buyPrice,
            shippingPaid: shippingPaid,
        }).then(response => {
            new Promise((resolve, reject) => {
                if(response){
                    navigate('/tcgtracker');
                    resolve('Promise success')
                    console.error(response);

                }
                else {
                    reject('Promise failed');
                    console.error(response);
                    
                }
            });
        }).catch(error => {
            console.error(error.response);
        });
    }

    return(
        <div>
            <h4>Bought</h4>
            <form onSubmit={handleSubmit}>
                <label>TCG Product: </label>
                <input 
                    type="text" 
                    name="tcgName" 
                    value={tcgName} 
                    onChange={e => setTcgName(e.target.value)}
                />
                <br></br>
                <label>Price Paid: </label>
                <input 
                    type="text" 
                    name="buyPrice" 
                    value={buyPrice} 
                    onChange={e => setBuyPrice(e.target.value)}
                />
                <br></br>
                <label>Shipping Cost: </label>
                <input 
                    type="text" 
                    name="shippingPaid" 
                    value={shippingPaid} 
                    onChange={e => setShippingPaid(e.target.value)}    
                />
                <br></br>
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}

export default tcgBought;