import Footer from '@/components/footer/main';
import { notFound } from 'next/navigation';
import NFTDetails from './details';
import { useAccount } from 'wagmi';

export default async function Page({ params }) {
  let dataNFTs = [];
  if (dataNFTs.length <= 0) {
    notFound();
  }

  return (
    <>
      <NFTDetails collectionAddress={collectionAddress} tokenId={tokenId} />
      <Footer />
    </>
  );
}
