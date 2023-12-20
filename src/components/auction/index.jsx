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
import Wave from '@/assets/icon/wave';
import Cloud1 from '@/assets/icon/cloud1';
import Cloud2 from '@/assets/icon/cloud2';
import Cloud3 from '@/assets/icon/cloud3';

const Auction = () => {
  const { token } = useAuth();
  const { address } = useAccount();
  const [auctions, setAuctions] = useState([]);
  const [isErrorAuctions, setErrorAuctions] = useState(false);
  const [refreshMetada, setRefreshMetadata] = useState();

  const { data: walletClient } = useWalletClient();

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
        
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();

      setAuctions(responseData);
    } catch (error) {
      setErrorAuctions(true);
      
    } finally {
      setErrorAuctions(false); // Set isLoading to false after fetching data
    }
  };

  useEffect(() => {
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
        
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();

      setRefreshMetadata(true);
    } catch (error) {
      
      throw new Error('Refresh metadata failed:');
    }
  }

  const refreshData = async () => {
    
    setAuctions([]);
    await fetchData();
  };

  return (
    <>
      <section className="relative -top-24 flex h-auto w-full items-center justify-center bg-gradient-to-t from-[#FFF1D4] via-[#FFF1D4] to-[#FFCFD1] bg-cover bg-bottom dark:from-[#C96E6E] dark:via-[#A68647] dark:to-black/40 md:h-[600px]">
        <div className="absolute bottom-0 w-full text-center">
          <Wave className="fill-primary-500 dark:fill-primary-200" />
        </div>
        <div className="absolute left-0 top-36">
          <Cloud1 className="text-primary-500 dark:text-primary-200" />
        </div>
        <div className="absolute bottom-32 right-[45vw]">
          <Cloud2 className="text-primary-500 dark:text-primary-200" />
        </div>
        <div className="absolute right-[-3vw] top-32 hidden -translate-x-16 translate-y-4 md:block">
          <Cloud3 className="text-primary-500 dark:text-primary-200" />
        </div>
        <div className="absolute bottom-28 right-[12%] h-[532px] w-[532px] translate-y-1/3 items-center justify-center rounded-full bg-red-400 dark:bg-semantic-orange-400" />

        <div className="container m-auto">
          <div className="relative mb-5 hidden w-full flex-initial items-center justify-center pt-24 sm:hidden md:flex lg:flex lg:pt-10 xl:flex 2xl:flex">
            <Slideshow
              auctions={auctions}
              placeBid={placeBid}
              refreshMetadata={refreshMetadata}
              refreshData={refreshData}
            />
          </div>
          <div className="relative mb-5 flex w-full flex-initial items-center justify-center sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden">
            <SlideshowMobile
              auctions={auctions}
              placeBid={placeBid}
              refreshMetadata={refreshMetadata}
              refreshData={refreshData}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Auction;
