import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';

function Todolist (){
    const [todolists, setTodolists] = React.useState([]);
    React.useEffect(() => {
        apiClient.get('/api/todolists').then(response => {
            setTodolists(response.data)
            })
            .catch(error => console.error(error));
        }, []);

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