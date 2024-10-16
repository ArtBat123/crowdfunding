<template>
    <IconField
        icon-position="left"
        class="mb-4"
    >
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText
            v-model.trim="search"
            placeholder="Поиск проектов"
            class="w-full"
            @update:model-value="onInput"
        />
    </IconField>
</template>

<script setup lang="ts">
import { debounce } from '@/helpers/common';
import { useProjectListStore } from '@/stores/projectList';
import { storeToRefs } from 'pinia';

const projectListStore = useProjectListStore();
const { search } = storeToRefs(projectListStore);

const loadProjects = debounce(() => projectListStore.loadProjectList(), 500);

function onInput() {
    loadProjects();
}
</script>
