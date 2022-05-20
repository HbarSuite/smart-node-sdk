import { Network } from './network.type';
import { Node } from './node.type';
import axios from 'axios';

export class SmartNode {
  private nodes: {
    testnet: Array<Node>,
    mainnet: Array<Node>,
  } = {
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
    mainnet: []
  };

  constructor() {}

  public getNetwork(network: Network): Array<Node> {
    return this.nodes[network].map((x) => x);;
  }

  public getNode(network: Network): Node {
    return this.nodes[network][Math.floor(Math.random() * this.nodes[network].length)];
  }

  public async loadLaunchpads(network: Network): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/tokens/launchpad`);

        response.data.forEach((data: any) => {
          data.image = `${node.url}/${data.image}`
        });

        resolve({
          function: 'loadLaunchpads',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);        
      }
    });
  }

  public async loadPools(network: Network): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/pools/list`);

        resolve({
          function: 'loadPools',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);        
      }
    });
  }

  public async createPool(network: Network, pool: any): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.post(`${node.url}/pools/create`, pool, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        resolve({
          function: 'createPool',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);
      }
    });
  }

  public async getAccountInfos(network: Network, accountId: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/holders/info?accountId=${accountId}`);

        resolve({
          function: 'getAccountInfos',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);        
      }
    });
  }

  public async getAccountBalance(network: Network, accountId: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/holders/balance?accountId=${accountId}`);

        resolve({
          function: 'getAccountInfos',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);        
      }
    });
  }

  public async loadTokens(network: Network): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/tokens/list`);

        response.data.forEach((data: any) => {
          data.image = `${node.url}/${data.image}`
        });

        resolve({
          function: 'loadTokens',
          node: node,
          data: response.data
        });
      } catch(error) {
        reject(error);        
      }
    });
  }

  public async calculatePoolPrice(network: Network, amount: number, baseTokenId: string, swapTokenId: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/pools/price?amount=${amount}&baseToken=${baseTokenId}&swapToken=${swapTokenId}`);
        
        resolve({
          function: 'calculatePoolPrice',
          node: node,
          data: response.data
        });        
      } catch(error) {
        reject(error);        
      }
    });
  }

}
