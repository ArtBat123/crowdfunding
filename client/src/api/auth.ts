import HttpClient from '@/helpers/HttpClient';

export default {
    async login(payload: any) {
        const response = await HttpClient.post('auth/login', payload);
        return response.data;
    },
    async registration(payload: any) {
        const response = await HttpClient.post('auth/registration', payload);
        return response.data;
    },
};
