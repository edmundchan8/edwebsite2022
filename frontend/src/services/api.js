import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    'Access-Control-Allow-Origin': '*',
    withCredentials: true,
});

export default apiClient;