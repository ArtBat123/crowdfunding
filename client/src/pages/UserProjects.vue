<template>
    <div class="content-container flex my-6">
        <div
            v-if="!isLoadingProjects"
            class="projects-grid"
        >
            <template v-if="projectList.length > 0">
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
            </template>
            <div
                v-else
                class="flex align-items-center"
            >
                <span class="text-3xl mr-4">Проектов нет, но вы можете создать их</span>
                <RouterLink to="/projects/edit/base">
                    <Button
                        label="Создать проект"
                        outlined
                        class="mr-4"
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
import { useBlockchainStore } from '@/stores/blockchain';
import { useProjectListStore } from '@/stores/projectList';
import { storeToRefs } from 'pinia';

const projectsStore = useProjectListStore();
const { isLoadingProjects, projectList } = storeToRefs(projectsStore);
const { loadEthExchangeRate } = useBlockchainStore();

await loadEthExchangeRate();
await projectsStore.loadProjectListByUserId();
</script>

<style scoped lang="scss">
.projects-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    flex-grow: 1;
}
</style>
