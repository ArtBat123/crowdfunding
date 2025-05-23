import HttpClient from '@/helpers/HttpClient';
import axios from 'axios';
import type { PaginatedResponse, PaginationParams } from './types';

const abortControllers: Record<string, AbortController> = {};

export default {
    async get(id: number) {
        const response = await HttpClient.get(`project/${id}`);
        return response.data;
    },

    async getNextId(): Promise<number> {
        const response = await HttpClient.get(`project/next-id`);
        return response.data.value;
    },

    async getMyProjects() {
        const response = await HttpClient.get(`project/my-projects`);
        return response.data;
    },

    async getWithFilters(
        filters: ProjectListFilters,
        paginationParams: PaginationParams,
        search?: string
    ) {
        try {
            const abortControllersKey = 'get/project';
            if (abortControllers[abortControllersKey])
                abortControllers[abortControllersKey].abort();
            abortControllers[abortControllersKey] = new AbortController();

            const response = await HttpClient.get<PaginatedResponse<Project[]>>(`project`, {
                params: { ...filters, ...paginationParams, search: search || null },
                signal: abortControllers[abortControllersKey].signal,
            });
            return response.data;
        } catch (error) {
            if (!axios.isAxiosError(error) || error.code !== 'ERR_CANCELED') throw error;
        }
    },

    async create(payload: any): Promise<Project> {
        const response = await HttpClient.post('project', payload);
        return response.data;
    },

    async update(payload: any): Promise<Project> {
        const response = await HttpClient.put('project', payload);
        return response.data;
    },

    async updateStory(payload: any) {
        const response = await HttpClient.put('project', payload);
        return response.data;
    },

    async updateCreatorEthAddress(payload: any) {
        const response = await HttpClient.put('project/creator-eth-address', payload);
        return response.data;
    },

    async getComments(projectId: number) {
        const response = await HttpClient.get(`project/${projectId}/comment`);
        return response.data;
    },

    async createComment(projectId: number, text: string, parentId: null) {
        const response = await HttpClient.post(`project/${projectId}/comment`, { parentId, text });
        return response.data;
    },
};
