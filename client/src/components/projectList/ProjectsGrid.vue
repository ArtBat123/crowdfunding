<template>
    <div class="projects-grid">
        <div
            v-for="project in projectList"
            :key="project.id"
        >
            <RouterLink :to="{ name: 'viewProjectStory', params: { id: project.id } }">
                <ProjectListItem
                    :title="project.title"
                    :subtitle="project.subtitle"
                    :image-url="project.imageUrl"
                    class="h-full w-full"
                />
            </RouterLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';
import { storeToRefs } from 'pinia';
import { useProjectListStore } from '@/stores/projectList';

const { projectList } = storeToRefs(useProjectListStore());
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
