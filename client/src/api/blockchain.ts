import HttpClient from '@/helpers/HttpClient';

export default {
    async getEthExchangeRate() {
        const response = await HttpClient.get(
            'blockchain/coins/price/ethereum?refundable-currency=rub'
        );
        return response.data;
    },
    async getUsdtExchangeRate() {
        const response = await HttpClient.get(
            'blockchain/coins/price/usd?refundable-currency=rub'
        );
        return response.data;
    },
    async getContractAddress() {
        const response = await HttpClient.get('smart-contract/address');
        return response.data;
    },
};
