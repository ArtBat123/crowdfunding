<template>
    <div class="content-container flex my-6">
        <ProjectsFilterPanel></ProjectsFilterPanel>
        <div class="right-panel">
            <IconField
                icon-position="left"
                class="mb-4"
            >
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText
                    :model-value="queryParams.search"
                    placeholder="Поиск проектов"
                    class="w-full"
                    @update:model-value="onSearchInput"
                />
            </IconField>
            <ProjectsGrid v-if="!isLoadingProjects" />
            <Loader
                v-else
                class="mx-auto mt-6"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectsFilterPanel from '@/components/projectList/ProjectsFilterPanel.vue';
import ProjectsGrid from '@/components/projectList/ProjectsGrid.vue';
import Loader from '@/components/ui/Loader.vue';
import { debounce } from '@/helpers/common';
import { useProjectListStore } from '@/stores/projectList';
import { storeToRefs } from 'pinia';
import {
    onBeforeRouteUpdate,
    useRoute,
    useRouter,
    type LocationQueryRaw,
    type RouteLocationNormalizedLoaded,
} from 'vue-router';

const router = useRouter();
const route = useRoute();
const projectsStore = useProjectListStore();
const { isLoadingProjects, queryParams } = storeToRefs(projectsStore);
const changeRouteQuery = debounce(
    (queryParams: ProjectQueryParams) => router.push({ query: queryParams as LocationQueryRaw }),
    300
);

correlateDataWithRouting(route);

function onSearchInput(value: string) {
    const searchValue = value.trim() || undefined;
    changeRouteQuery({ ...queryParams.value, search: searchValue });
}
function correlateDataWithRouting(route: RouteLocationNormalizedLoaded) {
    const routeQuery = route.query;
    if (routeQuery.subcategoryId && !Array.isArray(routeQuery.subcategoryId))
        routeQuery.subcategoryId = [routeQuery.subcategoryId];
    queryParams.value = { ...route.query };
    projectsStore.loadProjectList();
}

onBeforeRouteUpdate((to) => {
    correlateDataWithRouting(to);
});
</script>

<style scoped lang="scss">
.right-panel {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    .pi-search {
        top: calc(50% - 8px);
    }
}
</style>
