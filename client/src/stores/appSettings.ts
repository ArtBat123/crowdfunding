import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppSettingsStore = defineStore('appSettings', () => {
    const contractAddress = ref();
    const workingEthereumNetwork = {
        chainId: '0xaa36a7',
        chainName: 'eth-sepolia',
        nativeCurrency: {
            name: 'SepoliaETH',
            symbol: 'ETH',
            decimals: 18,
        },
        rpcUrls: ['https://sepolia.infura.io/v3/'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
    };

    async function loadContractAddress() {
        const response = await api.blockchain.getContractAddress();
        contractAddress.value = response.address;
    }
    return { contractAddress, workingEthereumNetwork, loadContractAddress };
});
