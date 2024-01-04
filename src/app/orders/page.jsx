'use client';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonSecondary from '@/components/button/buttonSecondary';
import { useAuth } from '@/hooks/AuthContext';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { truncateAddress } from '@/utils/truncateAddress';
import {
  faCheck,
  faGavel,
  faTags,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/legacy/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, formatUnits, zeroAddress } from 'viem';
import {
  useAccount,
  useToken,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import Footer from '../../components/footer/main';

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

      setRemoveListingHash(hash);
      toast.success('Bid successfully removed');
      return hash;
    } catch (error) {
      toast.error(error);
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
      toast.success('Bid successfully canceled');
      return hash;
    } catch (error) {
      toast.error(error);
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
      toast.success('Bid successfully accepted');
      return hash;
    } catch (error) {
      toast.error(error);
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

        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        setDataListing(responseData.nfts);
      }
    } catch (error) {
      setErrorBidandListing(true);
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

        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        setDataBidMade(responseData.bids);
      }
    } catch (error) {
      setErrorBidMade(true);
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

        throw new Error('Network response was not ok');
      } else {
        const responseData = await res.json();
        console.log(responseData);
        setDataReceived(responseData);
      }
    } catch (error) {
      setErrorReceived(true);
    } finally {
      setIsLoadingReceived(false);
      setErrorReceived(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDataListing();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchDataBidMade();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchDataBidReceived();
    }
  }, [token]);

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
      <div className="container m-auto min-h-screen p-3 text-gray-900 dark:text-white">
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

  return (
    <div className="min-h-full w-full ">
      <div className="mt-5 flex flex-col gap-4 rounded-lg bg-white/60 p-3 text-gray-900 dark:bg-neutral-900 dark:text-white">
        {isLoading ? (
          <>
            {[...Array(5)].map((nft, index) => (
              <div
                key={index}
                className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative h-20 w-20 animate-pulse rounded-lg bg-gray-300" />
                    <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300 lg:w-36" />
                  </div>
                  <div className="flex flex-col items-end justify-center gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                    <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 py-2 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                  <div className="flex flex-col items-center justify-start gap-2">
                    <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                    <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                  <div className="flex flex-col items-center justify-start gap-2">
                    <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                    <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="flex w-1/2 items-center justify-center gap-2 rounded-lg px-4 py-2">
                  <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300" />
                </div>
              </div>
            ))}
          </>
        ) : dataListing.length > 0 ? (
          dataListing.map((data, index) => {
            const endDate = moment.unix(data.endDate); // Convert the end date from Unix timestamp
            const timeDifference = endDate.diff(currentDate);
            const isEndDateInFuture = timeDifference > 0;
            return (
              <div
                className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
                key={index}
              >
                <div
                  className="flex w-full cursor-pointer items-center justify-between gap-4"
                  onClick={() =>
                    router.push(
                      `/nft/${data.collectionData?.tokenAddress}/${data.tokenId}`,
                    )
                  }
                >
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-14 w-14">
                      <Image
                        className="w-full rounded-2xl bg-white object-cover lg:w-96"
                        width={54}
                        height={54}
                        placeholder="blur"
                        blurDataURL={data.nftDetails?.imageUri}
                        src={data.nftDetails?.imageUri}
                        alt={data.nftDetails?.name}
                      />
                    </div>
                    <span>
                      {data.nftDetails?.name} #{data.tokenId}
                    </span>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-2">
                    <div className="font-bold">Bid Listings</div>
                    <div>
                      {data.paidWith === zeroAddress
                        ? formatEther(data.price)
                        : formatUnits(data.price, data.paidWith?.decimal)}{' '}
                      {data.paidWith === zeroAddress
                        ? data.collectionData.Chain.symbol
                        : data.paidWith?.symbol}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 py-2 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                  <div className="flex w-full flex-col items-center justify-start gap-2">
                    <span className="font-bold">Expiration</span>
                    <span className="text-center">
                      {data?.isAuctioned && isEndDateInFuture ? (
                        <>
                          {moment.unix(data?.endDate).format('Do MMM YYYY')}
                          <br />
                          {moment.unix(data?.endDate).format('h:mm:ss A')}
                        </>
                      ) : (
                        '-'
                      )}
                    </span>
                  </div>
                  <div className="flex w-full flex-col items-center justify-start gap-2">
                    <span className="font-bold">Status</span>
                    <div className="flex items-center gap-2 text-primary-500 dark:text-white">
                      <FontAwesomeIcon
                        size="xs"
                        icon={data?.isAuctioned ? faGavel : faTags}
                      />
                      <span className="text-xs font-bold">
                        {data?.isAuctioned ? 'Auction' : 'On Sale'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 lg:w-1/2">
                  <ButtonSecondary
                    className="flex !w-fit items-center justify-center gap-2"
                    onClick={() => removeListing(data.marketId)}
                  >
                    <div className="h-4 w-4 text-center text-base font-black leading-none">
                      <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <span className="text-base font-bold leading-normal">
                      Remove Listing
                    </span>
                  </ButtonSecondary>
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
  );
};

const Made = ({ dataBidMade, isLoadingBidMade, cancelBid }) => {
  const currentDate = moment();
  const router = useRouter();

  return (
    <>
      <div className="min-h-full w-full ">
        <div className="mt-5 flex flex-col gap-4 rounded-lg bg-white/60 p-3 text-gray-900 dark:bg-neutral-900 dark:text-white">
          {isLoadingBidMade ? (
            <>
              {[...Array(5)].map((nft, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative h-20 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300 lg:w-36" />
                    </div>
                    <div className="flex flex-col items-end justify-center gap-2">
                      <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 py-2 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                    <div className="flex flex-col items-center justify-start gap-2">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center justify-center gap-2 rounded-lg px-4 py-2">
                    <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
              ))}
            </>
          ) : dataBidMade.length > 0 ? (
            dataBidMade.map((data, index) => {
              const endDate = moment.unix(data.itemsDetails?.endDate); // Convert the end date from Unix timestamp
              const timeDifference = endDate.diff(currentDate);
              const isEndDateInFuture = timeDifference > 0;
              return (
                <div
                  className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
                  key={index}
                >
                  <div
                    className="flex w-full cursor-pointer items-center justify-between gap-4 pr-14"
                    onClick={() =>
                      router.push(`/nft/${data.Collection}/${data.TokenId}`)
                    }
                  >
                    <div className="flex items-center justify-center gap-4">
                      <div className="h-14 w-14">
                        <Image
                          className="w-full rounded-2xl object-cover lg:w-96"
                          width={54}
                          height={54}
                          placeholder="blur"
                          blurDataURL={data.nftDetails?.imageUri}
                          src={data.nftDetails?.imageUri}
                          alt={data.nftDetails?.name}
                        />
                      </div>
                      <span>{data.nftDetails?.name}</span>
                    </div>
                    <div className="flex flex-col items-end justify-center gap-2">
                      <div className="font-bold">Bid Amount</div>
                      <div>
                        {data?.PaidWith === zeroAddress
                          ? formatEther(data.BidAmount)
                          : formatUnits(
                              data.BidAmount,
                              data?.PaidWith?.decimal,
                            )}{' '}
                        {data?.PaidWith === zeroAddress
                          ? 'HLUSD'
                          : data?.PaidWith?.symbol}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 py-2 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                    <div className="flex w-full flex-col items-center justify-start gap-2">
                      <span className="font-bold">Expiration</span>
                      <span className="text-center">
                        {data.itemsDetails?.isAuctioned && isEndDateInFuture ? (
                          <>
                            {moment
                              .unix(data.itemsDetails?.endDate)
                              .format('Do MMM YYYY')}{' '}
                            {moment
                              .unix(data.itemsDetails?.endDate)
                              .format('h:mm:ss A')}
                          </>
                        ) : data.itemsDetails ? (
                          'Auction has ended'
                        ) : (
                          'Item is no longer available'
                        )}
                      </span>
                    </div>
                    <div className="flex w-full flex-col items-center justify-start gap-2">
                      <span className="font-bold">Status</span>
                      {data?.itemsDetails !== null ? (
                        <div className="flex items-center gap-2 text-primary-500">
                          <FontAwesomeIcon
                            size="xs"
                            icon={
                              data?.itemsDetails?.isAuctioned ? faGavel : faTags
                            }
                          />
                          <span className="text-xs font-bold">
                            {data?.itemsDetails?.isAuctioned
                              ? 'Auction'
                              : 'On Sale'}
                          </span>
                        </div>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 lg:w-1/2">
                    <ButtonSecondary
                      onClick={() => cancelBid(data.ItemId)}
                      className="flex !w-fit items-center justify-center gap-2 lg:w-full"
                    >
                      <div className="h-4 w-4 text-center text-base font-black leading-none text-primary-500">
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                      <span className="text-base font-bold leading-normal text-primary-500">
                        Cancel Bid
                      </span>
                    </ButtonSecondary>
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
  const router = useRouter();

  return (
    <>
      <div className="min-h-full w-full">
        <div className="mt-5 flex flex-col gap-4 rounded-lg bg-white/60 p-3 text-gray-900 dark:bg-neutral-900 dark:text-white">
          {isLoadingReceived ? (
            <>
              {[...Array(5)].map((nft, index) => (
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
                >
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative h-20 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300 lg:w-36" />
                    </div>
                    <div className="flex flex-col items-end justify-center gap-2">
                      <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-24 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 py-2 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                    <div className="flex flex-col items-center justify-start gap-2">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                    <div className="flex flex-col items-center justify-start gap-2">
                      <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300" />
                      <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="flex w-1/2 items-center justify-center gap-2 rounded-lg px-4 py-2">
                    <div className="h-6 w-32 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
              ))}
            </>
          ) : dataReceived.length > 0 ? (
            dataReceived.map((data, index) => {
              const endDate = moment.unix(data?.itemsEndDate); // Convert the end date from Unix timestamp
              const timeDifference = endDate.diff(currentDate);
              const isEndDateInFuture = timeDifference > 0;

              return (
                <>
                  <React.Fragment key={index}>
                    {data.Bids.map((dataBids, indexBids) => (
                      <div
                        className="flex w-full flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 dark:bg-neutral-900 lg:flex-row"
                        key={indexBids}
                      >
                        <div
                          className="flex w-full cursor-pointer items-center justify-between gap-4"
                          onClick={() =>
                            router.push(
                              `/nft/${data.Collection}/${data.TokenId}`,
                            )
                          }
                        >
                          <div className="flex items-center justify-center gap-4">
                            <div className="h-14 w-14">
                              <Image
                                className="w-full rounded-2xl object-cover lg:w-96"
                                width={54}
                                height={54}
                                placeholder="blur"
                                blurDataURL={data.nftDetails?.imageUri}
                                src={data.nftDetails?.imageUri}
                                alt={data.nftDetails?.name}
                              />
                            </div>
                            <span>{data.nftDetails?.name}</span>
                          </div>
                          <div className="flex flex-col items-end justify-center gap-2">
                            <div className="font-bold">Bid Amount</div>
                            <div>
                              {data?.PaidWith === zeroAddress
                                ? formatEther(dataBids.BidAmount)
                                : formatUnits(
                                    dataBids.BidAmount,
                                    data?.PaidWith?.decimal,
                                  )}{' '}
                              {data?.PaidWith === zeroAddress
                                ? 'HLUSD'
                                : data?.PaidWith?.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between gap-4">
                          <div className="flex w-full flex-col items-center justify-start gap-2">
                            <span className="font-bold">From</span>
                            <button
                              className="flex items-center gap-2 font-bold text-primary-500 dark:text-white"
                              onClick={() =>
                                router.push(
                                  `/profile/${dataBids.BidderAddress}`,
                                )
                              }
                            >
                              {truncateAddress(dataBids.BidderAddress)}
                            </button>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-around gap-4 rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800 lg:bg-white dark:lg:bg-neutral-900">
                          <div className="flex w-full flex-col items-center justify-start gap-2">
                            <span className="font-bold">Expiration</span>
                            <div className="text-center">
                              {data?.itemsEndDate === '' ? (
                                <ButtonSecondary>
                                  Expired or Closed
                                </ButtonSecondary>
                              ) : (
                                <>
                                  {moment
                                    .unix(data?.itemsEndDate)
                                    .format('Do MMM YYYY')}
                                  <br />
                                  {moment
                                    .unix(data?.itemsEndDate)
                                    .format('h:mm:ss A')}
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex w-full flex-col items-center justify-start gap-2">
                            <span className="font-bold">Status</span>
                            <div className="flex items-center gap-2 text-primary-500 dark:text-white">
                              <FontAwesomeIcon
                                size="xs"
                                icon={data?.isAuctioned ? faGavel : faTags}
                              />
                              <span className="text-xs font-bold">
                                {data?.isAuctioned ? 'Auction' : 'On Sale'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 lg:w-1/2">
                          <ButtonPrimary
                            className="flex !w-fit items-center justify-center gap-2"
                            onClick={() =>
                              approveBid(data.ItemId, dataBids.BidderAddress)
                            }
                          >
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Approve Bid</span>
                          </ButtonPrimary>
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                </>
              );
            })
          ) : (
            <div className="shrink grow basis-0 py-4 text-center text-base font-bold leading-loose">
              You don&apos;t own any of the items being auctioned
            </div>
          )}
        </div>
      </div>
    </>
  );
};
