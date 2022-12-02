import axios from 'axios';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(REACT_APP_BASE_URL);
const apiClient = axios.create({
    baseURL: REACT_APP_BASE_URL,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;