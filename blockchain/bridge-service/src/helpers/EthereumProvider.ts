import { ethers } from 'ethers';

export const EthereumProvider = new ethers.providers.JsonRpcProvider(
    process.env.ETHEREUM_PROVIDER_URL,
);
