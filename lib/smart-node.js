"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartNode = void 0;
const axios_1 = __importDefault(require("axios"));
class SmartNode {
    constructor() {
        this.nodes = {
            mainnet: [
                {
                    "operator": "0.0.1027975",
                    "publicKey": "302a300506032b657003210061b21f8a50b8e95a2597517bbd6e230e62328862c117c56a1b3e94e178186e69",
                    "url": "https://mainnet-sn1.hbarsuite.network"
                },
                {
                    "operator": "0.0.1027976",
                    "publicKey": "302a300506032b6570032100669c63617353f5181af0455e79c22688a0c7f69db169f7958c03bcab0dab8d97",
                    "url": "https://mainnet-sn2.hbarsuite.network"
                },
                {
                    "operator": "0.0.1027978",
                    "publicKey": "302a300506032b65700321004a83f50907014c41b6e297a67fe4351c232822d6660e5470f0da912362d46164",
                    "url": "https://mainnet-sn3.hbarsuite.network"
                },
                {
                    "operator": "0.0.1027979",
                    "publicKey": "302a300506032b6570032100efc5eed0ba886f711c261ffd816aef05d70bc5c894037fc3ae0b354e26a243f6",
                    "url": "https://mainnet-sn4.hbarsuite.network"
                }
            ],
            testnet: [
                {
                    "operator": "0.0.34754823",
                    "publicKey": "302a300506032b6570032100326271f17a2ddce3ba55abc4d157783157d59e05c3b271f464b53ff22450aa57",
                    "url": "https://testnet-sn1.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754827",
                    "publicKey": "302a300506032b6570032100c86ea8a5aee8538c2c25c6cd66e91790c9c7b05614210ee3687b895697801956",
                    "url": "https://testnet-sn2.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754830",
                    "publicKey": "302a300506032b65700321009f898d1c0a80847542080aab6a7fcf3480281cf772c5f274a445cd7bd0b5a0ba",
                    "url": "https://testnet-sn3.hbarsuite.network"
                },
                {
                    "operator": "0.0.34754833",
                    "publicKey": "302a300506032b65700321004b62d79fa8a48cdfec1eadf720414cafd9565496bc4493fa3bbba040e11a3cc2",
                    "url": "https://testnet-sn4.hbarsuite.network"
                }
            ],
            local: [
                {
                    "operator": "0.0.34754823",
                    "publicKey": "302a300506032b6570032100326271f17a2ddce3ba55abc4d157783157d59e05c3b271f464b53ff22450aa57",
                    "url": "http://localhost:3001"
                },
                {
                    "operator": "0.0.34754827",
                    "publicKey": "302a300506032b6570032100c86ea8a5aee8538c2c25c6cd66e91790c9c7b05614210ee3687b895697801956",
                    "url": "http://localhost:3002"
                },
                {
                    "operator": "0.0.34754830",
                    "publicKey": "302a300506032b65700321009f898d1c0a80847542080aab6a7fcf3480281cf772c5f274a445cd7bd0b5a0ba",
                    "url": "http://localhost:3003"
                },
                {
                    "operator": "0.0.34754833",
                    "publicKey": "302a300506032b65700321004b62d79fa8a48cdfec1eadf720414cafd9565496bc4493fa3bbba040e11a3cc2",
                    "url": "http://localhost:3004"
                }
            ]
        };
    }
    getNetwork(network) {
        return this.nodes[network].map((x) => x);
        ;
    }
    getNode(network) {
        return this.nodes[network][Math.floor(Math.random() * this.nodes[network].length)];
    }
    loadLaunchpads(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/tokens/launchpad`);
                    response.data.forEach((data) => {
                        data.image = `${node.url}/${data.image}`;
                    });
                    resolve({
                        function: 'loadLaunchpads',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    loadPositions(network, tokenId, serialNumbers) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/pools/positions`, { params: {
                            tokenId: tokenId,
                            serialNumbers: serialNumbers
                        } });
                    resolve({
                        function: 'loadPositions',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    loadPools(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/pools/list`);
                    resolve({
                        function: 'loadPools',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    createPool(network, pool) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.post(`${node.url}/pools/create`, pool, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    resolve({
                        function: 'createPool',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getAccountInfos(network, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/holders/info?accountId=${accountId}`);
                    resolve({
                        function: 'getAccountInfos',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    getAccountBalance(network, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/holders/balance?accountId=${accountId}`);
                    resolve({
                        function: 'getAccountInfos',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    loadTokens(network) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/tokens/list`);
                    response.data.forEach((data) => {
                        data.image = `${node.url}/${data.image}`;
                    });
                    resolve({
                        function: 'loadTokens',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    calculatePoolPrice(network, amount, baseTokenId, swapTokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let node = this.getNode(network);
                    let response = yield axios_1.default.get(`${node.url}/pools/price?amount=${amount}&baseToken=${baseTokenId}&swapToken=${swapTokenId}`);
                    resolve({
                        function: 'calculatePoolPrice',
                        node: node,
                        data: response.data
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
}
exports.SmartNode = SmartNode;
