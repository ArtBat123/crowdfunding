import api from '@/api/api';
import { useAsyncData } from '@/composable/useAsyncData';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LocationQuery } from 'vue-router';

export const useProjectListStore = defineStore('projectList', () => {
    const projectList = ref<Project[]>([]);
    const lastProjectId = ref<number>();
    const isLastPage = ref(false);
    const search = ref<string>();
    const filters = ref({
        categoriesId: [] as number[],
        subcategoriesId: [],
    });

    async function loadProjectList(queryParams: LocationQuery, setIsLoading: (v: boolean) => void) {
        const { data, error } = await useAsyncData({
            queryFn: () =>
                api.project.getWithFilters(queryParams, {
                    limit: 20,
                    startKey: lastProjectId.value,
                }),
            setIsLoading,
        });

        if (!error.value && data.value) {
            projectList.value.push(...data.value.data);
            lastProjectId.value = data.value.endKey;
            isLastPage.value = data.value.isLastPage;
        }
    }
    async function loadProjectListByUserId(userId: number) {
        projectList.value = await api.project.getByUserId(userId);
    }
    function clearProjectList() {
        projectList.value = [];
    }

    return {
        projectList,
        isLastPage,
        search,
        filters,
        loadProjectList,
        loadProjectListByUserId,
        clearProjectList,
    };
});
