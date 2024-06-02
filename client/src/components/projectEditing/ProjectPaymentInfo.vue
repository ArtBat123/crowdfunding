<template>
    <div class="content-container">
        <div class="my-6">
            <h1 class="title">Привяжите свой кошелек к проекту</h1>
            <div class="subtitle">
                <p>
                    Дважды проверьте свою информацию, после создания проекта, эту информацию нельзя
                    изменить
                </p>
            </div>
        </div>
        <div class="flex">
            <div class="text-2xl w-15rem">Email для связи</div>
            <InputText
                v-model="email"
                placeholder="example@gmail.com"
                type="email"
                class="flex-grow-1 ml-4 mb-5"
            />
        </div>
        <div class="flex">
            <div class="text-2xl w-15rem">Адрес кошелька</div>
            <InputText
                v-model="walletAddress"
                readonly
                disabled
                class="flex-grow-1 ml-4"
            />
            <Button
                v-if="!walletAddress"
                label="Привязать кошелек"
                class="ml-3"
                @click="linkWallet"
            />
        </div>
        <div class="w-full flex justify-content-end mt-2">
            <div class="flex flex-column">
                <Button
                    label="Завершить создание проекта"
                    class="mt-4"
                    @click="completeProjectCreation"
                />
                <div class="mt-1 text-gray-500">
                    <span class="pi pi-lightbulb mr-2"></span>
                    <span>За создание проекта необходимо заплатить комиссию сити Ethereum</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import api from '@/api/api';
import { useAppSettingsStore } from '@/stores/appSettings';
import { useProjectEditingStore } from '@/stores/projectEditing';
import { Contract, parseEther } from 'ethers';
import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const email = ref('');
const walletAddress = ref();
const route = useRoute();
const { workingEthereumNetwork, contractAddress } = useAppSettingsStore();
const projectEditingStore = useProjectEditingStore();
const { projectData } = storeToRefs(projectEditingStore);
projectEditingStore.loadProjectById(Number(route.params.id));

walletAddress.value = projectData.value.creatorEthAddress;

async function linkWallet() {
    if (window.ethereum) {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: workingEthereumNetwork.chainId }],
        });
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        walletAddress.value = await signer.getAddress();
    } else {
        console.error('MetaMask is not installed');
        alert('Please install MetaMask!');
    }
}
async function completeProjectCreation() {
    // Запрашиваем доступ к аккаунту пользователя
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Создаем провайдера и подписанта
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    // ABI контракта CrowdfundingPlatform
    const contractABI = [
        'function createProject(uint projectId, uint goal, uint duration) external',
    ];

    // Создаем экземпляр контракта
    const crowdfundingContract = new Contract(contractAddress, contractABI, signer);

    const duration =
        projectData.value.projectDurationType === 'number_days'
            ? projectData.value.numberDays * 24 * 60 * 60
            : (projectData.value.expirationDate - Date.now()) / 1000;
    // Выполняем транзакцию
    const tx = await crowdfundingContract.createProject(
        projectData.value.id,
        parseEther(projectData.value.fundingGoal.toString()),
        duration
    );
    console.log('Transaction sent:', tx.hash);

    // Ожидаем подтверждения транзакции
    const receipt = await tx.wait();
    console.log('Transaction confirmed:', receipt.transactionHash);

    const creatorEthAddress = await signer.getAddress();
    await api.project.updateCreatorEthAddress({
        projectId: projectData.value.id,
        creatorEthAddress,
    });
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
