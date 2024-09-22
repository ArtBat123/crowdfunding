<template>
    <div class="w-full">
        <div class="projects-grid">
            <div
                v-for="project in projectList"
                :key="project.id"
            >
                <RouterLink :to="{ name: 'viewProjectStory', params: { id: project.id } }">
                    <ProjectListItem
                        :project="project"
                        class="h-full w-full"
                    />
                </RouterLink>
            </div>
        </div>
        <EmptyState v-if="!projectList.length" />
        <Button
            v-if="projectList.length && !isLastPage"
            :loading="isLoadingMoreProjects"
            label="Показать еще"
            class="w-full mt-3"
            @click="projectListStore.addProjects"
        ></Button>
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';
import { storeToRefs } from 'pinia';
import { useProjectListStore } from '@/stores/projectList';
import EmptyState from '@/components/projectList/EmptyState.vue';

const projectListStore = useProjectListStore();
const { projectList, isLastPage, isLoadingMoreProjects } = storeToRefs(projectListStore);
</script>

<style scoped>
.item {
    margin: 10px;
    height: 200px;
}
.projects-grid {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    flex-grow: 1;
}
</style>
