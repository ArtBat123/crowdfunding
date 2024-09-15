import HttpClient from '@/helpers/HttpClient';

export default {
    async getAll() {
        const response = await HttpClient.get('project-categories');
        return response.data;
    },
    async getSubcategories() {
        const response = await HttpClient.get('project-subcategories');
        return response.data;
    },
};
