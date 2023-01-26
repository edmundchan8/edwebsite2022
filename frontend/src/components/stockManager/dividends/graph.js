import React, {useState, useEffect} from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'

function Graph(chartData){

  var [dividendTotal, setDividendTotal] = useState([]);
  var [label, setLabel]  = useState([]);
  // chartDate affects useEffect, it can change from thisYear, thisMonth, years or months,
  var [chartDate, setChartDate] = useState('thisMonth');
  var [chartIncrementer, setChartIncrementer] = useState(3);
  var [data, setData] = useState();
  var [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    async function fetchData(){
      var curDate = 0;
      var dateIndex = 0;
      var curTotal = 0;
      var labelArr = [];
      var dividendArr = [];

      // reset grandTotal
      setGrandTotal(0);

      var date = new Date();
      var month = date.getMonth() + 1;
      // padding 0 to start of month, otherwise it returns, for the month, 2023-1 instead of 2023-01
      if (month < 10) {
        month = month.toString().padStart(2, '0');
      }
      if (month > 12){
        month = 1;
      }

      var dataDate = month + "-" + date.getFullYear();
      // everytime we click chartDate, it increments by 1.  0 = thisMonth, 1 = thisYear, 2 = allMonths, 3 = allYear, then goes back to 0
      
      if (chartIncrementer === 0){
        setChartDate('thisMonth');
        curDate = date.getFullYear() +  "-" + month;// e.g. 2023-01
      }
      if (chartIncrementer === 1){
        setChartDate('thisYear');
        dataDate = date.getFullYear();
        curDate = dataDate.toString();
      }
      if (chartIncrementer === 2){
        setChartDate('allMonths');
        dateIndex = 0;
      }
      if (chartIncrementer === 3){
        setChartDate('allYears');
        dateIndex = 1;
      }
      
      //data passed from props
      setData(chartData['chartData']);//response.data;

      var currentDataMonth = "";
      var currentDataYear = "";
      var currentArrMonth = "";
      var currentArrYear = "";
      // var currentDate = "";
      var currentYear = "";
      var dataDividend = 0;

      // returns data from dividend index page as array
      // { {date: "2021-04-19", name:apple, dividend: 123} }

      //loop through api data
      for (var i = 0; i < data.length; i++) {

        // set curDate when i = 0
        if (i === 0){
          currentArrYear = data[i].date.split('-')[0];
          currentArrMonth = data[i].date.split('-')[1];
          if (curDate == ""){
            curDate = currentArrYear + "-" + currentArrMonth;
          }
          // currentDate = currentArrYear + "-" + currentArrMonth;
          currentYear = currentArrYear;
        }

        //set dataDate to first date YYYY-MM in data (e.g. 2020-09, then 2020-10 etc -> today)
        currentDataYear = data[i].date.split('-')[0];
        currentDataMonth = data[i].date.split('-')[1];
        dataDate = currentDataYear + "-" + currentDataMonth;

        dataDividend = data[i].dividend;

        setGrandTotal(prev => prev + parseFloat(dataDividend));

        // if chartDate = thisMonth or thisYear
        if (dataDate.includes(curDate) && chartIncrementer !== 2 && chartIncrementer !== 3){
          // add dividend to curTotal

          curTotal += parseFloat(dataDividend);
        }
        

        // if chartDate = allMonths or allYear
        if (chartIncrementer === 2){
          if (dataDate.includes(curDate)){
            curTotal += parseFloat(dataDividend);
          }
          else {
            labelArr.push(curDate); //2020-11
            dividendArr.push(curTotal);

            // note, the dataDate is already the next date, as well as the data Dividends, so we need to start addign them in now
            curDate = dataDate;
            curTotal = parseFloat(dataDividend);
          }
        }

        if (chartIncrementer === 3){
          if (dataDate.includes(currentYear)){
            curTotal += parseFloat(dataDividend);
          }
          else {
            labelArr.push(currentYear); //2020-11
            dividendArr.push(curTotal);

            // note, the dataDate is already the next date, as well as the data Dividends, so we need to start addign them in now
            currentYear = dataDate.split('-')[0];
            curTotal = parseFloat(dataDividend);
          }
        }
        
        // if we reach the end of the loop
        if (i === data.length - 1){
          if (chartIncrementer === 0){
            var newMonth = new Date();
            labelArr.push(newMonth.getMonth() + 1);
          }
          else if (chartIncrementer === 1){
            var newYear = new Date();
            labelArr.push(newYear.getFullYear());
          }
          else {
            curDate = dataDate;
            labelArr.push(curDate);
          }
          dividendArr.push(curTotal);
        }

      }
      
      setDividendTotal(dividendArr);
      
      setLabel(labelArr);
    }; 
    fetchData()
    .catch(console.error);
  }, [chartIncrementer]);

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
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: dividendTotal
      }
    ]
  }

  function changeData(){
    chartIncrementer = chartIncrementer + 1;
    if (chartIncrementer > 3){
      chartIncrementer = 0;
    }
    // chartDate === 'year' ? chartDate = 'month' : chartDate = 'year';
    setChartIncrementer(chartIncrementer);
  }

  var totalDividends = 0;
  if (window.location.pathname.split("/").pop() == 'dividends' && chartIncrementer > 1){
    totalDividends = grandTotal;
  }
  else {
    totalDividends = dividendTotal.reduce((partialSum, dividend) => partialSum + parseFloat(dividend), 0).toFixed(2);
  }
  //var

  const actualTotal = dividendTotal.length;

  // we need to multiple actualTotal by 3 IF the stock is not JEPI or O

  var avgDividends = (totalDividends/actualTotal).toFixed(2);

  // avg dividends per day when viewing month
  var avgDivDay = null;
  chartDate === 'allMonths' ? avgDivDay = <div><h4>Average Dividends per Day: ${(avgDividends / 30).toFixed(3)}</h4><h4>Average Dividends per Hour: ${((avgDividends/30)/24).toFixed(2)}</h4></div> : avgDivDay = null;

  var averageDivContent = "";
  chartDate === 'thisMonth' || chartDate === 'thisYear' ? averageDivContent = "" : averageDivContent = <h5>Average Dividends per {(chartDate.replace('all','').slice(0, -1))}: ${avgDividends} {avgDivDay}</h5>;

  var dividendTitle = "";
  var titleDate = new Date();

  if (chartDate === 'thisMonth'){
   
    dividendTitle = titleDate.toLocaleString('en-US', { month: 'long', year: "numeric", });
  }
  else if (chartDate === 'thisYear'){
    dividendTitle = titleDate.toLocaleString('en-US', { year: "numeric", });
  }
  else if (chartDate === 'allMonths'){
    dividendTitle = "All Months";
  }
  else{
    dividendTitle = "All Years";
  }
  


  return (
    <div>
      <h4>{dividendTitle}</h4>
      <div >
        <Bar className="graph-styling"
          data={state}
          height="100%"
          options={{
            title:{
              display:true,
              text:'Dividends Text',
              fontSize:15,
              maintainAspectRatio : false
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
      <button onClick={() => changeData()}>Month/Year</button>
      <h5>Total Dividends: ${totalDividends}</h5>
      {averageDivContent}
    </div>
  );
}

export default Graph