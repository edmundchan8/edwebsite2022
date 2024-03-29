import React from 'react';
import Graph from './graph';

function Accordion(props){

    var accordionTitle = props.data[0];
    var displayAxis = props.data[1];

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
            <button className="accordion">{accordionTitle}</button>
            <div className="panel">
                <div className="parent-graph-styling">
                    {/* Loop through graph data and create graph component for each */}
                    {Object.keys(props.data[2]).map((key, i) => (
                        <div key={i} className="child-graph-styling">
                            <Graph data={[displayAxis, props.data[2][key]]} />
                        </div>     
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Accordion