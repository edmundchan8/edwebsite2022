import React, { useState, useEffect } from 'react';

function tcgSold (props) {

    const [product, setProduct] = useState();

    useEffect(() => {
        if(props.item !== undefined) {
            buildProduct();
        }
    }, [props.item]);

    function buildProduct(){
        const data = Array.from(props.item);
        
        const tempList = Object.keys(props.item).map(key => {
            if (props.item[key] !== null && key !== 'created_at' && key !== 'updated_at'){
                return (
                    <td key={props.item['id']}>{props.item[key]}</td>
                )}
            }
        );
        setProduct(tempList);
    }
    
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Buy Price</th>
                        <th>Shipping</th>
                    </tr>
                    <tr>
                        {product}
                    </tr>
                </tbody>
            </table>
            <form style={{display: 'flex', flexDirection: 'column'}} >
                <label>TCG Product: </label>
                <img src="https://upload.wikimedia.org/wikipedia/en/a/a0/Force_of_Will_card_back.jpg" width={100} />
                <label>Price Sold: </label>
                <input type="text" name="sell-price" value="" />
                <label>Shipping Cost: </label>
                <input type="text" name="shipping-cost" value="" />
                <label>Fees: </label>
                <input type="text" name="fees" value="" />
                <input type="submit" value="Save" />
            </form>
        </div>
    );
}

export default tcgSold;