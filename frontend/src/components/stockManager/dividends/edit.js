import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";

function EditDividends() {

    const location = useLocation();
    const { state } = location;
    console.log(state);
    const [newOrder, setNewOrder] = useState([]);

    useEffect(() => {
        
        var data = Object.keys(state.d).map((key, index) => {
            return(
                <tr key={index}>{key}: {state.d[key]}</tr>
            );
        });

        setNewOrder(data);

    }, [])

    console.log(newOrder);

    return(
        <div>
            <h4>This is the Edit Dividends component</h4>
            <table>
                <tbody>
                    {newOrder}
                </tbody>
            </table>
        </div>
    )
}

export default EditDividends;