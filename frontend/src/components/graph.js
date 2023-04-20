import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'

// props data that comes in should be ['key name'][0:title, 1:years array, 2:data array]
function Graph(props){

  const options = {
    responsive: true,
    scales: {
      x: {
        display: props.data[0]
      },
      y: {
        ticks: {
          font: {
              size: 6,
          }
        },
        display: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true
      },
    },
  };

  if (props !== undefined){

    //get key from props
    // var key = Object.keys(props.data[1])[0];
    
    // console.log(key);

    var title = props.data[1][0];
    var time = props.data[1][1];
    var values = props.data[1][2];
    
      const labels = time;
      
      const data = {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: 'rgba(0, 156, 45, 0.5)',
          }
        ]
      };
      
      return <Bar options={options} data={data} />;
  }

}

export default Graph;

  
  