import api from '@/api/api';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBlockchainStore = defineStore('blockchain', () => {
    const ethExchangeRate = ref<number>();

    async function loadEthExchangeRate() {
        const response = await api.blockchain.getEthExchangeRate();
        ethExchangeRate.value = response.ethereum.rub;
    }

    async function loadUsdtExchangeRate() {
        const response = await api.blockchain.getUsdtExchangeRate();
        ethExchangeRate.value = response.usd.rub;
    }

    function ethToRubles(eth = 0) {
        return ethExchangeRate.value ? Math.round(eth * ethExchangeRate.value) : null;
    }

    return { ethExchangeRate, loadEthExchangeRate, loadUsdtExchangeRate, ethToRubles };
});
