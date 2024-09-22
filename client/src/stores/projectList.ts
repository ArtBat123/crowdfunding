import api from '@/api/api';
import { useAsyncData } from '@/composable/useAsyncData';
import { useRouteQuerySync } from '@/composable/useRouteQuerySync';
import { defineStore } from 'pinia';
import { computed, reactive, ref, shallowRef, watch } from 'vue';

export const useProjectListStore = defineStore('projectList', () => {
    const projectList = ref<Project[]>([]);
    const isLoadingMoreProjects = ref(false);
    const isLoadingProjectsCount = ref(0);
    const isLoadingProjects = computed(() => isLoadingProjectsCount.value > 0);
    const lastProjectId = ref<number>();
    const isLastPage = ref(false);

    const search = ref<string>();
    const filters = reactive({
        categoriesId: useRouteQuerySync('categoriesId[]', { transform: 'number[]' }),
        subcategoriesId: useRouteQuerySync('subcategoriesId[]', { transform: 'number[]' }),
        visibleFinishedProject: useRouteQuerySync('visibleFinishedProject', {
            transform: 'boolean',
        }),
    });

    watch(filters, () => {
        clearProjectList();
        loadProjectList();
    });

    async function loadProjectList() {
        const setIsLoading = (newValue: boolean) => {
            if (newValue) isLoadingProjectsCount.value++;
            else if (!newValue && isLoadingProjectsCount.value <= 0)
                isLoadingProjectsCount.value = 0;
            else isLoadingProjectsCount.value--;
        };
        projectList.value = await _getProjectListWithFilters(setIsLoading);
    }
    async function addProjects() {
        if (!isLastPage.value) {
            const setIsLoading = (newValue: boolean) => (isLoadingMoreProjects.value = newValue);
            const projects = await _getProjectListWithFilters(setIsLoading);
            projectList.value.push(...projects);
        }
    }
    async function loadProjectListByUserId(userId: number) {
        const projects = await api.project.getByUserId(userId);
        projectList.value = projects;
    }
    function clearProjectList() {
        projectList.value.length = 0;
    }
    async function _getProjectListWithFilters(setIsLoading: (newValue: boolean) => void) {
        const { data, error } = await useAsyncData({
            queryFn: () =>
                api.project.getWithFilters(
                    filters,
                    {
                        limit: 21,
                        startKey: lastProjectId.value,
                    },
                    search.value
                ),
            setIsLoading,
        });

        if (!error.value && data.value) {
            lastProjectId.value = data.value.endKey;
            isLastPage.value = data.value.isLastPage;
            return data.value.data;
        }
        throw new Error('Ошибка загрузки проектов');
    }

    return {
        projectList,
        isLastPage,
        search,
        filters,
        isLoadingProjects,
        isLoadingMoreProjects,
        loadProjectList,
        loadProjectListByUserId,
        addProjects,
        clearProjectList,
    };
});
