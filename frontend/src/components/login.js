import React, {useState } from 'react';
import apiClient from '../services/api';

function Login (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('/sanctum/csrf-cookie').then(response => {
            apiClient.post('/login', {
                email: email,
                password: password
            }).then(response => {
                props.onLogin();
            });
        });

    }

    if (!sessionStorage.getItem('loggedIn')){
        return (<div>You are logged in</div>);
    }
    else
    return (
        <div>
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