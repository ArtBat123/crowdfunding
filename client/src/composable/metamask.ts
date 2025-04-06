import { useAppSettingsStore } from '@/stores/appSettings';
import { ethers, type ContractInterface } from 'ethers';
import { storeToRefs } from 'pinia';

export function useMetaMask() {
    const { contractAddress } = storeToRefs(useAppSettingsStore());

    async function sendPaymentToContract(
        abi: ContractInterface,
        projectId: number,
        amount: bigint
    ) {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send('eth_requestAccounts', []);

            const signer = provider.getSigner();
            console.log(contractAddress.value, projectId, amount);
            console.log(abi);
            const crowdfundingContract = new ethers.Contract(contractAddress.value, abi, signer);

            // Выполняем транзакцию
            const tx = await crowdfundingContract.contribute(projectId, amount);
            await tx.wait();
        } else {
            console.error('MetaMask is not installed');
        }
    }

    return { sendPaymentToContract };
}
