<template>
    <div>
        <div class="rewards-header">
            <div>Название</div>
            <div>Цена</div>
            <div>Лимит наград</div>
            <div>Изображение</div>
        </div>
        <div
            v-for="reward in rewardList"
            :key="reward.id"
            class="rewards-item"
        >
            <div class="rewards-item-content">
                <div>{{ reward.name }}</div>
                <div>{{ reward.price }}</div>
                <div>{{ reward.limit }}</div>
                <img
                    :src="reward.imageUrl"
                    alt="1"
                    height="100px"
                    width="100px"
                />
            </div>
            <div class="rewards-item-btn-bar">
                <Button
                    label="Редактировать"
                    link
                />
                <Button
                    label="Удалить"
                    link
                    @click="deleteReward(reward.id)"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';

const projectEditingStore = useProjectEditingStore();
const { rewardList, projectData } = storeToRefs(projectEditingStore);

async function deleteReward(rewardId: number) {
    await api.projectReward.delete(rewardId);
    projectEditingStore.loadRewardListByProjectId(projectData.value.id);
}
</script>
<style scoped lang="scss">
.rewards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.rewards-header {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
}
.rewards-item {
    border: 1px solid var(--gray-300);
    border-radius: var(--border-radius);
    margin-bottom: 4px;
    &:hover {
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
        opacity: 1;
        transform: translateY(-1px);
    }
}
.rewards-item-content {
    display: flex;
    justify-content: space-between;
    padding: 16px;
}
.rewards-item-btn-bar {
    border-top: 1px solid var(--gray-300);
    padding: 8px 16px;
    display: flex;
    justify-content: end;
}
</style>
