// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import Line from '@/assets/icon/line';
import Awan from '@/assets/icon/awan';
import Awan2 from '@/assets/icon/awan2';
import { Slideshow, SlideshowMobile } from '../slideshow';
import { useAccount, useWalletClient } from 'wagmi';
import { useAuth } from '@/hooks/AuthContext';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import Image from 'next/image';

const Auction = () => {
  const { token } = useAuth();
  const { address } = useAccount();
  const [auctions, setAuctions] = useState([]);
  const [isErrorAuctions, setErrorAuctions] = useState(false);
  const [refreshMetada, setRefreshMetadata] = useState();

  const { data: walletClient } = useWalletClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/marketauction`,
          {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          setErrorAuctions(true);
          console.error('Fetch failed:', res);
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();

        setAuctions(responseData);
      } catch (error) {
        setErrorAuctions(true);
        console.error('Fetch failed:', error);
      } finally {
        setErrorAuctions(false); // Set isLoading to false after fetching data
      }
    };

    fetchData();
  }, [token, address, refreshMetada]);

  const placeBid = async (marketId, price) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'makeAnOfferNative',
        args: [marketId, price],
        account: address,
        value: price,
      });
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  async function refreshMetadata(collectionAddress, tokenId) {
    const bodyData = {
      collectionAddress,
      tokenId,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/refreshmetadata`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify(bodyData),
        },
      );

      if (!res.ok) {
        console.error('Refresh metadata failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();

      setRefreshMetadata(true);
    } catch (error) {
      console.log(error);
      throw new Error('Refresh metadata failed:');
    }
  }

  return (
    <>
      <section className="relative -top-24 flex h-auto w-full items-center justify-center bg-[url('/images/hero-section-background.png')] bg-cover bg-bottom md:h-[600px]">
        <div className="absolute bottom-28 right-[12%] h-[532px] w-[532px] translate-y-1/3 items-center justify-center rounded-full bg-red-400" />
        <div className="absolute right-[2vw] top-32">
          <Image
            width={398}
            height={121}
            objectFit="cover"
            src="/images/cloud-hero-1.png"
            className="h-full"
            alt="cloud-hero"
          />
        </div>
        <div className="absolute bottom-20 right-[45vw]">
          <Image
            width={500}
            height={151}
            objectFit="cover"
            src="/images/cloud-hero-3.png"
            className="h-full"
            alt="cloud-hero"
          />
        </div>
        <div className="absolute bottom-60 left-0 -translate-x-16 translate-y-4">
          <Image
            width={270}
            height={76}
            objectFit="cover"
            src="/images/cloud-hero-2.png"
            className="h-full"
            alt="cloud-hero"
          />
        </div>
        <div className="container m-auto">
          <div className="md: relative mb-5 hidden w-full flex-initial items-center justify-center pt-24 sm:hidden md:flex lg:flex lg:pt-10 xl:flex 2xl:flex">
            <Slideshow
              auctions={auctions}
              placeBid={placeBid}
              refreshMetadata={refreshMetadata}
            />
          </div>
          <div className="relative mb-5 flex w-full flex-initial items-center justify-center sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
            <SlideshowMobile
              auctions={auctions}
              placeBid={placeBid}
              refreshMetadata={refreshMetadata}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Auction;
