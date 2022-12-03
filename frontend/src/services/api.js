import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
    baseURL: baseUrl,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;