import Footer from '@/components/footer/main';
import { notFound } from 'next/navigation';
import NFTDetails from './details';

export default async function Page({ params }) {
  const collectionAddress = params.slug[0];
  const tokenId = params.slug[1];
  let dataNFTs = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbytokenid/${collectionAddress}/${tokenId}`,
      {
        next: { revalidate: 0 },
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (res.status === 404) {
      dataNFTs = [];
    } else if (!res.ok) {
      console.error('Fetch failed:', res);
    } else {
      const responseData = await res.json();
      dataNFTs = responseData;
    }
  } catch (error) {
    dataNFTs = [];
    console.error('Fetch failed:', error);
  }

  if (dataNFTs.length <= 0) {
    notFound();
  }

  return (
    <>
      <NFTDetails dataNFTs={dataNFTs} />
      <Footer />
    </>
  );
}
