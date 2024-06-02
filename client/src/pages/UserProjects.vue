<template>
    <div class="content-container flex my-6">
        <div
            v-if="!isLoadingProjects"
            class="projects-grid"
        >
            <div
                v-for="project in projectList"
                :key="project.id"
            >
                <RouterLink :to="{ name: 'projectEditing', params: { id: project.id } }">
                    <ProjectListItem
                        :project="project"
                        class="h-full w-full"
                    />
                </RouterLink>
            </div>
        </div>
        <Loader
            v-else
            class="mx-auto mt-6"
        />
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';
import Loader from '@/components/ui/Loader.vue';
import { useAuthStore } from '@/stores/auth';
import { useBlockchainStore } from '@/stores/blockchain';
import { useProjectListStore } from '@/stores/projectList';
import { storeToRefs } from 'pinia';

const projectsStore = useProjectListStore();
const { isLoadingProjects, projectList } = storeToRefs(projectsStore);
const { loadEthExchangeRate } = useBlockchainStore();
const { userInfo } = useAuthStore();

await loadEthExchangeRate();
userInfo && (await projectsStore.loadProjectListByUserId(userInfo?.userId));
</script>

<style scoped lang="scss">
.projects-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    flex-grow: 1;
}
</style>
