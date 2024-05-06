import HttpClient from '@/helpers/HttpClient';
import type { AxiosError, CanceledError } from 'axios';
import axios from 'axios';

const abortControllers: Record<string, AbortController> = {};

export default {
    async get(id) {
        const response = await HttpClient.get(`project/${id}`);
        return response.data;
    },

    async getWithFilters(queryParams: ProjectQueryParams) {
        try {
            const abortControllersKey = 'get/project';
            if (abortControllers[abortControllersKey])
                abortControllers[abortControllersKey].abort();
            abortControllers[abortControllersKey] = new AbortController();

            const response = await HttpClient.get(`project`, {
                params: queryParams,
                signal: abortControllers[abortControllersKey].signal,
            });
            return response.data;
        } catch (error) {
            if (!axios.isAxiosError(error) || error.code !== 'ERR_CANCELED') throw error;
        }
    },

    async create(payload) {
        const response = await HttpClient.post('project', payload);
        return response.data;
    },

    async updateStory(payload) {
        const response = await HttpClient.put('project', payload);
        return response.data;
    },
};
