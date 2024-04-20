import HttpClient from '@/helpers/HttpClient';

export default {
    async getAll() {
        const response = await HttpClient.get('project-categories');
        return response.data;
    },
};
