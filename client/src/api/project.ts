import HttpClient from '@/helpers/HttpClient';
import axios from 'axios';
import type { PaginatedResponse, PaginationParams } from './types';

const abortControllers: Record<string, AbortController> = {};

export default {
    async get(id: number) {
        const response = await HttpClient.get(`project/${id}`);
        return response.data;
    },

    async getByUserId(userId: number) {
        const response = await HttpClient.get(`project/user/${userId}`);
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

    async create(payload: any) {
        const response = await HttpClient.post('project', payload);
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
};
