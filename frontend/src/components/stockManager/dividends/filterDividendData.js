import React from 'react';

function FilterDividendData(props){
    
        let totalDividends = 0;
        const sumDividends = props.dividends.reduce( (total, d) => total + parseFloat(d.dividend), parseFloat(totalDividends));


    console.log(sumDividends);

    // return(
    //     <h5>Total Dividends from Filter component: ${totalDividends}</h5>
    // )
}

export default FilterDividendData