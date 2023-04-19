import React from 'react';

function DividendStat(props){

    var totalDividends = 0;
    var numYears = 0;
    if (props.data.length > 0){

        var firstYear = 0;
        var lastYear = 0;

        props.data.forEach((dividend, i) => {
            if (i === 0){
                firstYear = dividend['date'].split('-')[0];
            }
            if (i === props.data.length - 1){
                lastYear = dividend['date'].split('-')[0];
            }

            totalDividends += parseFloat(dividend['dividend']);
        });

        // use year from first index and last index to calculate how many years of dividends we have (remember to plus 1)
        numYears = lastYear - firstYear + 1;
    }

    var perYear = totalDividends / numYears;
    var perMonth = perYear / 12;
    var perDay = perYear / 365;

    return(
        <table>
            <tbody className="dividendStat">
                <tr>
                    <th>Total Dividends</th>
                    <th>Dividends per Year</th>
                    <th>Dividends per Month</th>
                    <th>Dividends per Day</th>
                </tr>
                <tr>
                    <td>{totalDividends.toFixed(2)}</td>
                    <td>{perYear.toFixed(2)}</td>
                    <td>{perMonth.toFixed(2)}</td>
                    <td>{perDay.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default DividendStat