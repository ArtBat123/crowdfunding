import api from '@/api/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProjectListStore = defineStore('projectList', () => {
    const projectList = ref<Project[]>([]);
    const queryParams = ref<ProjectQueryParams>({});
    const projectsRequestCount = ref(0);

    const isLoadingProjects = computed(() => projectsRequestCount.value > 0);
    async function loadProjectList() {
        try {
            projectsRequestCount.value++;
            projectList.value = await api.project.getWithFilters(queryParams.value);
        } finally {
            projectsRequestCount.value--;
        }
    }

    async function loadProjectListByUserId(userId: number) {
        try {
            projectsRequestCount.value++;
            projectList.value = await api.project.getByUserId(userId);
        } finally {
            projectsRequestCount.value--;
        }
    }

    return {
        projectList,
        queryParams,
        isLoadingProjects,
        loadProjectList,
        loadProjectListByUserId,
    };
});
