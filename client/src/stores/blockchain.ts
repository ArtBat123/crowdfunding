import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlockchainStore = defineStore('blockchain', () => {
    const ethExchangeRate = ref();

    async function loadEthExchangeRate() {
        const response = await api.blockchain.getEthExchangeRate();
        ethExchangeRate.value = response.ethereum.rub;
    }

    function ethToRubles(eth = 0) {
        return Math.round(eth * ethExchangeRate.value);
    }

    return { ethExchangeRate, loadEthExchangeRate, ethToRubles };
});
