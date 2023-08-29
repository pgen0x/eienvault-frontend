import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { configureChains, createConfig } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useAccount, useConnect } from 'wagmi';

//Web3Modal Config
export function initializeApp() {
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
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
  });

  const ethereumClient = new EthereumClient(wagmiConfig, chains);

  return {
    chains,
    projectId,
    publicClient,
    wagmiConfig,
    ethereumClient,
  };
}

//ConnectComponent
export function fetchData() {
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { connector: activeConnector, isConnected, address } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return {
    isOpen,
    open,
    close,
    setDefaultChain,
    connect,
    address,
    connectors,
    error,
    isLoading,
    pendingConnector,
    activeConnector,
    isConnected,
  };
}
