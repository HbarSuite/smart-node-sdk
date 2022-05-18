# HSuite - Smart Node - JS SDK
This is a very basic first release of HSuite Smart Node SDK.
Right now it only works on testnet, but we are committed to improve it quickly, and to add the mainnet network once our smart-node-mainnet will be fully deployed.

## What's Hsuite?
Hsuite is an Hedera based technology, it makes uses of the power of Hedera to run the so called "Smart Nodes", which are a decentralised alternative to Smart Contract for Hedera Hashgraph.

If you want to know more about the project, check out the official links:
[Website](https://www.hsuite.finance/) |
[Docs](https://docs.hsuite.finance/)

follow us on socials:
[Twitter](https://twitter.com/hbarsuite) |
[Discord](https://discord.gg/tHn2BXV5hk)
## Installation
If you use npm, you shall run:
```bash
npm install hsuite-js-sdk
```
instead, if you use yarn:
```bash
yarn add hsuite-js-sdk
```

## Configuration
This SDK is a nodejs wrapper to facilitate the interaction with the Smart Node Network.\
The testnet configuration listed below, mainnet configuration instead will be revealed once the nodes will be audited and the mainnet network will be fully runninng.

```json
{
  "testnet": [
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
  ]
}
```

Every single node of the network acts in a decentralised manner, so you can basically query each node and obtain the same identical response. The SDK is designed to randomly pickup a node of the network every time you run an API call.

We provided a very basic swagger interface as well, which can be found under /api of every node, so for instance you will find the swagger for testnet nodes by following those links:

[Testnet - Smart Node 1 - API](https://testnet-sn1.hbarsuite.network/api)\
[Testnet - Smart Node 2 - API](https://testnet-sn2.hbarsuite.network/api)\
[Testnet - Smart Node 3 - API](https://testnet-sn3.hbarsuite.network/api)\
[Testnet - Smart Node 4 - API](https://testnet-sn4.hbarsuite.network/api)

## Usage
as first, you shall import the functions you need to use:
```js
import { 
  getNetwork,
  getNode,
  loadLaunchpads, 
  loadPools, 
  createPool, 
  loadTokens, 
  calculatePoolPrice,
  getAccountInfos,
  getAccountBalance
} from 'hsuite-js-sdk/lib';
```

once imported, you can simply call the function you need, for example:
```js
try {
  // the network param must be 'mainnet' | 'testnet'
  // remember, testnet is the only working one so far.
  let response = await loadLaunchpads('testnet');
  console.log(response);

  // do your business logic here...
  resolve(response.data);
} catch(error) {
  reject(error);        
}
```

## methods

### getNetwork
the only parameter it takes is 'mainnet' | 'testnet':
```js
let response = await getNetwork('testnet');
```
it returns an array containing all whitelisted nodes for the selected network.

### getNode
the only parameter it takes is 'mainnet' | 'testnet':
```js
let response = await getNode('testnet');
```
it returns an random node to work with from the selected network.
### loadLaunchpads
the only parameter it takes is 'mainnet' | 'testnet':
```js
let response = await loadLaunchpads('testnet');
```
it returns an array containing all the current launchpads:
```js
[
  {
    "environment": "string",
    "tokenId": "string",
    "image": "string",
    "name": "string",
    "symbol": "string",
    "decimals": 0,
    "website": "string",
    "priceBotUrl": "string",
    "price": 0,
    "coingecko_id": "string",
    "staking": [
      "string"
    ],
    "ico": [
      "string"
    ]
  }
]
```
### loadPools
the only parameter it takes is 'mainnet' | 'testnet':
```js
let response = await loadPools('testnet');
```
it returns an array containing all the pools in the DEX:
```js
[
  {
    "environment": "string",
    "created_at": "string",
    "name": "string",
    "walletId": "string",
    "asset": {
      "pair": {
        "baseToken": {
          "id": "string",
          "symbol": "string",
          "ratio": 0,
          "value": 0,
          "amount": 0
        },
        "swapToken": {
          "id": "string",
          "symbol": "string",
          "ratio": 0,
          "value": 0,
          "amount": 0
        }
      },
      "value": 0
    },
    "type": "string",
    "is_running": true,
    "apr": {
      "percentage": 0,
      "token": {
        "id": "string"
      }
    }
  }
```

### loadTokens
the only parameter it takes is 'mainnet' | 'testnet':
```js
let response = await loadTokens('testnet');
```
it returns an array containing all the tokens used by HSuite Network (pools, dex, launchpad, etc)
```js
[
  {
    "environment": "string",
    "tokenId": "string",
    "image": "string",
    "name": "string",
    "symbol": "string",
    "decimals": 0,
    "website": "string",
    "priceBotUrl": "string",
    "price": 0,
    "coingecko_id": "string",
    "staking": [
      "string"
    ],
    "ico": [
      "string"
    ]
  }
]
```
### getAccountInfos
it takes two parameters:\
network => 'mainnet' | 'testnet'\
accountId => the account you want to retrieve the infos from
```js
let response = await getAccountInfos('testnet', accountId);
```
it returns an object containing the info fetched from Hedera:
```js
{
  "balance": "10000 ℏ",
  "accountId": "0.0.1856648",
  "contractAccountId": "00000000000000000000000000000000001c5488",
  "isDeleted": false,
  "proxyAccountId": null,
  "proxyReceived": "0 tℏ",
  "key": "302a300506032b65700321001cdeeb91abe27a08b6df0c5bb24fb24688ea6849f8110f3d1dc9ebd28af153fa",
  "sendRecordThreshold": "0 tℏ",
  "receiveRecordThreshold": "0 tℏ",
  "isReceiverSignatureRequired": false,
  "expirationTime": "1630097728.0",
  "autoRenewPeriod": "[object Object]",
  "accountMemo": "",
  "ownedNfts": "1",
  "maxAutomaticTokenAssociations": "0",
  "aliasKey": null,
  "ledgerId": "testnet"
}
```
### getAccountBalance
it takes two parameters:\
network => 'mainnet' | 'testnet'\
accountId => the account you want to retrieve the balances from
```js
let response = await getAccountBalance('testnet', accountId);
```
it returns an object containing the balances fetched from Hedera:
```js
{
  "tokens": [
    {
      "tokenId": "0.0.34719665",
      "balance": 499498000000,
      "decimals": 4
    },
    {
      "tokenId": "0.0.34719641",
      "balance": 499500000000,
      "decimals": 4
    },
    {
      "tokenId": "0.0.34332104",
      "balance": 1970147901394,
      "decimals": 4
    }
  ],
  "hbars": {
    "_valueInTinybar": "1000000000000"
  }
}
```

### createPool
it takes two parameters:\
network => 'mainnet' | 'testnet'\
pool => an object shaped as follows
```js
let pool = {
  "baseToken": {
    "id": "string"
  },
  "swapToken": {
    "id": "string"
  }
}
```

You can call the method by running:
```js
let response = await createPool('testnet', pool);
```

it returns an object containing the new pool or an error if the pool already exists:
```js
{
  "pool": {
    "environment": "string",
    "created_at": "string",
    "name": "string",
    "walletId": "string",
    "asset": {
      "pair": {
        "baseToken": {
          "id": "string",
          "symbol": "string",
          "ratio": 0,
          "value": 0,
          "amount": 0
        },
        "swapToken": {
          "id": "string",
          "symbol": "string",
          "ratio": 0,
          "value": 0,
          "amount": 0
        }
      },
      "value": 0
    },
    "type": "string",
    "is_running": true,
    "apr": {
      "percentage": 0,
      "token": {
        "id": "string"
      }
    }
  },
  "decimals": {
    "baseToken": 0,
    "swapToken": 0
  }
}
```

### calculatePoolPrice
it takes four parameters:\
network => 'mainnet' | 'testnet'\
amount => the amount you want to swap
baseToken => the id of the token you want to swap
swapToken => the id of the token you want to receive

You can call the method by running:
```js
let response = await calculatePoolPrice('testnet', amount, baseToken, swapToken);
```

it will return a pool (or an array of pools in case routing needs to be applied), with all the details:
```js
{
  "name": "string",
  "ratio": [
    {
      "type": "string",
      "tokenId": "string",
      "tokenSymbol": "string",
      "poolPercentage": 0,
      "poolPrice": 0,
      "poolAmount": 0
    }
  ],
  "payout": {
    "amount": 0,
    "slippage": 0,
    "tokenId": "string",
    "tokenSymbol": "string"
  }
}
```