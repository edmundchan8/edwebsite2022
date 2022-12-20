import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from '../../../services/api';

function EditStocks() {
    
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const [orderId, setOrderId] = useState();
    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [tickerSymbol, setTickerSymbol] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();

    function handleSubmit(e){
        e.preventDefault();
        
        // create object with order data to pass to laravel
        var orderData = {
            id: orderId,
            date: date,
            name: name,
            tickerSymbol: tickerSymbol,
            quantity: quantity,
            price: price
        }

        //stringify data so that it can be used in laravel
        orderData = JSON.stringify(orderData);
        
        apiClient.get(`/api/orders/${tickerSymbol}/edit/${orderData}`).then(response => {
            console.log(response);
            //return to stock orders page
            navigate('/stockManager/orders');
        })
        .catch(error => {
            console.error(error);
            alert('Error in updating order');
        });
    }

    function handleChange(e){
        // get value and name from form
        const {value, name} = (e.target);
        if (name === 'date'){
            setDate(value);
        }
        if (name === 'name'){
            setName(value);
        }
        if (name === 'tickerSymbol'){
            setTickerSymbol(value);
        }
        if (name === 'quantity'){
            setQuantity(value);
        }
        if (name === 'price'){
            setPrice(value);
        }   
    }

    function handleDelete(id){
        const confirm = window.confirm("Are you sure?");
        if (confirm){
            apiClient.delete(`/api/orders/delete/${id}`).then(response => {
                console.log(response);
                //return to stock orders page
                navigate('/stockManager/orders');
            })
            .catch(error => {
                console.error(error);
                alert('Error in updating order');
            });
        }
        else {
            console.log('stock was not deleted');
        }

    }
    
    useEffect(() => {
        // set order id to use later
        setOrderId(state.s['id']);
        console.log(state.s);
        // first, filter out keys that includes currentPrice and ownerId, don't want to show them here
        Object.keys(state.s).filter ((key, index) => {
            if (key === 'currentPrice' || key === 'ownerID' || key === 'id'){
                return false;
            } else {
                return true;
            }
            // then map through rest of data to setstate for each one
        }).map((key, index) => {
            if(key === 'date'){
                setDate(state.s[key]);
            }
            if(key === 'name'){
                setName(state.s[key]);
            }
            if(key === 'tickerSymbol'){
                setTickerSymbol(state.s[key]);
            }
            if(key === 'quantity'){
                setQuantity(state.s[key]);
            }
            if(key === 'price'){
                setPrice(state.s[key]);
            }
            return 'no matching setstate found';
        });
    }, [])

    return(
        <div className='stock-edit-layout'>
            <h4>Click submit to save your edits</h4>
            <form onSubmit={handleSubmit}>
                <label key='date'>Date
                <input className='order-input'
                    type='date'
                    name='date'
                    value={date}
                    onChange={e => handleChange(e)}
                    required
                />
                </label>
                <br></br>

                <label key='name'>Name
                    <input className='order-input'
                        type='name'
                        name='name'
                        value={name}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>
                <br></br>

                <label key='tickerSymbol'>Ticker Symbol
                    <input className='order-input'
                        type='tickerSymbol'
                        name='tickerSymbol'
                        value={tickerSymbol}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>
                <br></br>

                <label key='quantity'>Quantity
                    <input className='order-input'
                        type='quantity'
                        name='quantity'
                        value={quantity}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>
                <br></br>

                <label key='price'>Price
                    <input className='order-input'
                        type='price'
                        name='price'
                        value={price}
                        onChange={e => handleChange(e)}
                        required
                    />
                </label>
                <div className="submit-align-right">
                    <input className="submit-styling" type="submit" ></input>
                </div>
                
            </form>
            <div className="submit-align-right">
                <button className="submit-styling" onClick={() => handleDelete(orderId)}>Delete</button>
            </div>
        </div>
    )
}

export default EditStocks;