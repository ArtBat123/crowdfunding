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
    async get(id) {
        const response = await HttpClient.get(`project/${id}`);
        return response.data;
    },
    async updateStory(payload) {
        const response = await HttpClient.put('project', payload);
        return response.data;
    },
};
