<template>
    <div>
        <h1>Заполните награды для спонсоров</h1>
        <div class="flex justify-content-between my-3">
            <p style="max-width: 600px">
                Награды мотивируют спонсоров поддержать ваш проект. В качестве награды можно
                предложить физические предметы или особые впечатления
            </p>
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
