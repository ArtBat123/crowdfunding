import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0x409E0d2A38C567649F6E87c7D251381cD3C8b169';
const CONTRACT_ABI = {
    getProjectsFundsRaised:
        'function getProjectsFundsRaised(uint8[] memory projectIdList) external view returns (uint[] memory)',
    getContributionsToProjectCount:
        'function getContributionsToProjectCount(uint8 projectId) external view returns (uint8)',
};

@Injectable()
export class SmartContractService {
    async getProjectsFundsRaised(projectIdList: number[]) {
        const abi = [CONTRACT_ABI.getProjectsFundsRaised];
        const provider = ethers.getDefaultProvider(process.env.SEPOLIA_RPC_PROVIDER_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        const result = await contract.getProjectsFundsRaised(projectIdList);
        return result;
    }
    async getContributionsToProjectCount(projectId: number): Promise<number> {
        const abi = [CONTRACT_ABI.getContributionsToProjectCount];
        const provider = ethers.getDefaultProvider(process.env.SEPOLIA_RPC_PROVIDER_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        const result = await contract.getContributionsToProjectCount(projectId);
        return result;
    }
    getAddress() {
        return { address: CONTRACT_ADDRESS };
    }
}
