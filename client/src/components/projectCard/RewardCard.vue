<template>
    <div
        :id="reward.id.toString()"
        :key="reward.id"
        class="reward-card"
    >
        <img
            :src="reward.imageUrl"
            alt="image"
            height="250px"
            width="100%"
            style="object-fit: contain"
        />
        <div class="p-3">
            <div class="flex justify-content-between">
                <div class="text-2xl font-semibold">{{ reward.name }}</div>
                <div class="text-2xl">{{ currencyFormat(reward.price) }}EHT</div>
            </div>
            <div class="text-gray-600">{{ reward.description }}</div>
            <div class="flex justify-content-end">
                <Button
                    label="Оплатить"
                    class="w-15rem mt-3"
                    @click="sendPayment"
                />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useFormatter } from '@/composable/formatter';
import { useMetaMask } from '@/composable/metamask';
import { useLayoutStore } from '@/stores/layout';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
interface Props {
    reward: ProjectReward;
}

const props = defineProps<Props>();

const { loadProject } = useProjectStore();
const { isLoading } = storeToRefs(useLayoutStore());
const { currencyFormat } = useFormatter();
const { sendPaymentToContract } = useMetaMask();

async function sendPayment() {
    try {
        isLoading.value = true;
        const contractABI = ['function contribute(uint8 _projectId) external payable'];
        await sendPaymentToContract(props.reward.price, contractABI, [props.reward.projectId]);
        await loadProject(props.reward.projectId);
    } finally {
        isLoading.value = false;
    }
}
</script>
<style scoped lang="scss">
.reward-card {
    border: 1px solid var(--border-color);
    width: 100%;
    margin-bottom: 50px;
    scroll-margin-block-start: 100px;
}
</style>
