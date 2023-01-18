import React from 'react';

function tcgSold () {
    return (
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
    );
}

export default tcgSold;