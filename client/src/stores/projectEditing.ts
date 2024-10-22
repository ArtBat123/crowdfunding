import api from '@/api/api';
import { EditableProject } from '@/models/EditableProject';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectEditingStore = defineStore('projectEditing', () => {
    const rewardList = ref<any[]>([]);
    const projectData = ref(new EditableProject());
    const isNewProject = ref(false);

    function setIsNewProject(value: boolean) {
        isNewProject.value = value;
    }
    async function loadRewardListByProjectId(projectId: number) {
        rewardList.value = await api.projectReward.getByProjectId(projectId);
    }
    async function loadProjectById(projectId: number) {
        projectData.value = await api.project.get(projectId);
    }

    return {
        rewardList,
        projectData,
        isNewProject,
        loadRewardListByProjectId,
        loadProjectById,
        setIsNewProject,
    };
});
