import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/api';

function tcgSold (props) {

    const navigate = useNavigate();

    const [product, setProduct] = useState();
    const [sellPrice, setSellPrice] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [fee, setFee] = useState(0)

    useEffect(() => {
        if(props.item !== undefined) {
            buildProduct(props.item);
        }
    }, [props.item]);

    function buildProduct(product){
        // const data = Array.from(props.item);
        // console.log(product);
        const tempList = Object.keys(product).map(key => {
            if (product[key] !== null && key !== 'created_at' && key !== 'updated_at'){
                return (
                    <td key={key} className='tcg-table-td'>{product[key]}</td>
                )
            }
            else
                return '';
        });
        setProduct(tempList);
        return;
    }

    function handleSubmit(event){
        // update product
        event.preventDefault();

        var product = {
            id: props.item.id,
            sellPrice: sellPrice,
            shipping: shipping,
            fee: fee,
        }

        var newProduct = JSON.stringify(product);
        
        apiClient.get(`/api/editTcg/${newProduct}`).then(response => {
            console.log(response.status);
            // refreshes the page
            navigate(0);
        })
        .catch(error => {
            console.error(error);
            if (error.response.status === 401){
                console.log("error getting data");
            }
        });
    }

    function handleChange(event){
        var name = event.target.name;
        if (name === 'sell-price'){
            setSellPrice(event.target.value);
        }
        if (name === 'shipping-cost'){
            setShipping(event.target.value);
        }
        if (name === 'fees'){
            setFee(event.target.value);
        }
    }
    
    var itemKey = 0;
    // if statement because if props is undefined (i.e. no tcg items), it causes program to crash
    if (props.item > 0){
        itemKey = props.item.id;
    }else {
        itemKey = 0;
    }

    return (
        <div>
            <h4>Sold</h4>
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Buy Price</th>
                        <th>Shipping</th>
                    </tr>
                    <tr key={itemKey}>
                        {product}
                    </tr>
                </tbody>
            </table>
            <form className="tcg-form" onSubmit={e => handleSubmit(e)}>
                <label>TCG Product: </label>
                <label>Price Sold: </label>
                <input type="text" name="sell-price" value={sellPrice} onChange={e => handleChange(e)} />
                <label>Shipping Cost: </label>
                <input type="text" name="shipping-cost" value={shipping} onChange={e => handleChange(e)} />
                <label>Fees: </label>
                <input type="text" name="fees" value={fee} onChange={e => handleChange(e)} />
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}

export default tcgSold;