import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectEditingStore = defineStore('projectEditing', () => {
    const rewardList = ref([]);
    const projectData = ref();

    async function loadRewardListByProjectId(projectId: number) {
        rewardList.value = await api.projectReward.getByProjectId(projectId);
    }

    async function loadProjectById(projectId: number) {
        projectData.value = await api.project.get(projectId);
    }

    return { rewardList, projectData, loadRewardListByProjectId, loadProjectById };
});
