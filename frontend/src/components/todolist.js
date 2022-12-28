import React, {useState, useEffect} from 'react';
// import {  } from 'react-router-dom';
import apiClient from '../services/api';

function Todolist (){
    const [todolists, setTodolists] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        apiClient.get('/api/todolists').then(response => {

            setTodolists(response.data)
                console.log(response);
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 401){
                    setErrorMsg('Please login to see the todolist data');
                }
            });
        }, []);

    if (errorMsg){
        return (
        <div>
            <h2>
                TodoList
            </h2>
            <p>{errorMsg}</p>
        </div>
        )
    }

    const todoList = todolists.map((todo) =>
        <li key={todo.id}>{todo.note}</li>
    );
    return (
        <div>
            <h2>
                TodoList
            </h2>
            <ul>{todoList}</ul>
        </div>
    );
}
export default Todolist;