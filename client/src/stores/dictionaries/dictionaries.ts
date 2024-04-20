import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/api';

export const useDictionariesStore = defineStore('dictionaries', () => {
    const projectCategories = ref<ProjectCategoryList>([]);

    async function getProjectCategories() {
        projectCategories.value = await api.projectCategory.getAll();
    }
    return { projectCategories, getProjectCategories };
});
