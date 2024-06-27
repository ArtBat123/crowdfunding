import HttpClient from '@/helpers/HttpClient';

export default {
    async getByProjectId(projectId: number) {
        const response = await HttpClient.get('project-rewards', { params: { projectId } });
        return response.data;
    },
    async create(payload: any) {
        const response = await HttpClient.post('project-rewards', payload);
        return response.data;
    },
    async delete(projectId: number) {
        const response = await HttpClient.delete('project-rewards/' + projectId);
        return response.data;
    },
};
