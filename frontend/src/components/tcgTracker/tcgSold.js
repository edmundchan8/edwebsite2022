import React, { useState, useEffect } from 'react';

function tcgSold (props) {

    const [product, setProduct] = useState();

    useEffect(() => {
        if(props.item !== undefined) {
            buildProduct(props.item);
        }
    }, [props.item]);

    function buildProduct(product){
        // const data = Array.from(props.item);
        
        const tempList = Object.keys(product).map(key => {
            if (product[key] !== null && key !== 'created_at' && key !== 'updated_at'){
                return (
                    <td key={product['id']}>{product[key]}</td>
                )}
            }
        );
        setProduct(tempList);
        return;
    }

    function handleSubmit(){
        buildProduct(props.item);
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
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={() => handleSubmit}>
                <label>TCG Product: </label>
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