import Footer from '@/components/footer/main';
import { notFound } from 'next/navigation';
import NFTDetails from './details';

export default async function Page({ params }) {
  const collectionAddress = params.slug[0];
  const tokenId = params.slug[1];

  if(collectionAddress == "" || collectionAddress == undefined || tokenId == "" || tokenId == undefined){
    notFound();
  }

  return (
    <>
      <NFTDetails collectionAddress={collectionAddress} tokenId={tokenId} />
      <Footer />
    </>
  );
}
