import axios from 'axios';

const base_url = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
    baseURL: base_url,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;