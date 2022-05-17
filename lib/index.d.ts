import { Network } from './network.type';
export declare const getNode: (network: Network) => import("./node.type").Node;
export declare const loadLaunchpads: (network: Network) => Promise<any>;
export declare const loadPools: (network: Network) => Promise<any>;
export declare const getAccountInfos: (network: Network, accountId: string) => Promise<any>;
export declare const getAccountBalance: (network: Network, accountId: string) => Promise<any>;
export declare const loadTokens: (network: Network) => Promise<any>;
export declare const createPool: (network: Network, pool: any) => Promise<any>;
export declare const calculatePoolPrice: (network: Network, amount: number, baseTokenId: string, swapTokenId: string) => Promise<any>;
