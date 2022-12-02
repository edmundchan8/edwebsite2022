import axios from 'axios';

const laravel_url = process.env.REACT_APP_BASE_URL;

console.log(laravel_url);

const apiClient = axios.create({
    baseURL: laravel_url,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;