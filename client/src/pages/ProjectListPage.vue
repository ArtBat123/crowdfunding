<template>
    <div class="content-container flex my-6">
        <ProjectsFilterPanel></ProjectsFilterPanel>
        <div class="right-panel">
            <ProjectListSearch />
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
import { useBlockchainStore } from '@/stores/blockchain';
import { onBeforeRouteUpdate, useRoute, type LocationQuery } from 'vue-router';
import { useProjectListStore } from '@/stores/projectList';
import { ref } from 'vue';
import ProjectListSearch from '@/components/projectList/ProjectListSearch.vue';

const route = useRoute();
const projectListStore = useProjectListStore();
const blockchainStore = useBlockchainStore();

const isLoadingProjects = ref(false);
await blockchainStore.loadEthExchangeRate();
loadProjectList(route.query);

function loadProjectList(routeQuery: LocationQuery) {
    projectListStore.clearProjectList();
    projectListStore.loadProjectList(
        routeQuery,
        (newValue) => (isLoadingProjects.value = newValue)
    );
}

onBeforeRouteUpdate((to) => {
    loadProjectList(to.query);
});
</script>

<style scoped lang="scss">
.right-panel {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
</style>
