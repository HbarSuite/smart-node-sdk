import { Network } from './network.type';
import { Node } from './node.type';
import axios from 'axios';

export class SmartNode {
  private nodes: {
    testnet: Array<Node>,
    mainnet: Array<Node>,
    local: Array<Node>,
  } = {
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
        let response = await axios.get(`${node.url}/launchpad/list`);

        response.data.forEach((data: any) => {
          data.image = `${node.url}/${data.image}`;

          data.launchpad.forEach((round: any) => {
            round.header = `${node.url}/${round.header}`;
          });
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

  public async loadPositions(network: Network, tokenId: string, serialNumbers: Array<string>): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let node = this.getNode(network);
        let response = await axios.get(`${node.url}/pools/positions`, 
        { params: { 
          tokenId: tokenId,
          serialNumbers: serialNumbers
        } });

        resolve({
          function: 'loadPositions',
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
        let response = await axios.get(`${node.url}/wallets/info?accountId=${accountId}`);

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
        let response = await axios.get(`${node.url}/wallets/balance?accountId=${accountId}`);

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
