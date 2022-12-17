import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';

function Login (props) {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('/sanctum/csrf-cookie').then(response => {
            console.log(response);
            console.log('status ' + response.status + ' on sanctum/csrf-cookie');
            apiClient.post('/api/login', {
                email: email,
                password: password
            }).then(response => {
                console.log('login details all good, navigating to home worked. ' + response.status)
                props.onLogin();
                navigate('/home');
            })
            .catch(error => {
                console.error(error);
                if (error.response.status === 422){
                    console.log('Login unprocessable, incorrect login details');
                }
            });
        });

    }

    if (sessionStorage.getItem('loggedIn') === true){
        return (
            <div>You are logged in</div>
            );
    }
    else
    return (
        <div className='align-middle'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
export default Login;