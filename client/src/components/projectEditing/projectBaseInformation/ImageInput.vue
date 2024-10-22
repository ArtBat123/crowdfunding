<template>
    <section class="flex my-4">
        <div class="left-section-block">
            <h3 class="font-semibold mb-1">Изображение для проекта</h3>
            <p>
                Добавьте изображение, которое представляет ваш проект, оно появится на странице
                вашего проекта.
            </p>
        </div>
        <div class="right-section-block image-input">
            <ImageUploader
                id="image"
                :image-url="projectData.imageUrl"
                class="h-full"
                :invalid="fieldsErrors.has('imageUrl')"
                @upload="uploadFile"
            />
        </div>
    </section>
</template>
<script setup lang="ts">
import api from '@/api/api';
import ImageUploader from '@/components/ui/ImageUploader.vue';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';

const { projectData } = storeToRefs(useProjectEditingStore());

const { fieldsErrors, removeError } = inject<{
    fieldsErrors: Set<string>;
    removeError: (key: string) => void;
}>('errors', { fieldsErrors: new Set(), removeError: () => null });

// TODO: Переделать на утилиту или сервис
async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const { fileUrl } = await api.files.upload(formData);
    projectData.value.imageUrl = fileUrl;
}
</script>
<style scoped>
.image-input {
    height: 250px;
}
</style>
