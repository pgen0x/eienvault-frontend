import { ethers } from 'ethers';
import { getEthersProvider } from './provider';
import { getEthersSigner } from './signer';
import abi from './Artifacts/NFT';
import nftBytecode from '@/hooks/eth/Artifacts/NFT_Bytecode';

const provider = getEthersProvider();
let NFTToken;

const getNFT = async (_contractAddress) => {
  try {
    const token = new ethers.Contract(_contractAddress, abi, provider);
    NFTToken = token;
    return token;
  } catch (err) {
    console.log(err);
  }
};

const mints = async (_user, tokenURI, _royalties) => {
  try {
    const signer = getEthersSigner(); //ethers.getSigners();;
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
    const signer = provider.getSigner();
    const tx = await NFTToken.connect(signer).royaltyInfo(_tokenId, _sellPrice);
    tx.wait();
  } catch (err) {
    console.log(err);
  }
};

const deployNFT = async function (_name, _symbol, _contractURI) {
  if (window.ethereum) {
    const signer = provider.getSigner();
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
