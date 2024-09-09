import HttpClient, { BASE_HEADERS, BASE_URL } from '@/helpers/HttpClient';
import axios from 'axios';

export default {
    async login(payload: any) {
        const response = await HttpClient.post('auth/login', payload);
        return response.data;
    },
    async registration(payload: any) {
        const response = await HttpClient.post('auth/registration', payload);
        return response.data;
    },
    async logout() {
        const response = await HttpClient.post('auth/logout');
        return response.data;
    },
    async refreshTokens() {
        const response = await axios.post(BASE_URL + '/auth/refresh', undefined, {
            withCredentials: true,
            headers: { ...BASE_HEADERS },
        });
        return response.data;
    },
    async checkAuth() {
        const response = await axios.post(BASE_URL + '/auth/check', undefined, {
            withCredentials: true,
            headers: { ...BASE_HEADERS },
        });
        return response.data;
    },
};
