import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { arbitrum, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { configureChains, createConfig } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect } from 'wagmi'

//Web3Modal Config
export function initializeApp() {
    const chains = [arbitrum, mainnet, polygon, polygonMumbai];
    const projectId = '105cfd88ab227367c60a8c02319df236';
    const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
    const wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ projectId, chains }),
      publicClient
    });
  
    const ethereumClient = new EthereumClient(wagmiConfig, chains);
  
    return {
      chains,
      projectId,
      publicClient,
      wagmiConfig,
      ethereumClient
    };
}

//ConnectComponent
export function fetchData() {
    const { isOpen, open, close, setDefaultChain,   } = useWeb3Modal();
    const { connector: activeConnector, isConnected } = useAccount();
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  
    return {
      isOpen,
      open,
      close,
      setDefaultChain,
      connect,
      connectors,
      error,
      isLoading,
      pendingConnector,
      activeConnector, 
      isConnected
    };

}
