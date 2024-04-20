import HttpClient from '@/helpers/HttpClient';

export default {
    async create(payload) {
        const response = await HttpClient.post('project', payload);
        return response.data;
    },
    async getAll() {
        const response = await HttpClient.get('project');
        return response.data;
    },
};
