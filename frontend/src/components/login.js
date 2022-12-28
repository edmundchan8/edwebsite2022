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
            // console.log('status ' + response.status + ' on sanctum/csrf-cookie');
            apiClient.post('/api/login', {
                email: email,
                password: password
            }).then(response => {
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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="login-attributes"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    className="login-attributes"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <br></br>
                <div className="submit-align-right">
                    <button className="submit-styling" type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
export default Login;