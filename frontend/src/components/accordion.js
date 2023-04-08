import React from 'react';
import Graph from './graph';

function Accordion(props){

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
            panel.style.display = "none";
            } else {
            panel.style.display = "block";
            }
        });
    }

    return(
        <div>
            <button class="accordion">Financial Graphs</button>
            <div class="panel">
            
            {/* Loop through graph data and create graph component for each */}
            {Object.keys(props.data).map((key) => (
                <div class="financial-graph-styling">
                    <Graph financials={props.data[key]} />
                </div>     
            ))}

            </div>
        </div>
    )

}

export default Accordion