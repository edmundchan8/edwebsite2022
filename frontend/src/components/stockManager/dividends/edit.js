import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from '../../../services/api';

function EditDividends() {

    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [dividendId, setDividendId] = useState();
    const [newOrder, setNewOrder] = useState([]);
    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [dividend, setDividend] = useState();

    // handle form submit to edit dividend
    function handleSubmit(e){
        e.preventDefault();
        
        // create object with dividend data to pass to laravel
        var dividendData = {
            id: dividendId,
            date: date,
            name: name,
            dividend: dividend
        }

        //stringify data so that it can be used in laravel
        dividendData = JSON.stringify(dividendData);
        
        apiClient.get(`/api/dividends/${name}/edit/${dividendData}`).then(response => {
            console.log(response);
            //return to dividends page
            navigate('/stockManager/dividends');
        })
        .catch(error => {
            console.error(error);
            alert('Error in updating order');
        });
    }

    // handles which setState we are updating
    function handleChange(e){
        // get value and name from form
        const {value, name} = (e.target);
        if (name === 'date'){
            setDate(value);
        }
        if (name === 'dividend'){
            setDividend(value);
        }
    }

    function handleDelete(id){
        const confirm = window.confirm("Are you sure?");
        if (confirm){
            apiClient.delete(`/api/dividends/delete/${id}`).then(response => {
                console.log(response);
                //return to dividends page
                navigate('/stockManager/dividends');
            })
            .catch(error => {
                console.error(error);
                alert('Error in updating order');
            });
        }
        else {
            console.log('dividend was not deleted');
        }

    }

    useEffect(() => {
        
        //set dividend id
        setDividendId(state.d['id']);

        var data = Object.keys(state.d).map((key, index) => {
            if(key === 'date'){
                setDate(state.d[key]);
            }
            if(key === 'name'){
                setName(state.d[key]);
            }
            if(key === 'dividend'){
                setDividend(state.d[key]);
            }
        });

        setNewOrder(data);

    }, [])

    return(
        <div className='stock-edit-layout'>
            <h2>{name}</h2>
            <h4>Click submit to save your edits</h4>
            <form onSubmit={handleSubmit}>
                <label key='date'>Date
                    <input className='input-styling'
                        type='date'
                        name='date'
                        value={date}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>
                <br></br>

                <label key='dividend'>Dividend 
                    <input className='input-styling'
                        type='dividend'
                        name='dividend'
                        value={dividend}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>

                <br></br><br></br>
                <input type="submit" ></input>
            </form>
            <button onClick={() => handleDelete(dividendId)}>Delete</button>
        </div>
    )
}

export default EditDividends;