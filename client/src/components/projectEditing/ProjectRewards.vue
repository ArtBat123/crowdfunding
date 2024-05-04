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
        <RewardList v-if="rewardList.length" />
        <Dialog v-model:visible="visibleEditDialog">
            <template #default>
                <RewardEditing />
            </template>
        </Dialog>
    </div>
</template>
<script setup lang="ts">
import RewardList from '@/components/projectEditing/RewardList.vue';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import RewardEditing from './RewardEditing.vue';
import { useRoute } from 'vue-router';

const projectEditingStore = useProjectEditingStore();
const { rewardList } = storeToRefs(projectEditingStore);
const route = useRoute();
const visibleEditDialog = ref<boolean>(false);

projectEditingStore.loadRewardListByProjectId(Number(route.params.id));

function openCreateForm() {
    visibleEditDialog.value = true;
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
