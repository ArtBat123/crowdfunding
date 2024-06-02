<template>
    <div class="content-container">
        <h1 class="text-center my-6">{{ currentProject?.title }}</h1>

        <div class="free-support">
            <div class="text-xl mb-2">Поддержать проект без вознаграждения</div>
            <div class="flex">
                <InputNumber
                    v-model="etr"
                    :min-fraction-digits="0"
                    :max-fraction-digits="10"
                    class="mr-4 flex-grow-1"
                />
                <Button
                    label="Оплатить"
                    class="w-15rem"
                    @click="sendPayment"
                />
            </div>
        </div>
        <RewardCard
            v-for="reward in rewardList"
            :key="reward.id"
            :reward="reward"
        />
    </div>
</template>
<script setup lang="ts">
import RewardCard from '@/components/projectCard/RewardCard.vue';
import { useMetaMask } from '@/composable/metamask';
import { useLayoutStore } from '@/stores/layout';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectStore = useProjectStore();
const { rewardList, currentProject } = storeToRefs(projectStore);
const { isLoading } = storeToRefs(useLayoutStore());
const { sendPaymentToContract } = useMetaMask();
const etr = ref(0);

const projectId = Number(route.params.id);
projectStore.loadProject(projectId);
projectStore.loadProjectRewards(projectId);

async function sendPayment() {
    try {
        isLoading.value = true;
        const contractABI = ['function contribute(uint8 _projectId) external payable'];
        await sendPaymentToContract(etr.value, contractABI, [projectId]);
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped>
.free-support {
    border: 1px solid var(--border-color);
    padding: 30px;
    margin-bottom: 50px;
}
</style>
