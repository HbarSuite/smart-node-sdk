import { Network } from './network.type';
import { SmartNode } from './smart-node';
let smartNode = new SmartNode();

export const getNetwork = (network: Network) => {
  return smartNode.getNetwork(network);
};

export const getNode = (network: Network) => {
  return smartNode.getNode(network);
};

export const loadLaunchpads = (network: Network) => {
  return smartNode.loadLaunchpads(network);
}; 

export const loadPools = (network: Network) => {
  return smartNode.loadPools(network);
}; 

export const loadPositions = (network: Network, tokenId: string, serialNumbers: Array<string>) => {
  return smartNode.loadPositions(network, tokenId, serialNumbers);
};

export const getAccountInfos = (network: Network, accountId: string) => {
  return smartNode.getAccountInfos(network, accountId);
};

export const getAccountBalance = (network: Network, accountId: string) => {
  return smartNode.getAccountBalance(network, accountId);
};

export const loadTokens = (network: Network) => {
  return smartNode.loadTokens(network);
}; 

export const createPool = (network: Network, pool: any) => {
  return smartNode.createPool(network, pool);
}; 

export const calculatePoolPrice = (network: Network, amount: number, baseTokenId: string, swapTokenId: string) => {
  return smartNode.calculatePoolPrice(network, amount, baseTokenId, swapTokenId);
};