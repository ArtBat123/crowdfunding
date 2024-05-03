import HttpClient from '@/helpers/HttpClient';

export default {
    async getByProjectId(projectId: number) {
        const response = await HttpClient.get('project-rewards', { params: { projectId } });
        return response.data;
    },
    async create(payload) {
        const response = await HttpClient.post('project-rewards', payload);
        return response.data;
    },
};
