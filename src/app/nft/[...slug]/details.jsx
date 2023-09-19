'use client';
import Footer from '@/components/footer/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCartPlus,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faEllipsisVertical,
  faEye,
  faFingerprint,
  faList,
  faPenToSquare,
  faRotate,
  faUpRightFromSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendar,
  faFlag,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import SlideshowActivities from '@/components/slideshow/activities';
import Castle from '@/assets/icon/castle';
import Castle2 from '@/assets/icon/castle2';
import Awan3 from '@/assets/icon/awan3';
import Awan4 from '@/assets/icon/awan4';
import Flower from '@/assets/icon/flower';
import { useEffect, useState } from 'react';
import Opensea from '@/assets/icon/opensea';
import { Listbox } from '@headlessui/react';
import DatePicker from 'tailwind-datepicker-react';
import { useRouter } from 'next-nprogress-bar';
import { useAccount, useWalletClient } from 'wagmi';
import Image from 'next/legacy/image';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { truncateAddress } from '@/utils/truncateAddress';
import { ImageWithFallback } from '@/components/imagewithfallback';
import HelaIcon from '@/assets/icon/hela';
import { formatEther, parseEther } from 'viem';
const accounts = ['0x30756...Fb179', '0x30756...Zi57G', '0x30756...Gy352'];
import { notFound } from 'next/navigation';
import ModalBid from '@/components/modal/bid';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import ModalBuy from '@/components/modal/buy';
import LiveCountdown from '@/components/slideshow/countdown';
import { useAuth } from '@/hooks/AuthContext';
import { toast } from 'react-toastify';
import RelatedNFTs, {
  RelatedNFTsSkeleton,
} from '@/components/slideshow/relatednfts';
import moment from 'moment';

export default function NFTDetails({ dataNFTs }) {
  const router = useRouter();
  const { address } = useAccount();
  const { token } = useAuth();
  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [countLikes, setCountLikes] = useState(dataNFTs?.likeCount);
  const [dataRelatedNFTs, setDataRelatedNFTs] = useState([]);
  const [isLoadingRelatedNFTs, setIsLoadingRelatedNFTs] = useState(true);
  const [activeTab, setActiveTab] = useState('collateral');
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const { data: walletClient } = useWalletClient();

  const handleModalPropose = () => {
    if (modalPropose) {
      handleStepPropose(1);
      setAgreePropose(false);
      setSelectedAccount(accounts[0]);
    }
    setModalPropose(!modalPropose);
  };

  const renderActiveTab = () => {
    const listTabs = {
      overview: <Overview dataNFTs={dataNFTs} />,
      bids: <Bids dataNFTs={dataNFTs} />,
      history: <History dataNFTs={dataNFTs} />,
      collateral: <Collateral dataNFTs={dataNFTs} />,
    };

    return listTabs[activeTab];
  };

  function getHighestBid(data) {
    if (!data.listOffers || data.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
    }

    let highestBid = BigInt(0);
    let highestBidder = null;

    for (const offer of data.listOffers) {
      const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
      if (bidValue > highestBid) {
        highestBid = bidValue;
        highestBidder = offer.address;
      }
    }

    return {
      message: 'Highest bid found',
      highestBid: highestBid.toString(),
      highestBidder,
    };
  }

  function getLowestBid(auctionData) {
    if (auctionData.listOffers.length === 0) {
      return 0; // Return a message if there are no bids
    }

    let lowestBid = Infinity; // Initialize to a large number

    for (const offer of auctionData.listOffers) {
      const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
      if (bidValue < lowestBid) {
        lowestBid = bidValue;
      }
    }

    return lowestBid.toString(); // Convert the lowestBid back to a string
  }

  const handleOpenModalBid = async (
    marketId,
    listingPrice,
    imageUri,
    tokenId,
    price,
    name,
    collectionData,
    highestBid,
    lowestBid,
  ) => {
    setAcutionData({
      marketId,
      listingPrice,
      imageUri,
      tokenId,
      price,
      name,
      collectionData,
      highestBid,
      lowestBid,
    });
    setisOpenModalBid(true);
  };

  const handleOpenModalBuy = async (
    marketId,
    price,
    imageUri,
    name,
    tokenId,
    ChainSymbol,
    ChainName,
  ) => {
    setBuyData({
      marketId,
      price,
      imageUri,
      name,
      tokenId,
      ChainSymbol,
      ChainName,
    });
    setisOpenModalBuy(true);
  };

  function closeModalBid() {
    setisOpenModalBid(false);
  }

  function closeModalBuy() {
    setisOpenModalBuy(false);
  }

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

  const buyAction = async (marketId, price) => {
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

  const likes = async (collectionAddress, tokenId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/likes/${collectionAddress}/${tokenId}`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
      );

      if (!res.ok) {
        const errorMessage = await res.json();
        toast.error(errorMessage.error.messages);
      } else {
        const responseData = await res.json();
        toast.success(responseData.success.messages);

        setCountLikes(countLikes + 1);
      }
    } catch (error) {
      console.error('error likes:', error);
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
        const errorMessage = await res.json();
        toast.error(errorMessage.error.messages);
      }
      const responseData = await res.json();
      toast.success('Refresh metada successfully');
      window.location.reload();
    } catch (error) {
      console.error('error likes:', error);
    }
  }

  useEffect(() => {
    const getRelatedNFTs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/items?limit=10`,
          {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) {
          setErrorActivities(true);
          console.error('Fetch failed:', res);
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();
        console.log(responseData);
        setDataRelatedNFTs(responseData);
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsLoadingRelatedNFTs(false);
      }
    };

    getRelatedNFTs();
  }, [token, address]);

  const currentDate = moment();

  const endDate = moment.unix(dataNFTs?.itemDetails?.endDate);
  const releaseDate = moment.unix(dataNFTs?.itemDetails?.releaseDate);
  const isNotExpired = endDate.isAfter(currentDate);
  const isNotRelease = currentDate.isBefore(releaseDate);

  return (
    <>
      {/* <section className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <div className="w-full">
          <div className="h-[266px] bg-gray-300 object-cover" />
        </div>
      </section> */}
      <div className="container m-auto mb-5 p-3">
        {dataNFTs ? (
          <section>
            <div className="mt-5 flex w-full flex-col gap-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="flex w-full flex-col gap-4">
                {dataNFTs?.imageUri !== null ? (
                  <Image
                    className="w-full rounded-2xl bg-white object-contain lg:w-96"
                    width={600}
                    height={600}
                    placeholder="blur"
                    blurDataURL={dataNFTs?.imageUri}
                    src={dataNFTs?.imageUri}
                  />
                ) : (
                  <div className="flex h-[600px] w-full  flex-col justify-end rounded-2xl bg-gray-300">
                    <button
                      className="mb-4 inline-flex justify-center gap-2 self-center rounded-full border border-primary-500 bg-transparent px-2 py-2 text-sm font-semibold text-primary-500 hover:border-primary-300 hover:text-primary-300"
                      onClick={() =>
                        refreshMetadata(
                          dataNFTs?.collectionAddress,
                          dataNFTs?.tokenId,
                        )
                      }
                    >
                      Refresh Metadata
                    </button>
                  </div>
                )}
                <div className="relative -mt-16 px-5 sm:-mt-16 md:mt-5 lg:mt-5 xl:mt-5 2xl:mt-5">
                  <div className="flex rounded-lg bg-white/50 px-5 py-2 text-gray-900 backdrop-blur-sm sm:bg-white/50 sm:text-gray-900 md:bg-white md:text-gray-900 lg:bg-white lg:text-primary-500 xl:bg-white xl:text-primary-500 2xl:bg-white 2xl:text-primary-500">
                    <div className="flex w-full justify-between">
                      <div className="flex w-full justify-around">
                        <button
                          className="group text-primary-500 hover:text-primary-300 sm:text-primary-500"
                          onClick={() =>
                            likes(
                              dataNFTs?.collectionAddress,
                              dataNFTs?.tokenId,
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faHeart} />{' '}
                          <span className="2xl-text-black font-semibold group-hover:text-primary-300 md:text-black lg:text-black">
                            {countLikes} likes
                          </span>
                        </button>
                        <button className="group text-primary-500 hover:text-primary-300">
                          <FontAwesomeIcon icon={faShareFromSquare} />{' '}
                          <span className="2xl-text-black font-semibold group-hover:text-primary-300 md:text-black lg:text-black">
                            Share
                          </span>
                        </button>
                        <button className="group text-primary-500 hover:text-primary-300">
                          <FontAwesomeIcon icon={faFlag} />{' '}
                          <span className="2xl-text-black font-semibold group-hover:text-primary-300 md:text-black lg:text-black">
                            Report
                          </span>
                        </button>
                      </div>
                      <button className="hidden rounded-full px-2 text-primary-500 hover:bg-primary-50 hover:text-primary-300 sm:hidden md:block lg:block xl:block 2xl:block">
                        <FontAwesomeIcon icon={faEllipsisVertical} />{' '}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                  <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-primary-500">
                    <li
                      className={`cursor-pointer px-5 pb-3 ${
                        activeTab == 'overview'
                          ? 'border-b-4 border-primary-500'
                          : ''
                      }`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </li>
                    <li
                      className={`cursor-pointer px-5 pb-3 ${
                        activeTab == 'bids'
                          ? 'border-b-4 border-primary-500'
                          : ''
                      }`}
                      onClick={() => setActiveTab('bids')}
                    >
                      Bids
                    </li>
                    <li
                      className={`cursor-pointer px-5 pb-3 ${
                        activeTab == 'history'
                          ? 'border-b-4 border-primary-500'
                          : ''
                      }`}
                      onClick={() => setActiveTab('history')}
                    >
                      History
                    </li>
                    <li
                      className={`cursor-pointer px-5 pb-3 ${
                        activeTab == 'collateral'
                          ? 'border-b-4 border-primary-500'
                          : ''
                      }`}
                      onClick={() => setActiveTab('collateral')}
                    >
                      Collateral
                    </li>
                  </ul>
                  <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                    {renderActiveTab()}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex w-full justify-around gap-4 text-white">
                  {address === dataNFTs?.owner && (
                    <>
                      <button className="w-full rounded-full bg-primary-500 py-2 hover:bg-primary-300">
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit detail
                        item
                      </button>
                      <button className="w-full rounded-full bg-primary-500 py-2 hover:bg-primary-300">
                        <FontAwesomeIcon icon={faList} /> List item
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-5 flex flex-col gap-4 text-gray-900">
                  <h2 className="text-2xl font-bold">
                    {dataNFTs?.name} #{dataNFTs?.tokenId}
                  </h2>
                  <div className="flex w-full justify-around rounded-xl bg-white p-5">
                    <div className="px-5">
                      <h3 className="font-semibold md:text-lg">Creator</h3>
                      <div className="flex">
                        <div className="flex w-fit items-center justify-center gap-2">
                          <ImageWithFallback
                            className="h-full w-full rounded-2xl "
                            width={28}
                            height={28}
                            alt={
                              dataNFTs?.ownerData?.username ||
                              truncateAddress4char(
                                dataNFTs?.ownerData?.walletAddress,
                              ) ||
                              truncateAddress4char(dataNFTs?.owner)
                            }
                            diameter={28}
                            address={
                              dataNFTs?.ownerData?.walletAddress ||
                              dataNFTs?.owner
                            }
                            src={`/uploads/user/${dataNFTs?.collectionData.User?.logo}`}
                          />
                          <div className="text-sm font-medium text-neutral-700">
                            {dataNFTs?.collectionData?.User?.username
                              ? dataNFTs?.collectionData?.User?.username
                              : truncateAddress4char(
                                  dataNFTs?.collectionData?.userAddress,
                                )}
                          </div>

                          {dataNFTs?.collectionData?.User?.isVerified && (
                            <div className="font-black leading-none text-primary-500">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="inline-block w-[1px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                    <div className="px-5">
                      <h3 className="font-semibold md:text-lg">
                        Current Owner
                      </h3>
                      <div className="flex w-fit items-center justify-center gap-2">
                        <ImageWithFallback
                          className="h-full w-full rounded-2xl "
                          width={28}
                          height={28}
                          alt={
                            dataNFTs?.ownerData?.username ||
                            truncateAddress4char(
                              dataNFTs?.ownerData?.walletAddress,
                            ) ||
                            truncateAddress4char(dataNFTs?.owner)
                          }
                          diameter={28}
                          address={
                            dataNFTs?.ownerData?.walletAddress ||
                            dataNFTs?.owner
                          }
                          src={`/uploads/user/${dataNFTs?.ownerData?.logo}`}
                        />
                        <div className="text-sm font-medium text-neutral-700">
                          {dataNFTs?.ownerData?.username ||
                            truncateAddress4char(
                              dataNFTs?.ownerData?.walletAddress,
                            ) ||
                            truncateAddress4char(dataNFTs?.owner)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-wrap items-start justify-between gap-4 rounded-xl bg-white p-5 text-gray-900 md:flex-row">
                    <div className="flex items-center gap-2 self-stretch sm:w-full md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4">
                      {(dataNFTs?.collectionData?.chainId === 666888 ||
                        dataNFTs?.collectionData?.chainId === 8668) && (
                        <HelaIcon className="h-6 w-6" />
                      )}
                      <span className="text-sm font-semibold md:text-base">
                        {dataNFTs?.collectionData.Chain.name}
                        {dataNFTs?.ContractType &&
                          `(${dataNFTs?.ContractType})`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 self-stretch sm:w-full md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4">
                      <FontAwesomeIcon icon={faFingerprint} />
                      <span className="text-sm font-semibold md:text-base">
                        Helascan
                      </span>
                      <a
                        href={`https://testnet-blockexplorer.helachain.com/token/${dataNFTs?.collectionAddress}/instance/${dataNFTs?.tokenId}/token-transfers`}
                        className="flex items-center justify-center rounded-full p-2 hover:bg-primary-300"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          className="text-sm text-primary-500 md:text-base"
                          icon={faUpRightFromSquare}
                        />
                      </a>
                    </div>
                    <div className="flex items-center gap-2 self-stretch sm:w-full md:w-full lg:w-1/4 xl:w-1/4 2xl:w-1/4">
                      <FontAwesomeIcon icon={faEye} />
                      <span className="text-sm font-semibold md:text-base">
                        View original
                      </span>
                      <a
                        href={`${dataNFTs?.imageUri}`}
                        className="flex items-center justify-center rounded-full p-2 hover:bg-primary-300"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          className="text-sm text-primary-500 md:text-base"
                          icon={faUpRightFromSquare}
                        />
                      </a>
                    </div>
                  </div>

                  <div className="w-full rounded-xl bg-white p-5 text-gray-900">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold md:text-lg">Royalties</h3>
                      <span className="h-6 rounded-lg bg-gray-600 p-1 text-xs text-white">
                        {Number(dataNFTs?.royalties) / 100}%
                      </span>
                    </div>
                    <p>
                      Split royalties are automatically deposited into each
                      recipient&lsquo;s wallet.
                    </p>
                  </div>
                  <div className="flex w-full flex-col  gap-4 rounded-xl bg-white p-5 text-gray-900">
                    <div className="flex justify-between gap-2">
                      {dataNFTs?.itemDetails?.isAuctioned && (
                        <div>
                          Auction{' '}
                          {isNotRelease
                            ? 'starts'
                            : isNotExpired
                            ? 'ends'
                            : 'ended'}{' '}
                          in :{' '}
                          <span className="font-bold">
                            {isNotRelease ? (
                              <LiveCountdown
                                endDate={dataNFTs?.itemDetails?.releaseDate}
                              />
                            ) : isNotExpired ? (
                              <LiveCountdown
                                endDate={dataNFTs?.itemDetails?.endDate}
                              />
                            ) : (
                              ''
                            )}
                          </span>
                        </div>
                      )}

                      <button
                        className="font-bold text-primary-500 hover:text-primary-300"
                        onClick={() =>
                          refreshMetadata(
                            dataNFTs?.collectionAddress,
                            dataNFTs?.tokenId,
                          )
                        }
                      >
                        <FontAwesomeIcon icon={faRotate} /> Refresh metadata
                      </button>
                    </div>
                    <div className="flex gap-4">
                      {dataNFTs?.itemDetails?.isAuctioned ? (
                        <>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="md:text-lg">Floor Price</h3>
                            <h4 className="text-sm font-bold md:text-lg">
                              {dataNFTs?.itemDetails
                                ? formatEther(dataNFTs?.itemDetails?.price)
                                : formatEther(
                                    dataNFTs?.collectionData.floorPrice,
                                  )}{' '}
                              {dataNFTs?.collectionData.Chain.symbol}
                            </h4>
                            <h5>
                              $
                              {dataNFTs?.itemDetails
                                ? formatEther(dataNFTs?.itemDetails?.price)
                                : formatEther(
                                    dataNFTs?.collectionData.floorPrice,
                                  )}
                            </h5>
                          </div>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="md:text-lg">Bid</h3>
                            <h4 className="md:text-lg">
                              Highest bid at{' '}
                              <span className="text-sm font-bold md:text-lg">
                                {formatEther(
                                  Number(
                                    getHighestBid(dataNFTs?.itemDetails)
                                      .highestBid,
                                  ),
                                )}{' '}
                                {dataNFTs?.collectionData?.Chain?.symbol}
                              </span>
                            </h4>
                            <div className="flex w-full gap-1">
                              <span>by</span>
                              <span className="text-sm font-bold md:text-lg">
                                {truncateAddress4char(
                                  getHighestBid(dataNFTs?.itemDetails)
                                    .highestBidder,
                                )}
                              </span>
                            </div>
                          </div>{' '}
                        </>
                      ) : (
                        <>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="md:text-lg">Floor Price</h3>
                            <h4 className="text-sm font-bold md:text-lg">
                              {dataNFTs?.itemDetails
                                ? formatEther(dataNFTs?.itemDetails?.price)
                                : formatEther(
                                    dataNFTs?.collectionData.floorPrice,
                                  )}{' '}
                              {dataNFTs?.collectionData.Chain.symbol}
                            </h4>
                            <h5>
                              $
                              {dataNFTs?.itemDetails
                                ? formatEther(dataNFTs?.itemDetails?.price)
                                : formatEther(
                                    dataNFTs?.collectionData.floorPrice,
                                  )}
                            </h5>
                          </div>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="md:text-lg">Price</h3>
                            <h4 className="text-sm md:text-lg">
                              Listing price at{' '}
                              <span className="font-bold">
                                {dataNFTs?.itemDetails
                                  ? formatEther(dataNFTs?.itemDetails?.price)
                                  : formatEther(
                                      dataNFTs?.collectionData.floorPrice,
                                    )}{' '}
                                {dataNFTs?.collectionData.Chain.symbol}
                              </span>
                            </h4>
                            <div className="flex w-full flex-col gap-1 md:flex-row">
                              <span>by</span>

                              <span className="text-sm font-bold md:text-lg">
                                {dataNFTs?.ownerData?.username ||
                                  truncateAddress4char(
                                    dataNFTs?.ownerData?.walletAddress,
                                  ) ||
                                  truncateAddress4char(dataNFTs?.owner)}
                              </span>
                            </div>
                          </div>{' '}
                        </>
                      )}
                    </div>

                    {dataNFTs?.itemDetails ? (
                      dataNFTs?.itemDetails?.isAuctioned ? (
                        <div className="mt-5 flex w-full items-center gap-4">
                          <button
                            className="w-full rounded-full border border-primary-500 bg-white px-4 py-2 text-center text-base font-bold text-primary-500 hover:bg-primary-300"
                            onClick={() =>
                              handleOpenModalBid(
                                dataNFTs?.itemDetails?.marketId,
                                dataNFTs?.itemDetails?.listingPrice,
                                dataNFTs?.imageUri,
                                dataNFTs?.tokenId,
                                dataNFTs?.itemDetails?.price,
                                dataNFTs?.nftDetails?.name,
                                dataNFTs?.collectionData,
                                getHighestBid(dataNFTs?.itemDetails),
                                formatEther(
                                  getLowestBid(dataNFTs?.itemDetails),
                                ),
                              )
                            }
                            disabled={
                              isNotRelease ? true : isNotExpired ? false : true
                            }
                          >
                            {isNotRelease
                              ? 'Upcoming'
                              : isNotExpired
                              ? 'Place a Bid'
                              : 'Expired'}
                          </button>
                        </div>
                      ) : (
                        <div className="mt-5 flex w-full items-center gap-4">
                          <button
                            className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                            onClick={() =>
                              handleOpenModalBuy(
                                dataNFTs?.itemDetails?.marketId,
                                dataNFTs?.itemDetails?.price,
                                dataNFTs?.imageUri,
                                dataNFTs.name,
                                dataNFTs.tokenId,
                                dataNFTs?.collectionData.Chain.symbol,
                                dataNFTs?.collectionData.Chain.name,
                              )
                            }
                            disabled={!isNotExpired}
                          >
                            {isNotExpired ? 'Buy Now' : 'Expired'}
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="mt-5 flex w-full items-center gap-4">
                        <button className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                          Not For Sale
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                    <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-primary-500">
                      <li
                        className={`cursor-pointer px-5 pb-3 ${
                          activeTab == 'overview'
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                        onClick={() => setActiveTab('overview')}
                      >
                        Overview
                      </li>
                      <li
                        className={`cursor-pointer px-5 pb-3 ${
                          activeTab == 'bids'
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                        onClick={() => setActiveTab('bids')}
                      >
                        Bids
                      </li>
                      <li
                        className={`cursor-pointer px-5 pb-3 ${
                          activeTab == 'history'
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                        onClick={() => setActiveTab('history')}
                      >
                        History
                      </li>
                      <li
                        className={`cursor-pointer px-5 pb-3 ${
                          activeTab == 'collateral'
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                        onClick={() => setActiveTab('collateral')}
                      >
                        Collateral
                      </li>
                    </ul>
                    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                      {renderActiveTab()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          'Loading...'
        )}
      </div>
      <div className="bg-gradient-to-r from-semantic-orange-100 to-semantic-red-200">
        {/* <div className="awan-3 absolute">
          <Awan3 />
        </div> */}
        <div className="awan-4 absolute right-0 mt-[50px]">
          <Awan4 />
        </div>
        <div className="absolute left-[40%] mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[60%] mt-[40px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] mt-[140px] animate-spin">
          <Flower />
        </div>
        <section className="container relative z-10 mx-auto pb-5">
          <div className="w-full text-black">
            <div className="container mx-auto px-4 pt-[50px]">
              <div className="my-5 flex items-center justify-between">
                <h2 className="mt-5 text-xl font-semibold">
                  NFTs you might like
                </h2>
                <button
                  onClick={() => router.push('/collection')}
                  title="See all"
                  className="hidden rounded-full bg-white px-4 py-2 font-semibold text-primary-500 hover:bg-primary-50 sm:hidden md:block md:text-lg lg:block xl:block 2xl:block"
                >
                  View collection
                </button>
              </div>
              <div className="relative flex w-full flex-initial items-center justify-center">
                {isLoadingRelatedNFTs || dataRelatedNFTs.length <= 0 ? (
                  <RelatedNFTsSkeleton />
                ) : (
                  <RelatedNFTs dataRelatedNFTs={dataRelatedNFTs} />
                )}
              </div>
              <button
                onClick={() => router.push('/collection')}
                title="See all"
                className="block w-full rounded-full bg-white px-4 py-2 font-semibold text-primary-500 hover:bg-primary-50 sm:block md:hidden md:text-lg lg:hidden xl:hidden 2xl:hidden"
              >
                View collection
              </button>
            </div>
          </div>
        </section>
        <div className="absolute -mt-[180px] animate-pulse">
          <Castle />
        </div>
        <div className="absolute right-0 -mt-[122px] animate-pulse delay-700">
          <Castle2 />
        </div>
        <div className="absolute left-[20%] -mt-[50px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[50%] -mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] -mt-[280px] animate-spin">
          <Flower />
        </div>
      </div>
      {/* {modalPropose && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepPropose == 1 || stepPropose == 3) && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="flex w-full justify-between">
                        <h3 className="font-semibold">Propose a lend offer</h3>
                        <button
                          onClick={handleModalPropose}
                          className="text-primary-500"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center gap-3">
                        <img
                          src="https://via.placeholder.com/192x100"
                          className="w-full"
                        />
                        <div className="font w-full text-2xl text-gray-400">
                          #18
                          <br />
                          Worriness
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Choose wallet
                        </label>
                        <Listbox
                          disabled={stepPropose == 3 ? true : false}
                          value={selectedAccount}
                          onChange={setSelectedAccount}
                        >
                          <div className="relative z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Ethereum />
                              </span>
                              <span className="block truncate pl-5 text-gray-600">
                                {selectedAccount}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                  width="16"
                                  height="9"
                                  viewBox="0 0 16 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z"
                                    fill="#7D778A"
                                  />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {accounts.map((account, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={account}
                                >
                                  {({ selectedAccount }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedAccount
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {account}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Lend amount for this nft
                        </label>
                        <div
                          className={`flex w-full items-center rounded-full border border-gray-200 ${
                            stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                          }`}
                        >
                          <input
                            type="number"
                            disabled={stepPropose == 3 ? true : false}
                            id="amount"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                          />
                          <span className="pr-3 text-gray-500">
                            <Ethereum />
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Repayment value
                        </label>
                        <div
                          className={`flex w-full items-center rounded-full border border-gray-200 ${
                            stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                          }`}
                        >
                          <input
                            type="number"
                            disabled={stepPropose == 3 ? true : false}
                            id="value"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                          />
                          <span className="pr-3 text-gray-500">
                            <Ethereum />
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Due date
                        </label>
                        <DatePicker
                          options={options}
                          onChange={handleChangeDueDate}
                          show={showDueDate}
                          setShow={handleCloseDueDate}
                        >
                          <div
                            className={`flex w-full items-center rounded-full border border-gray-200 ${
                              stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                            }`}
                          >
                            <input
                              type="text"
                              disabled={stepPropose == 3 ? true : false}
                              id="due_date"
                              value={selectedDueDate}
                              className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                              onFocus={() => setShowDueDate(true)}
                            />
                            <span className="pr-3 text-gray-500">
                              <FontAwesomeIcon icon={faCalendar} />
                            </span>
                          </div>
                        </DatePicker>
                      </div>
                      {stepPropose == 3 && (
                        <div>
                          <label className="flex items-center">
                            <input
                              checked={agreePropose}
                              onChange={handleAgreePropose}
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                            />
                            <span className="pl-2 text-sm">
                              Please do a double check before you continue the
                              lending progress
                            </span>
                          </label>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <div>Annual percentage rate</div>
                        <div>8.2%</div>
                      </div>
                      <button
                        disabled={stepPropose == 3 ? !agreePropose : false}
                        className="disabled:bg-primary-00 w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                        onClick={() => handleStepPropose(stepPropose + 1)}
                      >
                        Propose an offer
                      </button>
                    </section>
                  )}
                  {(stepPropose == 2 || stepPropose == 4) && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="md:text-lg font-bold">Loading</h3>
                          {stepPropose == 2 && (
                            <span>Proccesing your transactions</span>
                          )}
                          {stepPropose == 4 && (
                            <span>
                              Sign your wallet to continue the transaction
                            </span>
                          )}
                        </div>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepPropose(stepPropose - 1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepPropose(stepPropose + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  )}
                  {stepPropose == 5 && (
                    <section className="step-2 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100 p-5">
                      <div className="mt-5 flex flex-col items-center gap-5">
                        <span className="absolute -mt-4 ml-4 h-32 w-32 rounded-full border bg-green-200"></span>
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-6xl font-bold text-green-400"
                          />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-xl font-bold">Congratulations</h3>
                          <span>
                            Your lend proposal has ben sent to the NFT owner,
                            let’s wait them to confirm your offer, or try to
                            contact them.
                          </span>
                        </div>
                        <button
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500"
                          onClick={() => handleModalPropose()}
                        >
                          Your offer status
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <ModalBid
        isOpenModal={isOpenModalBid}
        onClose={closeModalBid}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModalBid}
      />
      <ModalBuy
        isOpenModal={isOpenModalBuy}
        onClose={closeModalBuy}
        dataBuy={buyData}
        buyAction={buyAction}
        onModalClose={closeModalBuy}
      />
    </>
  );
}

const Collateral = ({ dataNFTs }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="md:text-lg">Current Owner</h3>
          <div className="flex w-fit items-center justify-center gap-2">
            <ImageWithFallback
              className="h-full w-full rounded-2xl "
              width={28}
              height={28}
              alt={
                dataNFTs.ownerData?.username ||
                truncateAddress4char(dataNFTs.ownerData?.walletAddress) ||
                truncateAddress4char(dataNFTs.owner)
              }
              diameter={28}
              address={dataNFTs.ownerData?.walletAddress || dataNFTs.owner}
              src={`/uploads/user/${dataNFTs.ownerData?.logo}`}
            />
            <div className="font-medium leading-none text-neutral-700">
              {dataNFTs.ownerData?.username ||
                truncateAddress4char(dataNFTs.ownerData?.walletAddress) ||
                truncateAddress4char(dataNFTs.owner)}
            </div>
          </div>
        </div>
        <div>No owner proposal yet.</div>
      </div>
      <div>
        <h3 className="font-semibold md:text-lg">
          Propose an ETH lend to the owner
        </h3>
        <p>No owner lender proposes the offer yet.</p>
      </div>
      <button className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300">
        Propose an offer
      </button>
    </>
  );
};

const Overview = ({ params }) => {
  return <h1 className="text-black">Overview</h1>;
};

const Bids = ({ params }) => {
  return <h1 className="text-black">Bids</h1>;
};

const History = ({ params }) => {
  return <h1 className="text-black">History</h1>;
};
