import React, {useState} from 'react';
import axios from 'axios';
import apiClient from '../services/api';

function Todolist (){
    const [todolists, setTodolists] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    React.useEffect(() => {
        apiClient.get('/api/todolists').then(response => {
            setTodolists(response.data)
            })
            .catch(error => {
                console.error(error);
                if (error.response.status == 401){
                    setErrorMsg('Please login to see the todolist data');
                }
            });
        }, []);

    if (errorMsg){
        return (
        <div>
            <p>{errorMsg}</p>
        </div>
        )
    }

    const todoList = todolists.map((todo) =>
        <li key={todo.id}>{todo.note}</li>
    );
    return (
        <div>
            <h1>
                TodoList
            </h1>
            <ul>{todoList}</ul>
        </div>
    );
}
export default Todolist;