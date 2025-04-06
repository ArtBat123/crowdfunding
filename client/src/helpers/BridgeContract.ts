import {
    ETHEREUM_BRIDGE_ABI,
    ETHEREUM_BRIDGE_ADDRESS,
    SEPOLIA_ID,
    TRON_BRIDGE_ABI,
    TRON_BRIDGE_ADDRESS,
} from '@/consts/blockchain';
import { Contract, ethers } from 'ethers';

export class BridgeContract {
    private address: string;
    private chain: 'eth' | 'tron';
    private contract: any;
    private abi;

    constructor(data: { address: string; chain: 'eth' | 'tron'; contract: any; abi: any }) {
        this.address = data.address;
        this.chain = data.chain;
        this.contract = data.contract;
        this.abi = data.abi;
    }

    static async init(chain: 'eth' | 'tron') {
        let address, abi, contract;
        if (chain === 'eth') {
            const provider = new ethers.providers.Web3Provider(window.ethereum, SEPOLIA_ID);
            await provider.send('eth_requestAccounts', []);
            const signer = provider.getSigner();

            address = ETHEREUM_BRIDGE_ADDRESS;
            abi = ETHEREUM_BRIDGE_ABI;
            contract = new Contract(address, abi, signer);
        } else if (chain === 'tron') {
            address = TRON_BRIDGE_ADDRESS;
            abi = TRON_BRIDGE_ABI;
            contract = window.tronWeb?.contract(abi, address);
        } else {
            throw new Error('Не найдена выбранный блокчейн');
        }

        return new BridgeContract({ abi, address, chain, contract });
    }

    async getBalance(): Promise<bigint> {
        return (await this.contract.balance()).toBigInt();
    }

    async lockTokensForContribute(projectId: number, amount: bigint): Promise<any> {
        if (this.chain === 'eth') {
            return await this.contract.lockTokensForContribute(projectId, amount);
        }
        if (this.chain === 'tron') {
            return await this.contract.lockTokensForContribute(projectId, amount).send();
        }
    }
}
