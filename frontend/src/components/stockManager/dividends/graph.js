import React, {useState, useEffect} from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'
import apiClient from '../../../services/api';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Graph(){
  
  var [dividendTotal, setDividendTotal] = useState([]);
  var [label, setLabel]  = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      apiClient.get('/api/dividendChartData').then(response => {
        var curYear = 0;
        var curTotal = 0;
        var yearArr = [];
        var dividendArr = [];

        //data from api
        var data = response.data;
        //loop through api data
        for (var i = 0; i < data.length; i++) {
          
          var dataYear = data[i].date.split('-')[0];
          var dataDividend = data[i].dividend;
          // if curYear is 0 / is not set, set it and reset total to 0
          if (curYear === 0) {
            curYear = dataYear;
            curTotal = 0;
          }
          // if current year is not the next year date, then we push data to array
          if (curYear === dataYear) {
            // increment the total again
            curTotal += parseFloat(dataDividend);
            console.log(curYear + " - " + dataDividend);
          } else {
            yearArr.push(curYear);
            dividendArr.push(curTotal);
            // then set current year to new year, and reset total to 0 again
            curYear = dataYear;
            curTotal = parseFloat(dataDividend);
          }

          // if we reach the end of the loop
          if (i === data.length - 1){
            yearArr.push(curYear);
            dividendArr.push(curTotal);
          }
        }

        setDividendTotal(dividendArr);
        setLabel(yearArr);
      })
    };
      fetchData()
      .catch(console.error);
    }, []);

  const state = {
    labels: label,
    datasets: [
      {
        label: 'Dividends',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dividendTotal
      }
    ]
  }

  return (
    <div>
      <Bar
        data={state}
        options={{
          title:{
            display:true,
            text:'Dividends Text',
            fontSize:20
          },
          legend:{
            display:true,
            position:'right'
          }
        }}
      />
    </div>
  );

}

export default Graph