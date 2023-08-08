import { ethers } from 'ethers';
import { getEthersProvider } from './provider';
import { getEthersSigner } from './signer';
import abi from './Artifacts/NFT'

const provider = getEthersProvider();
let NFTToken;

const getNFT = async (_contractAddress) => {
  try{
    const token = new ethers.Contract(
      _contractAddress, 
      abi, 
      provider
    );
    NFTToken = token;
    return token;
  } catch (err) {
    console.log(err);
  }
}

const mints = async (_user, tokenURI, _royalties) => {
    try {
        const signer = getEthersSigner(); //ethers.getSigners();;
        const data = await nFT.mint.staticCall(_user, tokenURI, _royalties);
        const tx = await NFTToken.connect(signer) 
            .mint(_user, tokenURI, _royalties);
        tx.wait();
        return data;
    } catch (err) {
        console.log(err);
    }
}

const royaltyInfoS = async (_tokenId, _sellPrice) => {
    try {
        const signer = provider.getSigner();
        const tx = await NFTToken.connect(signer) 
            .royaltyInfo(_tokenId, _sellPrice);
        tx.wait();
    } catch (err) {
        console.log(err);
    }
}




export {
    getNFT,
    mints,
    royaltyInfoS
};
