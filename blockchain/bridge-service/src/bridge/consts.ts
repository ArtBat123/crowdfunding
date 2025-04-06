export const ETHEREUM_BRIDGE_ADDRESS =
    '0xb69904a829f41366f0335037C91C7000E198A450';
export const TRON_BRIDGE_ADDRESS = 'TVYjyTxMRBMuugyGjtkiAfJMEYSxUXNai2';

export const ETHEREUM_USDT_ADDRESS =
    '0x419Fe9f14Ff3aA22e46ff1d03a73EdF3b70A62ED';
export const TRON_USDT_ADDRESS = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf';

export const ETHEREUM_BRIDGE_ABI = [
    'event TokensLockedForContribute(address indexed sender, uint8 projectId, uint256 amount)',
    'function contributeCrowdfunding(address crowdfundingContract, uint8 projectId, uint256 amount) external',
    'function lockTokensForContribute(uint8 projectId, uint256 amount) external',
    'function balance() public view returns (uint256)',
];
export const TRON_BRIDGE_ABI = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'sender', type: 'address' },
            { indexed: false, name: 'projectId', type: 'uint8' },
            { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'TokensLockedForContribute',
        type: 'event',
    },
    {
        inputs: [
            { name: 'crowdfundingContract', type: 'address' },
            { name: 'projectId', type: 'uint8' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'contributeCrowdfunding',
        stateMutability: 'Nonpayable',
        type: 'Function',
    },
    {
        inputs: [
            { name: 'projectId', type: 'uint8' },
            { name: 'amount', type: 'uint256' },
        ],
        name: 'lockTokensForContribute',
        stateMutability: 'Nonpayable',
        type: 'Function',
    },
];

export const ETHEREUM_USDT_ABI = [
    'function approve(address spender, uint256 value) external returns (bool)',
];
export const TRON_USDT_ABI = [
    {
        outputs: [{ type: 'uint256' }],
        constant: true,
        inputs: [{ name: 'who', type: 'address' }],
        name: 'balanceOf',
        stateMutability: 'View',
        type: 'Function',
    },
    {
        outputs: [{ type: 'bool' }],
        inputs: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'transfer',
        stateMutability: 'Nonpayable',
        type: 'Function',
    },
];
