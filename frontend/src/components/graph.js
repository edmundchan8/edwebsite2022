import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'

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

  if (props['financials'] !== undefined){

      const labels = props.financials[1];
      
      const data = {
        labels,
        datasets: [
          {
            label: props.financials[0],
            data: props.financials[2],
            backgroundColor: 'rgba(0, 156, 45, 0.5)',
          },
        ],
      };
    
      return <Bar options={options} data={data} />;
  }

}

export default Graph;

  
  