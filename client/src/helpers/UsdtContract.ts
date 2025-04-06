import {
    ETHEREUM_USDT_ABI,
    ETHEREUM_USDT_ADDRESS,
    SEPOLIA_ID,
    TRON_USDT_ABI,
    TRON_USDT_ADDRESS,
} from '@/consts/blockchain';
import { ethers } from 'ethers';

export class UsdtContract {
    private abi: any;
    private chain: 'eth' | 'tron';
    private address: string;
    private contract: any;

    constructor(data: { abi: any; chain: 'eth' | 'tron'; address: string; contract: any }) {
        this.abi = data.abi;
        this.chain = data.chain;
        this.address = data.address;
        this.contract = data.contract;
    }

    static async init(chain: 'eth' | 'tron') {
        let abi, contract, address;
        if (chain === 'eth') {
            const provider = new ethers.providers.Web3Provider(window.ethereum, SEPOLIA_ID);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();
            abi = ETHEREUM_USDT_ABI;
            address = ETHEREUM_USDT_ADDRESS;
            contract = new ethers.Contract(address, abi, signer);
        }
        else if (chain === 'tron') {
            abi = TRON_USDT_ABI;
            address = TRON_USDT_ADDRESS;
            contract = window.tronWeb?.contract(abi, address);
        } else {
            throw new Error('Не найдена выбранный блокчейн');
        }

        return new UsdtContract({ abi, address, chain, contract });
    }

    async approve(spender: string, value: bigint) {
        if (this.chain === 'eth') {
            return await this.contract.approve(spender, value);
        }
        if (this.chain === 'tron') {
            return await this.contract.approve(spender, value).send();
        }
    }
}
