// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import Line from '@/assets/icon/line';
import Awan from '@/assets/icon/awan';
import Awan2 from '@/assets/icon/awan2';
import { Slideshow, SlideshowMobile } from '../slideshow';
import { useAccount, useWalletClient } from 'wagmi';
import { useAuth } from '@/hooks/AuthContext';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';

const Auction = () => {
  const { token } = useAuth();
  const { address } = useAccount();
  const [auctions, setAuctions] = useState([]);
  const [isErrorAuctions, setErrorAuctions] = useState(false);
  const [placeBidHash, setPlaceBidHash] = useState();
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
      setPlaceBidHash(hash);
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
      <section className="relative -top-24 flex w-full items-center justify-center bg-semantic-orange-200">
        <div className="absolute right-0 top-0">
          <Line />
        </div>
        <div className="absolute bottom-28 right-[12%] h-[582px] w-[582px] translate-y-1/3 items-center justify-center rounded-full bg-red-400" />
        <div className="absolute right-[29vw] top-32">
          <Awan />
        </div>
        <div className="absolute bottom-3 right-0 -translate-x-16 translate-y-4">
          <Awan2 />
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
