<template>
    <div class="projects-grid">
        <ProjectListItem
            v-for="project in projectList"
            :key="project.id"
            :title="project.title"
            :subtitle="project.subtitle"
        />
    </div>
</template>

<script setup lang="ts">
import api from '@/api/api';
import { ref } from 'vue';
import ProjectListItem from '@/components/projectList/ProjectListItem.vue';

const projectList = ref([]);

const res = await api.project.getAll();

projectList.value = res;
</script>

<style scoped>
.item {
    background-color: red;
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
