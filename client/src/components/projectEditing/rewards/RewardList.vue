<template>
    <div>
        <div class="rewards-header">
            <div class="font-bold">Название</div>
            <div class="font-bold">Цена</div>
            <div class="font-bold">Лимит наград</div>
            <div class="font-bold">Изображение</div>
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
                    @click="emit('editItemClick', reward.id)"
                />
                <Button
                    label="Удалить"
                    link
                    @click="deleteReward(reward.id)"
                />
                <i
                    v-show="isLoadingDeleting"
                    class="pi pi-spin pi-spinner"
                ></i>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useAsyncData } from '@/composable/useAsyncData';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const emit = defineEmits<{
    editItemClick: [rewardId: number];
}>();

const toast = useToast();
const route = useRoute();
const projectEditingStore = useProjectEditingStore();
const { rewardList } = storeToRefs(projectEditingStore);
const isLoadingDeleting = ref(false);

async function deleteReward(rewardId: number) {
    const { error } = await useAsyncData({
        queryFn: () => api.projectReward.delete(rewardId),
        setIsLoading: (newValue) => (isLoadingDeleting.value = newValue),
    });

    if (error.value) {
        toast.add({
            severity: 'error',
            summary: 'Неизвестная ошибка',
            detail: 'Перезагрузите страницу и попробуйте еще раз',
            life: 3000,
        });
    } else {
        projectEditingStore.loadRewardListByProjectId(Number(route.params.id));
    }
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
    align-items: center;
}
</style>
