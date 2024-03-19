<template>
    <div class="container flex">
        <ProjectsFilterPanel></ProjectsFilterPanel>
        <ProjectsGrid></ProjectsGrid>
    </div>
</template>

<script setup lang="ts">
import ProjectsFilterPanel from '@/components/projects/ProjectsFilterPanel.vue';
import ProjectsGrid from '@/components/projects/ProjectsGrid.vue';
</script>

<style scoped>
.container {
    max-width: var(--max-content-width);
    margin: 30px auto;
}
</style>
