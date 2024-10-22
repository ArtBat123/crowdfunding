<template>
    <section class="flex my-4">
        <div class="left-section-block">
            <h3 class="font-semibold mb-1">Категория проекта</h3>
            <p>Выберите основную категорию и подкатегорию, чтобы люди могли найти ваш проект.</p>
        </div>
        <div class="right-section-block">
            <div class="input-field">
                <label :class="{ 'error-text': fieldsErrors.has('categoryId') }">Категория</label>
                <Dropdown
                    v-model="projectData.categoryId"
                    :options="projectCategories"
                    option-label="name"
                    option-value="id"
                    :invalid="fieldsErrors.has('categoryId')"
                    class="input-field-value"
                    @update:model-value="removeError('categoryId')"
                />
            </div>
            <div class="input-field">
                <label :class="{ 'error-text': fieldsErrors.has('subcategoryId') }">
                    Подкатегория
                </label>
                <Dropdown
                    v-model="projectData.subcategoryId"
                    :options="selectedCategory?.subcategoryList"
                    option-label="name"
                    option-value="id"
                    :invalid="fieldsErrors.has('subcategoryId')"
                    class="input-field-value"
                    @update:model-value="removeError('subcategoryId')"
                />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { useDictionariesStore } from '@/stores/dictionaries/dictionaries';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { computed, inject } from 'vue';

const { projectData } = storeToRefs(useProjectEditingStore());
const { projectCategories, projectCategoriesMap } = storeToRefs(useDictionariesStore());

const { fieldsErrors, removeError } = inject<{
    fieldsErrors: Set<string>;
    removeError: (key: string) => void;
}>('errors', { fieldsErrors: new Set(), removeError: () => null });

const selectedCategory = computed(() => {
    if (projectData.value.categoryId)
        return projectCategoriesMap.value.get(projectData.value.categoryId);
    else return null;
});
</script>
