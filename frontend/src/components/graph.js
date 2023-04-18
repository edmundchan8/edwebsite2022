import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'

// props data that comes in should be ['key name'][0:title, 1:years array, 2:data array]
function Graph(props){
  const options = {
    responsive: true,
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
    var key = Object.keys(props)[0];
    
    var title = props[key][0];
    var time = props[key][1];
    var values = props[key][2];
    
      const labels = time;
      
      const data = {
        labels,
        datasets: [
          {
            label: title,
            data: values,
            backgroundColor: 'rgba(0, 156, 45, 0.5)',
          }
        ],
        options: {
        }
      };
    
      return <Bar options={options} data={data} />;
  }

}

export default Graph;

  
  