import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import {
  arbitrum,
  goerli,
  mainnet,
  polygon,
  polygonMumbai,
} from 'wagmi/chains';
import { configureChains, createConfig, sepolia } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useConnect } from 'wagmi';

const helatestnet = {
  id: 666888,
  name: 'Testnet Helachain',
  network: 'Testnet Helachain',
  nativeCurrency: {
    decimals: 18,
    name: 'Helachain',
    symbol: 'HLUSD',
  },
  rpcUrls: {
    public: { http: ['https://testnet-rpc.helachain.com'] },
    default: { http: ['https://testnet-rpc.helachain.com'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Helachain Explorer',
      url: 'https://testnet-blockexplorer.helachain.com',
    },
    default: {
      name: 'Helachain Explorer',
      url: 'https://testnet-blockexplorer.helachain.com',
    },
  },
};

const helamainnet = {
  id: 8668,
  name: 'Helachain Mainnet',
  network: 'Helachain Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Helachain',
    symbol: 'HLUSD',
  },
  rpcUrls: {
    public: { http: ['https://mainnet-rpc.helachain.com'] },
    default: { http: ['https://mainnet-rpc.helachain.com'] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Helachain Explorer',
      url: 'https://mainnet-blockexplorer.helachain.com',
    },
    default: {
      name: 'Helachain Explorer',
      url: 'https://mainnet-blockexplorer.helachain.com',
    },
  },
};

const chains = [
  helamainnet,
  helatestnet,
  arbitrum,
  mainnet,
  polygon,
  polygonMumbai,
  goerli,
  sepolia,
];
const projectId = process.env.NEXT_PUBLIC_PROJECTID;
const { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
});

//Web3Modal Config
export function initializeApp() {
  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return {
    chains,
    projectId,
    publicClient,
    wagmiConfig,
    ethereumClient,
    helamainnet,
    helatestnet,
  };
}
