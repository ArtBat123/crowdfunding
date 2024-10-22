import api from '@/api/api';
import { EditableProject } from '@/models/EditableProject';
import { EditableReward } from '@/models/EditableReward';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectEditingStore = defineStore('projectEditing', () => {
    const projectData = ref(new EditableProject());
    const isNewProject = ref(false);

    const rewardList = ref<any[]>([]);
    const editableReward = ref<EditableReward>(new EditableReward());

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
        editableReward,
        projectData,
        isNewProject,
        loadRewardListByProjectId,
        loadProjectById,
        setIsNewProject,
    };
});
