import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Chart } from 'react-chartjs-2'

function Graph(props){
console.log(props.state.datasets[0].label);
    var labelA = props.state.datasets[0].label;
    var labelB = props.state.datasets[1].label;
    var dataA;
    var dataB;
    var stateA;
    
console.log(labelA);
    const state = {
        labels: labelA,
        datasets: [
            {
            label: labelB,
            borderColor: 'rgba(143, 29, 224, 1)',
            type: 'line',
            lineTension: .2,
            data: dataA
            },
            {
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: dataB
            }
        ]
    }

    return (
        <Bar 
          data={stateA}
          options={{
            title:{
              display:true,
              text:props.text,
              fontSize:15,
              maintainAspectRatio : false
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    )
}

export default Graph;