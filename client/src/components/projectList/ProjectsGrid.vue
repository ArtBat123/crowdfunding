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
            @click="loadMoreProjects"
        ></Button>
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';
import { storeToRefs } from 'pinia';
import { useProjectListStore } from '@/stores/projectList';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EmptyState from '@/components/projectList/EmptyState.vue';

const projectListStore = useProjectListStore();
const route = useRoute();
const { projectList, isLastPage } = storeToRefs(projectListStore);

const isLoadingMoreProjects = ref(false);

function loadMoreProjects() {
    projectListStore.loadProjectList(
        route.query,
        (newValue) => (isLoadingMoreProjects.value = newValue)
    );
}
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
