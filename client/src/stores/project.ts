import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
    const currentProject = ref<Project>();

    async function loadProject(id: number) {
        currentProject.value = await api.project.get(id);
    }

    return { currentProject, loadProject };
});
