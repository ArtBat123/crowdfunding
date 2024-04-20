<template>
    <div class="container flex">
        <ProjectsFilterPanel></ProjectsFilterPanel>
        <div class="right-panel">
            <IconField
                icon-position="left"
                class="mb-4"
            >
                <InputIcon class="pi pi-search"> </InputIcon>
                <InputText
                    v-model="value1"
                    placeholder="Поиск проектов"
                    class="w-full"
                />
            </IconField>
            <Suspense>
                <ProjectsGrid></ProjectsGrid>
                <template #fallback>
                    <div class="w-full py-6">
                        <Loader class="mx-auto" />
                    </div>
                </template>
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
import ProjectsFilterPanel from '@/components/projectList/ProjectsFilterPanel.vue';
import ProjectsGrid from '@/components/projectList/ProjectsGrid.vue';
import Loader from '@/components/ui/Loader.vue';
import { Suspense } from 'vue';
</script>

<style scoped lang="scss">
.container {
    max-width: var(--max-content-width);
    margin: 30px auto;
}
.right-panel {
    display: flex;
    flex-direction: column;
    .pi-search {
        top: calc(50% - 8px);
    }
}
</style>
