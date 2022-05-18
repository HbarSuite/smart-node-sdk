"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePoolPrice = exports.createPool = exports.loadTokens = exports.getAccountBalance = exports.getAccountInfos = exports.loadPools = exports.loadLaunchpads = exports.getNode = exports.getNetwork = void 0;
const smart_node_1 = require("./smart-node");
let smartNode = new smart_node_1.SmartNode();
const getNetwork = (network) => {
    return smartNode.getNetwork(network);
};
exports.getNetwork = getNetwork;
const getNode = (network) => {
    return smartNode.getNode(network);
};
exports.getNode = getNode;
const loadLaunchpads = (network) => {
    return smartNode.loadLaunchpads(network);
};
exports.loadLaunchpads = loadLaunchpads;
const loadPools = (network) => {
    return smartNode.loadPools(network);
};
exports.loadPools = loadPools;
const getAccountInfos = (network, accountId) => {
    return smartNode.getAccountInfos(network, accountId);
};
exports.getAccountInfos = getAccountInfos;
const getAccountBalance = (network, accountId) => {
    return smartNode.getAccountBalance(network, accountId);
};
exports.getAccountBalance = getAccountBalance;
const loadTokens = (network) => {
    return smartNode.loadTokens(network);
};
exports.loadTokens = loadTokens;
const createPool = (network, pool) => {
    return smartNode.createPool(network, pool);
};
exports.createPool = createPool;
const calculatePoolPrice = (network, amount, baseTokenId, swapTokenId) => {
    return smartNode.calculatePoolPrice(network, amount, baseTokenId, swapTokenId);
};
exports.calculatePoolPrice = calculatePoolPrice;
