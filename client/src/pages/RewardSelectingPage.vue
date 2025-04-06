<template>
    <div class="content-container">
        <h1 class="text-center my-6">{{ currentProject?.title }}</h1>

        <div class="free-support">
            <div class="text-xl mb-2">Поддержать проект без вознаграждения</div>
            <div class="flex">
                <InputNumber
                    v-model="amountInput"
                    suffix=" USDT"
                    class="mr-2 flex-grow-1"
                />
                <Dropdown
                    v-model="selectedChain"
                    :options="options"
                    class="mr-2"
                >
                    <template #value="{ value }">
                        <component
                            :is="value.iconComponent"
                            style="height: 20px; width: 20px; margin: auto"
                        />
                    </template>
                    <template #option="{ option }">
                        <div class="flex align-items-center gap-2">
                            <component
                                :is="option.iconComponent"
                                style="height: 20px; width: 20px"
                            />
                            <span> {{ option.value }} </span>
                        </div>
                    </template>
                </Dropdown>
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
import EthIcon from '@/components/icons/EthIcon.vue';
import TonIcon from '@/components/icons/TonIcon.vue';
import TronIcon from '@/components/icons/TronIcon.vue';
import RewardCard from '@/components/projectCard/RewardCard.vue';
import { useMetaMask } from '@/composable/metamask';
import { TRON_BRIDGE_ADDRESS } from '@/consts/blockchain';
import { BridgeContract } from '@/helpers/BridgeContract';
import { UsdtContract } from '@/helpers/UsdtContract';
import { useAppSettingsStore } from '@/stores/appSettings';
import { useLayoutStore } from '@/stores/layout';
import { useProjectStore } from '@/stores/project';
import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import Dropdown from 'primevue/dropdown';
import { ref, shallowRef } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const projectStore = useProjectStore();
const { rewardList, currentProject } = storeToRefs(projectStore);
const { isLoading } = storeToRefs(useLayoutStore());
const { sendPaymentToContract } = useMetaMask();
const appSettingsStore = useAppSettingsStore();
const amountInput = ref(0);

const options = [
    { iconComponent: EthIcon, value: 'eth' },
    { iconComponent: TonIcon, value: 'ton' },
    { iconComponent: TronIcon, value: 'tron' },
];
const selectedChain = shallowRef(options[0]);

const projectId = Number(route.params.id);
projectStore.loadProject(projectId);
projectStore.loadProjectRewards(projectId);

async function sendPayment() {
    const projectBlockchain = 'eth';

    const amount = ethers.utils.parseUnits(amountInput.value.toString(), 6).toBigInt();

    if (projectBlockchain === selectedChain.value.value) {
        // Если совпадают блокчейны хранения проекта и отправителя, то идем в смарт-контракт напрямую
        try {
            isLoading.value = true;
            const contractABI = ['function contribute(uint8 _projectId, uint256 amount) external'];
            const usdtContract = await UsdtContract.init('eth');
            const tx = await usdtContract.approve(appSettingsStore.contractAddress, amount);
            await tx.wait();
            await sendPaymentToContract(contractABI, projectId, amount);
        } finally {
            isLoading.value = false;
        }
        return;
    }
    try {
        isLoading.value = true;
        const usdtContract = await UsdtContract.init('tron');
        const bridgeContract = await BridgeContract.init('tron');

        // Разрешаем мосту пользоваться токенами
        let tx = await usdtContract.approve(TRON_BRIDGE_ADDRESS, amount);

        // Блокируем токены и передаем в другую сеть на адрес контракта краудфандинга
        tx = await bridgeContract.lockTokensForContribute(projectId, amount);
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
:deep(.p-dropdown-label) {
    display: flex;
}
</style>
