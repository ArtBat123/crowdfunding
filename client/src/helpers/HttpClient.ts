import axios from 'axios';

const BASE_URL = '/api';

const HttpClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default HttpClient;
