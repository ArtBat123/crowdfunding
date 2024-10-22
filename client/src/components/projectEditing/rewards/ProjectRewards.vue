<template>
    <div class="content-container">
        <div class="my-6">
            <h1 class="title">Заполните награды для спонсоров</h1>
            <div class="subtitle">
                <p>Награды мотивируют спонсоров поддержать ваш проект.</p>
            </div>
        </div>
        <div class="flex justify-content-end mb-4">
            <Button
                label="Создать награду"
                icon="pi pi-plus"
                icon-pos="right"
                class="h-3rem"
                @click="openCreateForm"
            />
        </div>
        <RewardList
            v-if="rewardList.length"
            @edit-item-click="onEditItemClick"
        />
        <RewardEditingDialog v-model:visible="visibleEditDialog" />
    </div>
</template>
<script setup lang="ts">
import RewardList from '@/components/projectEditing/rewards/RewardList.vue';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import RewardEditingDialog from './RewardEditingDialog.vue';
import { EditableReward } from '@/models/EditableReward';

const projectEditingStore = useProjectEditingStore();
const { rewardList, editableReward } = storeToRefs(projectEditingStore);
const route = useRoute();
const visibleEditDialog = ref<boolean>(false);

projectEditingStore.loadRewardListByProjectId(Number(route.params.id));

function openCreateForm() {
    visibleEditDialog.value = true;
    editableReward.value = new EditableReward();
}
function onEditItemClick(rewardId: number) {
    visibleEditDialog.value = true;
    const reward = rewardList.value.find((item) => (item.id = rewardId));
    editableReward.value = new EditableReward(reward);
}
</script>
<style scoped>
.title {
    text-align: center;
    font-size: xx-large;
}
.subtitle {
    text-align: center;
    font-size: large;
}
</style>
