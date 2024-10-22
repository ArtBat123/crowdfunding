import { useAuthStore } from '@/stores/auth';
import axios, { Axios, AxiosError } from 'axios';

export const BASE_URL = '/api';
export const BASE_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

const HttpClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { ...BASE_HEADERS },
});

HttpClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

HttpClient.interceptors.response.use(null, async (error) => {
    if (error.response.status === 401 && !error.config.isSended) {
        try {
            error.config.isSended = true;
            await useAuthStore().refreshTokens();
            return axios(error.config);
        } catch (e) {
            throw (e as AxiosError)?.response?.data;
        }
    }

    return Promise.reject(error?.response?.data ?? error);
});

export default HttpClient;
