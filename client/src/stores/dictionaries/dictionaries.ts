import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/api/api';

export const useDictionariesStore = defineStore('dictionaries', () => {
    const projectCategories = ref<ProjectCategoryList>([]);
    const projectCategoriesMap = ref(new Map<number, ProjectCategory>());

    const projectSubcategories = ref<ProjectSubcategoryList>([]);
    const projectSubcategoriesMap = ref(new Map<number, ProjectSubcategory>());

    async function getProjectCategories() {
        projectCategories.value = await api.projectCategory.getAll();
        projectCategoriesMap.value = projectCategories.value.reduce(
            (acc, item) => acc.set(item.id, item),
            new Map<number, ProjectCategory>()
        );
    }
    async function getProjectSubcategories() {
        projectSubcategories.value = await api.projectCategory.getSubcategories();
        projectSubcategoriesMap.value = projectSubcategories.value.reduce(
            (acc, item) => acc.set(item.id, item),
            new Map<number, ProjectSubcategory>()
        );
    }
    return {
        projectCategories,
        projectCategoriesMap,
        projectSubcategories,
        projectSubcategoriesMap,
        getProjectCategories,
        getProjectSubcategories,
    };
});
