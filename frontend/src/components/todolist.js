import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../services/api';

function Todolist (){
    const [todolists, setTodolists] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        apiClient.get('/api/todolists').then(response => {
            setTodolists(response.data)
                console.log(response);
                // console.log(JSON.stringify(response));
                //console.log(response.data);
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
            <h1 className="align-middle">
                TodoList
            </h1>
            <p>{errorMsg}</p>
            <Link to='/login'>Login</Link>
        </div>
        )
    }

    const todoList = todolists.map((todo) =>
        <li key={todo.id}>{todo.note}</li>
    );
    return (
        <div className="align-middle">
            <h1>
                TodoList
            </h1>
            <ul>{todoList}</ul>
        </div>
    );
}
export default Todolist;