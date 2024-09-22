<template>
    <div class="content-container flex my-6">
        <ProjectsFilterPanel></ProjectsFilterPanel>
        <div class="flex flex-column flex-grow-1 ml-4">
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
import { useProjectListStore } from '@/stores/projectList';
import ProjectListSearch from '@/components/projectList/ProjectListSearch.vue';
import { storeToRefs } from 'pinia';

const projectListStore = useProjectListStore();
const blockchainStore = useBlockchainStore();

const { isLoadingProjects } = storeToRefs(projectListStore);

await blockchainStore.loadEthExchangeRate();
loadProjectList();

function loadProjectList() {
    projectListStore.clearProjectList();
    projectListStore.loadProjectList();
}
</script>
