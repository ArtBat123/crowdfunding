import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProjectStore = defineStore('project', () => {
    const currentProject = ref<ProjectCard>();
    const rewardList = ref<ProjectReward[]>([]);

    async function loadProject(id: number) {
        currentProject.value = await api.project.get(id);
    }
    async function loadProjectRewards(projectId: number) {
        rewardList.value = await api.projectReward.getByProjectId(projectId);
    }

    return { currentProject, rewardList, loadProject, loadProjectRewards };
});
