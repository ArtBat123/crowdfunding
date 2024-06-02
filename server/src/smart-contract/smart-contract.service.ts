import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

const CONTRACT_ADDRESS = '0xcd479158e3cb93b0754c484518023795cb9dee74';
const CONTRACT_ABI = {
    getProjectsFundsRaised:
        'function getProjectsFundsRaised(uint8[] memory projectIdList) external view returns (uint[] memory)',
    getContributionsToProjectCount:
        'function getContributionsToProjectCount(uint8 projectId) external view returns (uint8)',
};
const SEPOLIA_RPC_PROVIDER = 'https://rpc2.sepolia.org'; // 'sepolia'

@Injectable()
export class SmartContractService {
    async getProjectsFundsRaised(projectIdList: number[]) {
        const abi = [CONTRACT_ABI.getProjectsFundsRaised];
        const provider = ethers.getDefaultProvider(SEPOLIA_RPC_PROVIDER);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        return await contract.getProjectsFundsRaised(projectIdList);
    }
    async getContributionsToProjectCount(projectId: number): Promise<number> {
        const abi = [CONTRACT_ABI.getContributionsToProjectCount];
        const provider = ethers.getDefaultProvider(SEPOLIA_RPC_PROVIDER);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

        return await contract.getContributionsToProjectCount(projectId);
    }
    getAddress() {
        return { address: CONTRACT_ADDRESS };
    }
}
