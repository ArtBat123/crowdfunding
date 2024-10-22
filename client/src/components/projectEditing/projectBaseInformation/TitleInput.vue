<template>
    <section class="flex my-4">
        <div class="left-section-block">
            <h3 class="font-semibold mb-1">Название проекта</h3>
            <p>
                Напишите заголовок и подзаголовок, чтобы люди могли быстро понять о чем ваш проект.
                Оба заголовка будут отображаться на карточке проекта, а также в поисковых выдачах и
                email письмах.
            </p>
        </div>
        <div class="right-section-block">
            <div class="input-field">
                <label
                    for="title"
                    :class="{ 'error-text': fieldsErrors.has('title') }"
                >
                    Заголовок
                </label>
                <InputText
                    id="title"
                    v-model="projectData.title"
                    :invalid="fieldsErrors.has('title')"
                    class="input-field-value"
                    @update:model-value="removeError('title')"
                />
            </div>
            <div class="input-field">
                <label
                    for="subtitle"
                    :class="{ 'error-text': fieldsErrors.has('subtitle') }"
                >
                    Подзаголовок
                </label>
                <InputText
                    id="subtitle"
                    v-model="projectData.subtitle"
                    :invalid="fieldsErrors.has('subtitle')"
                    class="input-field-value"
                    @update:model-value="removeError('subtitle')"
                />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';

const { projectData } = storeToRefs(useProjectEditingStore());
const { fieldsErrors, removeError } = inject<{
    fieldsErrors: Set<string>;
    removeError: (key: string) => void;
}>('errors', { fieldsErrors: new Set(), removeError: () => null });
</script>
