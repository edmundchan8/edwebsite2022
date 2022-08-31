import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;