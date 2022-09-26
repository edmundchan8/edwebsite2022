import {PolarArea} from "react-chartjs-2"


function Graph({chartData}){

    return (
      <div>
      <PolarArea
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Dividend Amount"
            },
            legend: {
              display: true,
              position: "bottom"
           }
          }
        }}
      />
    </div>
    );
}

export default Graph