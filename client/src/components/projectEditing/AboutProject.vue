<template>
    <div class="content-container mb-4">
        <div class="title py-6">
            <h1>Расскажите подробнее о проекте</h1>
            <h2>
                Расскажите потенциальным участникам больше о вашей проекте. Предоставьте детали,
                которые будут мотивировать людей внести свой вклад.
            </h2>
        </div>
        <div>
            <Editor
                v-model="projectData.story"
                editor-style="min-height: 320px"
            />
            <div class="flex justify-content-end mt-2">
                <Button
                    label="Сохранить"
                    @click="saveProjectStory"
                ></Button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import Editor from '../ui/Editor.vue';

const projectEditingStore = useProjectEditingStore();
const { projectData } = storeToRefs(projectEditingStore);

function saveProjectStory() {
    const payload = {
        projectId: projectData.value.id,
        story: projectData.value.story,
    };
    api.project.updateStory(payload);
}
</script>
<style scoped lang="scss">
.title {
    text-align: center;
    width: 1000px;
    margin: 0 auto;
    h1 {
        font-size: xx-large;
    }
    h2 {
        font-size: large;
        font-weight: normal;
    }
}
.subtitle {
    text-align: center;
}
</style>
