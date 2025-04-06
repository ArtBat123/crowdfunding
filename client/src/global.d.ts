import type { Tron, TronLink, TronWeb } from '@agrozyme/types-tronweb';
import type { Eip1193Provider } from 'ethers';

declare global {
    interface Window {
        ethereum: Eip1193Provider;
    }
}
declare global {
    interface Window {
        tron?: Tron;
        tronLink?: TronLink;
        tronWeb?: TronWeb;
    }
}
export {};
