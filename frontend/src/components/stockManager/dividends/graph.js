import React, {useState, useEffect} from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'
import apiClient from '../../../services/api';
import Loading from '../../loading';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

function Graph(chartData){
  
  var [dividendTotal, setDividendTotal] = useState([]);
  var [label, setLabel]  = useState([]);
  var [chartDate, setChartDate] = useState('year');
  var [numMonths, setNumMonths] = useState();

  useEffect(() => {
    const fetchData = async () => {
        var curDate = 0;
        var dateIndex = 0;
        var curTotal = 0;
        var labelArr = [];
        var dividendArr = [];

        chartDate === 'year' ? dateIndex = 0 : dateIndex = 1;

        //data passed from props
        var data = chartData['chartData'];//response.data;
        
        //loop through api data
        for (var i = 0; i < data.length; i++) {
          var dataDate = data[i].date.split('-')[dateIndex];
          // if dateIndex == 'month', add the year to the dataDate too using dateIndex = 0
          chartDate === 'month' ? dataDate += "-" + data[i].date.split('-')[0]: dataDate = dataDate;
          var dataDividend = data[i].dividend;
          // if curDate is 0 / is not set, set it and reset total to 0
          if (curDate === 0) {
            curDate = dataDate;
            curTotal = 0;
          }
          // if current year is not the next year date, then we push data to array
          if (curDate === dataDate) {
            // increment the total again
            curTotal += parseFloat(dataDividend);
          } else {
            labelArr.push(curDate);
            dividendArr.push(curTotal);
            // then set current year to new year, and reset total to 0 again
            curDate = dataDate;
            curTotal = parseFloat(dataDividend);
          }

          // if we reach the end of the loop
          if (i === data.length - 1){
            labelArr.push(curDate);
            dividendArr.push(curTotal);
          }
        }
        setDividendTotal(dividendArr);
        setLabel(labelArr);
      }; 
      fetchData()
      .catch(console.error);
    }, [chartDate]);

    const state = {
      labels: label,
      datasets: [
        {
          label: 'Dividends',
          borderColor: 'rgba(143, 29, 224, 1)',
          type: 'line',
          lineTension: .2,
          data: dividendTotal
        },
        {
          label: 'Dividends',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: dividendTotal
        }
      ]
    }

    function changeData(){
      chartDate === 'year' ? chartDate = 'month' : chartDate = 'year';
      setChartDate(chartDate);
    }

    var totalDividends = dividendTotal.reduce((partialSum, dividend) => partialSum + parseFloat(dividend), 0).toFixed(2);
    var avgDividends = (totalDividends/dividendTotal.length).toFixed(2);

    return (
      <div>
        <h3>Total Dividends: ${totalDividends} | 
        Average Dividends per {chartDate}: ${avgDividends}</h3>
        <Bar
          data={state}
          height="50px"
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
        <button onClick={() => changeData()}>Month/Year</button>
      </div>
    );
}

export default Graph