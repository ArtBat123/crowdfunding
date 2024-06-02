import { useAppSettingsStore } from '@/stores/appSettings';
import { useLayoutStore } from '@/stores/layout';
import type { Interface, InterfaceAbi } from 'ethers';
import { Contract } from 'ethers';
import { ethers, parseEther } from 'ethers';
import { storeToRefs } from 'pinia';

export function useMetaMask() {
    const { contractAddress } = storeToRefs(useAppSettingsStore());

    async function sendPaymentToContract(
        eth: number,
        abi: Interface | InterfaceAbi,
        abiParams: any[]
    ) {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const crowdfundingContract = new Contract(contractAddress.value, abi, signer);
            const priceInWei = parseEther(eth.toString());

            // Выполняем транзакцию
            const tx = await crowdfundingContract.contribute(...abiParams, {
                value: priceInWei,
            });
            await tx.wait();
        } else {
            console.error('MetaMask is not installed');
        }
    }

    return { sendPaymentToContract };
}
