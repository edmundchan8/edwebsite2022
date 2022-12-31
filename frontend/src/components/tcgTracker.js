import React from 'react'

function TcgTracker(){

    return(
        <div>
            <h1>TCG Tracker</h1>

            <table>
                <tbody>
                    <tr>
                        <td>TCG Product</td>
                        <td>Buy Price</td>
                        <td> - </td>
                        <td>Sell Price</td>
                        <td>Fees</td>
                        <td>Profit?</td>
                    </tr>
                    <tr>
                        <td>Force of Will Booster Pack</td>
                        <td>$3.99</td>
                        <td> </td>
                        <td>$5.50</td>
                        <td>$0.55</td>
                        <td>$0.98</td>
                    </tr>
                </tbody>
            </table>

            <h4>Bought</h4>
            <form>
                <label>TCG Product: </label>
                <input type="text" name="tcg-product-name" value="" />
                <br></br>
                <label>Price Paid: </label>
                <input type="text" name="buy-price" value="" />
                <br></br>
                <label>Shipping Cost: </label>
                <input type="text" name="shipping-paid" value="" />
                <br></br>
                <input type="submit" value="Save" />
            </form>
            <br></br>

           
            {/*  */}

            
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

export default TcgTracker;