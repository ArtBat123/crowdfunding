<template>
    <div v-html="currentProject?.story"></div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';

const projectStore = useProjectStore();
const { currentProject } = storeToRefs(projectStore);
</script>
