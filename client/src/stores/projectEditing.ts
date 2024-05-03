import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectEditingStore = defineStore('projectEditing', () => {
    const rewardList = ref([]);

    async function loadRewardListByProjectId(projectId: number) {
        rewardList.value = await api.projectReward.getByProjectId(projectId);
    }

    return { rewardList, loadRewardListByProjectId };
});
