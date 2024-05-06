<template>
    <div class="projects-grid">
        <ProjectListItem
            v-for="project in projectList"
            :key="project.id"
            :title="project.title"
            :subtitle="project.subtitle"
            :image-url="project.imageUrl"
        />
    </div>
</template>

<script setup lang="ts">
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';
import { storeToRefs } from 'pinia';
import { useProjectsStore } from '@/stores/projectList';

const { projectList } = storeToRefs(useProjectsStore());
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
