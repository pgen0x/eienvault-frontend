import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { configureChains, createConfig } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useConnect } from 'wagmi';

const helachain = {
  id: 666888,
  name: 'Helachain - Testnet',
  network: 'Helachain',
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
const chains = [helachain, arbitrum, mainnet, polygon, polygonMumbai];
const projectId = process.env.NEXT_PUBLIC_PROJECTID;
const { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);

//Web3Modal Config
export function initializeApp() {
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
    webSocketPublicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return {
    chains,
    projectId,
    publicClient,
    wagmiConfig,
    ethereumClient,
    helachain,
  };
}
