import React, { useState, useEffect } from 'react';
import Graph from '../../graph';
import DividendStat from './dividendStats';

function HandleDividendData(props){
    
    var output = [];
    var dateLabel = [];
    var dividendsLabel = [];
    var runningTotal = 0;

    const [filter, setFilter] = useState('Years');

    useEffect( () => {
    },);

    function handleChange(){
        if (filter === 'Years'){
            setFilter('Months');
        } else if (filter === 'Months'){
            setFilter('Current Year');
        } else if (filter === 'Current Year'){
            setFilter('Current Month');
        } else if (filter === 'Current Month'){
            setFilter('Years');
        }
        
    }

    if(props.dividendData !== null){
        output = Object.keys(props.dividendData).map(function(key) {
        
            //split date by -, then get 0th element (which is the year 2023 etc)
            var date = props.dividendData[key].date.split('-'); // each dividend array
            
            var year = date[0];
            var month = date[0] + "-" + date[1];
    
            var currentDate = new Date();
    
            var currentYear = currentDate.getFullYear();
            var currentMonth = currentDate.getMonth() + 1;
    
            var dividendDate = null;
    
            var filterDate = filter;
    
            // set dividendDate to if we choose year, month, yearS or Months
    
            if (filterDate === 'Years'){
                dividendDate = year;
            } else if (filterDate === 'Months'){
                dividendDate = month;
            } else if (filterDate === 'Current Year'){
                if (parseInt(year) === currentYear){
                    dividendDate = currentYear;
                }
            } else if (filterDate === 'Current Month'){
                currentMonth = ("0" + currentMonth).slice(-2);
                currentMonth = currentYear + "-" + currentMonth;
                if(currentMonth === month){
                    dividendDate = currentMonth;
                }
            }
    
            currentMonth = ("0" + currentMonth).slice(-2);
            if(currentYear + "-" + currentMonth === month){
                currentMonth = currentYear + "-" + currentMonth;
            }
    
    
            // set first date to dateLabel
            if (dividendDate !== null){
                if (dateLabel.length === 0){
                    dateLabel.push(dividendDate);
                }
            } 
            
            // only start adding dividends to labal if datelabel has data
            if (dateLabel.length > 0){
                // add to dateLabel arr if it isn't included already
                if (dateLabel.includes(dividendDate) === false){
                    dateLabel.push(dividendDate);
    
                    // add runningtotal value to dividendsLabel, then reset running total to 0
                    dividendsLabel.push(runningTotal);
                    runningTotal = 0;
                }
    
                if (dividendDate !== null && dateLabel.includes(dividendDate) === true ){
                    // add dividends to running total
                    runningTotal += parseFloat(props.dividendData[key].dividend);
                }
    
                // check if we reach end of object, if so, push running total to dividends label before loop closes
                if (props.dividendData.length - 1 === parseInt(key)){
                    dividendsLabel.push(runningTotal);
                    runningTotal = 0;
                }   
            }
                 
        });
    }
console.log(dividendsLabel);
    return (
        <div className="graph-styling">
            <Graph data={[filter, dateLabel, dividendsLabel]} />
            <button onClick={() => handleChange()} >Month/Year</button>
            <DividendStat data={props.dividendData} />
        </div>
    )
}

export default HandleDividendData