'use client';
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../../components/footer/main';
import { useAccount, useWaitForTransaction, useWalletClient } from 'wagmi';
import Image from 'next/legacy/image';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faCheck,
  faHourglass,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { formatEther } from 'viem';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { useRouter } from 'next-nprogress-bar';

export default function OrdersPage() {
  const searchParams = useSearchParams();
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('listings');
  const [dataListing, setDataListing] = useState([]);
  const [errorBidandListing, setErrorBidandListing] = useState(false);
  const [dataBidMade, setDataBidMade] = useState([]);
  const [errorBidMade, setErrorBidMade] = useState(false);
  const [dataReceived, setDataReceived] = useState([]);
  const [errorReceived, setErrorReceived] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingBidMade, setIsLoadingBidMade] = useState(true);
  const [isLoadingReceived, setIsLoadingReceived] = useState(true);
  const { token } = useAuth();
  const [removeListingHash, setRemoveListingHash] = useState();
  const [cancelBidHash, setCancelBidHash] = useState();
  const [approveBidHash, setApproveBidHash] = useState();

  const { data: walletClient } = useWalletClient();
  const {
    data: dataHashRemoveListing,
    isError: isErrorRemoveListing,
    isLoadig: isLoadingRemoveListing,
  } = useWaitForTransaction({
    hash: removeListingHash,
  });
  const {
    data: dataHashCancelBid,
    isError: isErrorCancelBid,
    isLoadig: isLoadingCancelBid,
  } = useWaitForTransaction({
    hash: cancelBidHash,
  });
  const {
    data: dataHashApproveBid,
    isError: isErrorApproveBid,
    isLoadig: isLoadingApproveBid,
  } = useWaitForTransaction({
    hash: approveBidHash,
  });

  const removeListing = async (marketId) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'removeListing',
        args: [marketId],
        account: address,
      });
      console.log(hash);
      setRemoveListingHash(hash);
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  const cancelBid = async (marketId) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'cancelMyOffer',
        args: [marketId],
        account: address,
      });
      setCancelBidHash(hash);
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  const approveBid = async (marketId, user) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'acceptOffer',
        args: [marketId, user],
        account: address,
      });
      setApproveBidHash(hash);
      return hash;
    } catch (error) {
      console.error('Error Approve Bid', error);
    }
  };

  const fetchDataListing = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/market/itemsbyuseraddress/${address}`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.status === 404) {
        // Handle 404 response by setting dataListing to an empty array
        setDataListing([]);
      } else if (!res.ok) {
        setErrorBidandListing(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        console.log(responseData);
        setDataListing(responseData);
      }
    } catch (error) {
      setErrorBidandListing(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoading(false);
      setErrorBidandListing(false);
    }
  };

  const fetchDataBidMade = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/mybid`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 404) {
        // Handle 404 response by setting dataListing to an empty array
        setDataBidMade([]);
      } else if (!res.ok) {
        setErrorBidMade(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        console.log(responseData);
        setDataBidMade(responseData.bids);
      }
    } catch (error) {
      setErrorBidMade(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingBidMade(false);
      setErrorBidMade(false);
    }
  };

  const fetchDataBidReceived = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/bidreceived`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 404) {
        // Handle 404 response by setting dataListing to an empty array
        setDataReceived([]);
      } else if (!res.ok) {
        setErrorReceived(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        setDataReceived(responseData);
      }
    } catch (error) {
      setErrorReceived(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingReceived(false);
      setErrorReceived(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchDataListing();
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      fetchDataBidMade();
    }
  }, [address, token]);

  useEffect(() => {
    if (address) {
      fetchDataBidReceived();
    }
  }, [address, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (removeListingHash) {
        if (isErrorRemoveListing) {
          setErrorBidMade(true);
        }

        if (dataHashRemoveListing) {
          await fetchDataListing();
        }
      }
    };

    fetchData();
  }, [
    removeListingHash,
    dataHashRemoveListing,
    isErrorRemoveListing,
    isLoadingRemoveListing,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      if (cancelBidHash) {
        if (isErrorCancelBid) {
          setErrorBidandListing(true);
        }

        if (dataHashCancelBid) {
          await fetchDataBidMade();
        }
      }
    };

    fetchData();
  }, [cancelBidHash, dataHashCancelBid, isErrorCancelBid, isLoadingCancelBid]);

  useEffect(() => {
    const fetchData = async () => {
      if (approveBidHash) {
        if (isErrorApproveBid) {
          setErrorReceived(true);
        }

        if (dataHashApproveBid) {
          await fetchDataBidReceived();
        }
      }
    };

    fetchData();
  }, [
    approveBidHash,
    dataHashApproveBid,
    isErrorApproveBid,
    isLoadingApproveBid,
  ]);

  useEffect(() => {
    if (searchParams.get('page') === 'bidmade') {
      setActiveTab('made');
    } else if (searchParams.get('page') === 'listings') {
      setActiveTab('listings');
    } else if (searchParams.get('page') === 'bidreceived') {
      setActiveTab('received');
    }
  }, [searchParams]);

  return (
    <>
      <div className="container m-auto min-h-screen p-3 text-gray-900">
        <section>
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
              <ul className="flex flex-row gap-2 text-xl sm:flex-row md:flex-col lg:flex-col xl:flex-col 2xl:flex-col">
                <li className={activeTab == 'listings' ? 'font-semibold' : ''}>
                  <button onClick={() => setActiveTab('listings')}>
                    Listings
                  </button>
                </li>
                <li className={activeTab == 'made' ? 'font-semibold' : ''}>
                  <button onClick={() => setActiveTab('made')}>
                    Bids made
                  </button>
                </li>
                <li className={activeTab == 'received' ? 'font-semibold' : ''}>
                  <button onClick={() => setActiveTab('received')}>
                    Bids received
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-span-12 sm:col-span-8 md:col-span-10 lg:col-span-10 xl:col-span-10 2xl:col-span-10">
              {activeTab == 'listings' && (
                <Listings
                  dataListing={dataListing}
                  isLoading={isLoading}
                  removeListing={removeListing}
                />
              )}
              {activeTab == 'made' && (
                <Made
                  dataBidMade={dataBidMade}
                  isLoadingBidMade={isLoadingBidMade}
                  cancelBid={cancelBid}
                />
              )}
              {activeTab == 'received' && (
                <Received
                  isLoadingReceived={isLoadingReceived}
                  dataReceived={dataReceived}
                  approveBid={approveBid}
                />
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

const Listings = ({ dataListing, isLoading, removeListing }) => {
  const router = useRouter();
  const currentDate = moment();
  console.log('dataListing', dataListing);

  return (
    <>
      <div className="min-h-full w-full ">
        <div className="flex h-full w-full flex-col items-start justify-start gap-2 ">
          <div className="hidden w-full items-start justify-start self-stretch rounded-xl bg-primary-500 py-2 lg:inline-flex">
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Item{' '}
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Price{' '}
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Is Auction?
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Expiration
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Action
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-100 p-3">
          {isLoading ? (
            <div className="flex h-full w-full flex-col items-start justify-start gap-2">
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
            </div>
          ) : dataListing.length > 0 ? (
            dataListing.map((data, index) => {
              const endDate = moment.unix(data.endDate); // Convert the end date from Unix timestamp
              const timeDifference = endDate.diff(currentDate);
              const isEndDateInFuture = timeDifference > 0;
              return (
                <div className="m-2" key={index}>
                  <div
                    className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl bg-white p-2 lg:inline-flex"
                    key={index}
                  >
                    <div className="flex shrink grow basis-0 items-center justify-center text-center text-base font-bold leading-loose">
                      <div
                        className="inline-flex h-14 w-48 cursor-pointer items-center justify-center gap-4"
                        onClick={() =>
                          router.push(
                            `/nft/${data.collectionData?.tokenAddress}/${data.tokenId}`,
                          )
                        }
                      >
                        <div className="inline-flex h-14 w-12 flex-col items-center justify-center">
                          <div className="h-12 w-12 rounded-full bg-gray-300">
                            <Image
                              className="w-full rounded-2xl bg-white object-cover lg:w-96"
                              width={48}
                              height={48}
                              placeholder="blur"
                              blurDataURL={data.nftDetails?.imageUri}
                              src={data.nftDetails?.imageUri}
                              alt={data.nftDetails?.name}
                            />
                          </div>
                        </div>
                        <div className="text-md shrink grow basis-0 font-medium leading-loose">
                          {data.nftDetails?.name} #{data.tokenId}
                        </div>
                      </div>
                    </div>
                    <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                      {formatEther(data.price)}{' '}
                      {data.collectionData.Chain.symbol}
                    </div>
                    <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                      {data?.isAuctioned ? 'Yes' : 'No'}
                    </div>
                    <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                      {data?.isAuctioned && isEndDateInFuture
                        ? moment
                            .unix(data?.endDate)
                            .format('Do MMM YYYY, h:mm:ss A')
                        : '-'}
                    </div>

                    <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                      <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                        <button
                          onClick={() => removeListing(data.marketId)}
                          className="flex h-8 shrink grow basis-0 items-center justify-center gap-2 rounded-3xl px-4 py-2 hover:bg-primary-200 hover:text-primary-200"
                        >
                          <div className="h-4 w-4 text-center text-base font-black leading-none text-primary-500">
                            <FontAwesomeIcon icon={faXmark} />
                          </div>
                          <span className="text-base font-bold leading-normal text-primary-500">
                            Remove Listing
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="shrink grow basis-0 py-4 text-center text-base font-bold leading-loose">
              Data Not Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Made = ({ dataBidMade, isLoadingBidMade, cancelBid }) => {
  const currentDate = moment();
  console.log('dataBidMade', dataBidMade);
  return (
    <>
      <div className="min-h-full w-full">
        <div className="flex h-full w-full flex-col items-start justify-start gap-2">
          <div className="hidden w-full items-start justify-start self-stretch rounded-xl bg-primary-500 py-2 lg:inline-flex">
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Item{' '}
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Bid Amount
            </div>

            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Expiration
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Action
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-100 p-3">
          {isLoadingBidMade ? (
            <div className="flex h-full w-full flex-col items-start justify-start gap-2">
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
            </div>
          ) : dataBidMade.length > 0 ? (
            dataBidMade.map((data, index) => {
              const endDate = moment.unix(data?.itemsDetails?.endDate); // Convert the end date from Unix timestamp
              const timeDifference = endDate.diff(currentDate);
              const isEndDateInFuture = timeDifference > 0;
              return (
                <div className="m-2" key={index}>
                  <div
                    className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl bg-white p-2 lg:inline-flex"
                    key={index}
                  >
                    <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                      <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                        <div className="inline-flex h-14 w-12 flex-col py-0.5">
                          <div className="h-12 w-12 rounded-full bg-gray-300">
                            <Image
                              className="w-full rounded-2xl object-cover lg:w-96"
                              width={48}
                              height={48}
                              placeholder="blur"
                              blurDataURL={data.nftDetails?.imageUri}
                              src={data.nftDetails?.imageUri}
                            />
                          </div>
                        </div>
                        <div className="text-md shrink grow basis-0 font-medium leading-loose">
                          {data.nftDetails?.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                      {formatEther(data.BidAmount)} HLUSD
                    </div>

                    <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                      {moment
                        .unix(data?.itemsDetails?.endDate)
                        .format('Do MMM YYYY, h:mm:ss A')}
                    </div>
                    {isEndDateInFuture ? (
                      <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                        <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                          <button
                            onClick={() => cancelBid(data.ItemId)}
                            className="flex h-8 shrink grow basis-0 items-center justify-center gap-2 rounded-3xl px-4 py-2 hover:bg-primary-200 hover:text-primary-200"
                          >
                            <div className="h-4 w-4 text-center text-base font-black leading-none text-primary-500">
                              <FontAwesomeIcon icon={faXmark} />
                            </div>
                            <span className="text-base font-bold leading-normal text-primary-500">
                              Cancel Bid
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                        <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                          <button className="flex h-8 shrink grow basis-0 items-center justify-center gap-2 rounded-3xl bg-primary-500 px-4 py-2 hover:bg-primary-200 hover:text-primary-200">
                            <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                              <FontAwesomeIcon icon={faHourglass} />
                            </div>
                            <span className="text-base font-bold leading-normal text-white">
                              Expired
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="shrink grow basis-0 py-4 text-center text-base font-bold leading-loose">
              Data Not Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const Received = ({ dataReceived, isLoadingReceived, approveBid }) => {
  const currentDate = moment();
  console.log('Received', dataReceived);
  return (
    <>
      <div className="min-h-full w-full">
        <div className="flex h-full w-full flex-col items-start justify-start gap-2">
          <div className="hidden w-full items-start justify-start self-stretch rounded-xl bg-primary-500 py-2 lg:inline-flex">
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Item{' '}
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Bid Amount
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              From
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Expiration
            </div>
            <div className="shrink grow basis-0 text-center text-lg font-bold leading-loose text-white">
              Action
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-lg border border-gray-200 bg-gray-100 p-3">
          {isLoadingReceived ? (
            <div className="flex h-full w-full flex-col items-start justify-start gap-2">
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
              <div className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl py-2 lg:inline-flex">
                <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                  <div className="inline-flex h-14 w-48 items-center justify-center gap-4 px-4">
                    <div className="inline-flex h-14 w-12 flex-col items-center justify-center py-0.5">
                      <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                    </div>
                    <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-xl font-medium leading-loose text-black" />
                  </div>
                </div>
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
                <div className="h-4 shrink grow basis-0 animate-pulse rounded-2xl bg-gray-300 text-center text-base font-bold leading-loose" />
              </div>
            </div>
          ) : dataReceived.length > 0 ? (
            dataReceived.map((data, index) => {
              const endDate = moment.unix(data?.itemsEndDate); // Convert the end date from Unix timestamp
              const timeDifference = endDate.diff(currentDate);
              const isEndDateInFuture = timeDifference > 0;
              return (
                <React.Fragment key={index}>
                  {data.Bids.map((dataBids, indexBids) => (
                    <div className="m-2" key={index}>
                      <div
                        className="hidden w-full items-center justify-start gap-5 self-stretch rounded-xl bg-white p-2 lg:inline-flex"
                        key={indexBids}
                      >
                        <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                          <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                            <div className="inline-flex h-14 w-12 flex-col py-0.5">
                              <div className="h-12 w-12 rounded-full bg-gray-300">
                                <Image
                                  className="w-full rounded-2xl object-cover lg:w-96"
                                  width={48}
                                  height={48}
                                  placeholder="blur"
                                  blurDataURL={data.nftDetails?.imageUri}
                                  src={data.nftDetails?.imageUri}
                                />
                              </div>
                            </div>
                            <div className="text-md shrink grow basis-0 font-medium leading-loose">
                              {data.nftDetails?.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                          {formatEther(dataBids.BidAmount)} HLUSD
                        </div>
                        <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                          {truncateAddress(dataBids.BidderAddress)}
                        </div>
                        <div className="text-md shrink grow basis-0 text-center font-medium leading-loose">
                          {data?.itemsEndDate === '' ? (
                            <span className="rounded-2xl bg-primary-500 px-3 py-2 text-sm font-bold leading-normal text-white">
                              Expired or Closed
                            </span>
                          ) : (
                            moment
                              .unix(data?.itemsEndDate)
                              .format('Do MMM YYYY, h:mm:ss A')
                          )}
                        </div>
                        {isEndDateInFuture ? (
                          <div className="shrink grow basis-0 text-center text-base font-bold leading-loose">
                            <div className="inline-flex h-14 w-48 items-center justify-center gap-4">
                              <button
                                onClick={() =>
                                  approveBid(
                                    data.ItemId,
                                    dataBids.BidderAddress,
                                  )
                                }
                                className="flex h-8 shrink grow basis-0 items-center justify-center gap-2 rounded-3xl px-4 py-2 hover:bg-primary-200 hover:text-primary-200"
                              >
                                <div className="h-4 w-4 text-center text-base font-black leading-none text-primary-500">
                                  <FontAwesomeIcon icon={faCheck} />
                                </div>
                                <span className="text-base font-bold leading-normal text-primary-500">
                                  Approve Bid
                                </span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="shrink grow basis-0 text-center text-base font-bold leading-loose"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              );
            })
          ) : (
            <div className="shrink grow basis-0 py-4 text-center text-base font-bold leading-loose">
              Data Not Found
            </div>
          )}
        </div>
      </div>
    </>
  );
};
