<template>
    <IconField
        icon-position="left"
        class="mb-4"
    >
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText
            v-model="search"
            placeholder="Поиск проектов"
            class="w-full"
            @update:model-value="onInput"
        />
    </IconField>
</template>

<script setup lang="ts">
import { useProjectListStore } from '@/stores/projectList';
import { storeToRefs } from 'pinia';

const projectListStore = useProjectListStore();
const { search } = storeToRefs(projectListStore);

function onInput(value: string | undefined) {
    console.log(value);
}
</script>
