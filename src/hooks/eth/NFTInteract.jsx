import { ethers } from 'ethers';
import { useEthersProvider } from './provider';
import { useEthersSigner } from './signer';
import abi from './Artifacts/NFT_Abi';
import nftBytecode from '@/hooks/eth/Artifacts/NFT_Bytecode';

let NFTToken;

const getNFT = async (_contractAddress) => {
  try {
    const token = new ethers.Contract(_contractAddress, abi);
    NFTToken = token;
    return token;
  } catch (err) {
    console.log(err);
  }
};

const mints = async (_user, tokenURI, _royalties) => {
  try {
    const signer = useEthersSigner(); //ethers.getSigners();;
    const data = await nFT.mint.staticCall(_user, tokenURI, _royalties);
    const tx = await NFTToken.connect(signer).mint(_user, tokenURI, _royalties);
    tx.wait();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const royaltyInfoS = async (_tokenId, _sellPrice) => {
  try {
    const signer = useEthersSigner();
    const tx = await NFTToken.connect(signer).royaltyInfo(_tokenId, _sellPrice);
    tx.wait();
  } catch (err) {
    console.log(err);
  }
};

const deployNFT = async function (_name, _symbol, _contractURI) {
  if (window.ethereum) {
    const signer = useEthersSigner();
    try {
      const factory = new ethers.ContractFactory(abi, nftBytecode, signer);
      const contract = await factory.deploy(_name, _symbol, _contractURI);
      await contract.waitForDeployment();
      console.log('NFT Contract deployed at:', await contract.getAddress());
      return await contract.getAddress();
    } catch (error) {
      console.error('Error deploying NFT contract:', error);
    }
  } else {
    console.error('Metamask not found or not connected.');
  }
};

export { getNFT, mints, royaltyInfoS, deployNFT };
