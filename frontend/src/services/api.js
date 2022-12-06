import axios from 'axios';

var baseUrl = null;

// if current build is production, use production api, otherwish use local api
process.env.NODE_ENV == 'development' ? baseUrl = process.env.REACT_APP_DEV_API_URL : baseUrl = process.env.REACT_APP_PROD_API_URL;

const apiClient = axios.create({
    baseURL: baseUrl,
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    withCredentials: true,
});

export default apiClient;