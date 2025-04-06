import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
const TronWeb = require('tronweb');
import {
    ETHEREUM_BRIDGE_ABI,
    ETHEREUM_BRIDGE_ADDRESS,
    TRON_BRIDGE_ABI,
    TRON_BRIDGE_ADDRESS,
} from './consts';
import {
    TronWeb as TronWebType,
    Contract as TronContract,
} from '@agrozyme/types-tronweb';

@Injectable()
export class BridgeService {
    private ethereumProvider: ethers.providers.WebSocketProvider;
    private ethereumContract: ethers.Contract;

    private tronWeb: TronWebType;
    private tronContract: TronContract & Record<string, any>;

    constructor() {
        const providerURL = 'wss://ethereum-sepolia-rpc.publicnode.com';

        this.ethereumProvider = new ethers.providers.WebSocketProvider(
            providerURL,
        );

        const ethereumWallet = new ethers.Wallet(
            process.env.METAMASK_PRIVATE_KEY,
            this.ethereumProvider,
        );

        this.ethereumContract = new ethers.Contract(
            ETHEREUM_BRIDGE_ADDRESS,
            ETHEREUM_BRIDGE_ABI,
            ethereumWallet,
        );

        this.tronWeb = new TronWeb({
            fullHost: 'https://nile.trongrid.io',
            headers: {
                'TRON-PRO-API-KEY': process.env.NILE_TRONGRID_API_KEY,
            },
            privateKey: process.env.TRONLINK_PRIVATE_KEY,
        });

        this.tronContract = this.tronWeb.contract(
            TRON_BRIDGE_ABI,
            TRON_BRIDGE_ADDRESS,
        );
    }

    onModuleInit() {
        this.listenEthereumBridgeEvents();
        this.listenTronBridgeEvents();
    }

    onModuleDestroy() {
        console.info('Closing WebSocket connection...');
        this.ethereumProvider.removeAllListeners();
        this.ethereumProvider.destroy();
    }

    private listenEthereumBridgeEvents() {
        console.info('listener for Ethereum Bridge init');
        const TRON_CROWDFUNDING_ADDRESS = 'TPJrTLG2heCtbcZSntuSZ1HGXaVH4G6KUR';

        this.ethereumContract.on(
            'TokensLockedForContribute',
            async (sender, projectId, amount) => {
                const txID = await this.tronContract
                    .contributeCrowdfunding(
                        TRON_CROWDFUNDING_ADDRESS,
                        projectId,
                        amount,
                    )
                    .send();
            },
        );
    }

    private async listenTronBridgeEvents() {
        console.info('listener for Tron Bridge init');
        const ETHEREUM_CROWDFUNDING_ADDRESS =
            '0x409E0d2A38C567649F6E87c7D251381cD3C8b169';

        this.tronContract
            .TokensLockedForContribute()
            .watch(async (err, res) => {
                console.log('res=', res);

                let tx = await this.ethereumContract.contributeCrowdfunding(
                    ETHEREUM_CROWDFUNDING_ADDRESS,
                    res.result.projectId,
                    res.result.amount,
                );
                console.log('tx= ', tx);

                tx = await tx.wait();
                console.log('tx= ', tx);
            });
    }
}
