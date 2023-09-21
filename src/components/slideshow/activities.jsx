import React, { useState, useEffect, Suspense } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/assets/icon/rightarrow';
import LeftArrow from '@/assets/icon/lefarrow';
import Ethereum from '@/assets/icon/ethereum';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import Avatar from '@/assets/images/avatar.jpg';
import { useRouter } from 'next-nprogress-bar';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import {
  faCircleCheck,
  faChevronRight,
  faChevronLeft,
  faMinus,
  faPlus,
  faEllipsis,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalBid from '@/components/modal/bid';
import { formatEther } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import HelaIcon from '@/assets/icon/hela';
import { ImageWithFallback } from '../imagewithfallback';
import ModalBuy from '../modal/buy';
import moment from 'moment';

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

const sliderBreakPoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 5,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  2200: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
};

export const SlideshowActivities = ({ dataActivities }) => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [auctionData, setAcutionData] = useState({});
  const [placeBidHash, setPlaceBidHash] = useState();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [buyData, setBuyData] = useState({});

  useEffect(() => {
    getNfts();
  }, []);

  const getNfts = async () => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/market/items?limit=10`,
      })
      .then((response) => {
        setNfts(response.data);
      })
      .catch((error) => {
        toast.error(JSON.stringify(error));
      });
  };

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
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  }

  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0.00', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
    }

    let highestBid = BigInt(0);
    let highestBidder = null;

    for (const offer of auctionData.listOffers) {
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

  const buyAction = async (marketId, price) => {
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

  function closeModalBuy() {
    setisOpenModalBuy(false);
  }

  let slidesPerView = 1;
  if (dataActivities.length >= 4) {
    slidesPerView = 4;
  } else {
    for (const breakpoint in sliderBreakPoints) {
      if (dataActivities.length < sliderBreakPoints[breakpoint].slidesPerView) {
        slidesPerView = sliderBreakPoints[breakpoint].slidesPerView;
        break;
      }
    }
  }

  return (
    <>
      <button className="swiper-prev-activities absolute -left-5 top-1/2 z-10 mr-2 hidden rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300 sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-activities',
          prevEl: '.swiper-prev-activities',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {dataActivities &&
          dataActivities.map((nft, index) => {
            const currentDate = moment();
            const endDate = moment.unix(nft.endDate);
            const releaseDate = moment.unix(nft.releaseDate);
            const isNotExpired = endDate.isAfter(currentDate);
            const isNotRelease = currentDate.isBefore(releaseDate);

            return (
              <SwiperSlide key={index}>
                <div className="group h-[494px] w-full p-3">
                  <Suspense
                    fallback={
                      <div className="h-[250px] w-full animate-pulse rounded-2xl bg-gray-300" />
                    }
                  >
                    <Image
                      className="z-10 h-[250px] w-full rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[210px] group-hover:transition-all"
                      src={
                        nft.nftDetails?.imageUri
                          ? nft.nftDetails?.imageUri
                          : 'https://placehold.co/325x265.png'
                      }
                      blurDataURL={
                        nft.nftDetails?.imageUri
                          ? nft.nftDetails?.imageUri
                          : 'https://placehold.co/325x265.png'
                      }
                      alt={nft.nftDetails?.name ? nft.nftDetails?.name : ''}
                      width={325}
                      height={265}
                      placeholder="blur"
                      objectFit="cover"
                    />
                  </Suspense>
                  <div className="inline-flex w-full flex-col items-center justify-center lg:items-start">
                    <div className="relative flex w-full flex-row px-5">
                      <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 dark:bg-zinc-700/60 bg-opacity-30 p-3 backdrop-blur-xl">
                        <div className="flex w-full flex-col items-start justify-start">
                          <div className="inline-flex items-center justify-between self-stretch">
                            <div className="flex items-center justify-center gap-2 bg-white dark:bg-zinc-600 bg-opacity-70 px-2 py-1 rounded-md">
                              <ImageWithFallback
                                className="h-full w-full rounded-2xl "
                                width={16}
                                height={16}
                                alt={
                                  nft.collectionData.name
                                    ? nft.collectionData.name
                                    : nft.collectionData.tokenAddress
                                    ? nft.collectionData.tokenAddress
                                    : ''
                                }
                                diameter={16}
                                address={nft.collectionData?.tokenAddress}
                                src={`/uploads/collections/${nft.collectionData.logo}`}
                              />

                              <div className="flex items-start justify-start gap-2">
                                <div
                                  className="cursor-pointer text-xs font-medium leading-none text-neutral-700 dark:text-white"
                                  onClick={() =>
                                    router.push(
                                      `/collection/${nft.collectionData.tokenAddress}`,
                                    )
                                  }
                                >
                                  {nft.collectionData.name
                                    ? nft.collectionData.name
                                    : nft.collectionData.tokenAddress
                                    ? nft.collectionData.tokenAddress
                                    : ''}
                                </div>
                                <div className="text-xs font-black leading-none text-primary-500">
                                  {nft.collectionData.User.isVerified && (
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                  )}
                                </div>
                              </div>
                            </div>
                            {/* <div className="items-center">
                            <FontAwesomeIcon icon={faEllipsis} />
                          </div> */}
                          </div>
                          <div className="inline-flex w-full items-center justify-between gap-2 pt-2">
                            <div
                              className="text-xl2 cursor-pointer font-medium leading-tight text-gray-600 dark:text-white"
                              onClick={() =>
                                router.push(
                                  `/nft/${nft.collectionData.tokenAddress}/${nft.nftDetails?.tokenId}`,
                                )
                              }
                            >
                              {nft.nftDetails?.name ? nft.nftDetails?.name : ''}{' '}
                              #
                              {nft.nftDetails?.tokenId
                                ? nft.nftDetails?.tokenId
                                : ''}
                            </div>
                            <div className="text-sm font-normal leading-tight text-neutral-700">
                              {(nft.collectionData?.chainId === 666888 ||
                                nft.collectionData?.chainId === 8668) && (
                                <HelaIcon className="h-5 w-5" />
                              )}
                            </div>
                          </div>
                          <div className="mt-5 flex w-full justify-between py-2 dark:bg-zinc-600 px-2 rounded-xl">
                            <div className="flex flex-col items-start truncate text-sm leading-5">
                              <p>Price</p>
                              <p className="font-bold">
                                {nft.price
                                  ? formatEther(Number(nft.price))
                                  : '0.00'}{' '}
                                {nft.collectionData.Chain.symbol
                                  ? nft.collectionData.Chain.symbol
                                  : '-'}
                              </p>
                            </div>
                            <div className="flex flex-col items-start truncate text-sm leading-5">
                              {nft.isAuctioned ? (
                                <>
                                  <p>Highest bid</p>
                                  <p className="font-bold">
                                    {formatEther(
                                      Number(getHighestBid(nft).highestBid),
                                    )}{' '}
                                    {nft.collectionData.Chain.symbol
                                      ? nft.collectionData.Chain.symbol
                                      : '-'}
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>Floor Price</p>
                                  <p className="font-bold">
                                    {nft.collectionData.floorPrice
                                      ? formatEther(
                                          Number(nft.collectionData.floorPrice),
                                        )
                                      : '0.00'}{' '}
                                    {nft.collectionData.Chain.symbol
                                      ? nft.collectionData.Chain.symbol
                                      : '-'}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          {!nft.isAuctioned && (
                            <div className="mt-5 flex w-full items-center">
                              {/* <FontAwesomeIcon
                              className="mr-5 h-5 w-5 cursor-pointer rounded-full p-3 text-primary-500 hover:bg-primary-50 "
                              icon={faCartPlus}
                            /> */}
                              <button
                                className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                                onClick={() =>
                                  handleOpenModalBuy(
                                    nft?.marketId,
                                    nft?.price,
                                    nft?.nftDetails?.imageUri,
                                    nft?.nftDetails?.name,
                                    nft?.nftDetails?.tokenId,
                                    nft.collectionData.Chain.symbol,
                                    nft.collectionData.Chain.name,
                                  )
                                }
                                disabled={!isNotExpired}
                              >
                                {isNotExpired ? 'Buy Now' : 'Expired'}
                              </button>
                            </div>
                          )}
                          {nft.isAuctioned && (
                            <div className="mt-5 flex w-full items-center">
                              <button
                                className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                                onClick={() =>
                                  handleOpenModalBid(
                                    nft.marketId,
                                    nft.listingPrice,
                                    nft.nftDetails?.imageUri,
                                    nft.nftDetails?.tokenId,
                                    nft.price,
                                    nft.nftDetails?.name,
                                    nft.collectionData,
                                    getHighestBid(nft),
                                    formatEther(getLowestBid(nft)),
                                  )
                                }
                                disabled={
                                  isNotRelease
                                    ? true
                                    : isNotExpired
                                    ? false
                                    : true
                                }
                              >
                                {isNotRelease
                                  ? 'Upcoming'
                                  : isNotExpired
                                  ? 'Place Bid'
                                  : 'Expired'}
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() =>
                              router.push(
                                `/nft/${nft.collectionData.tokenAddress}/${nft.nftDetails?.tokenId}`,
                              )
                            }
                            className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 dark:text-white opacity-0 ease-in-out dark:bg-zinc-600 dark:hover:bg-zinc-500 font-bold hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all"
                          >
                            View Detail
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
      <button className="swiper-next-activities absolute -right-5 top-1/2 z-10 ml-2 hidden rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300 sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <ModalBuy
        isOpenModal={isOpenModalBuy}
        onClose={closeModalBuy}
        dataBuy={buyData}
        buyAction={buyAction}
        onModalClose={closeModalBuy}
      />
      <ModalBid
        isOpenModal={isOpenModal}
        onClose={closeModal}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModal}
      />
    </>
  );
};

export const SlideshowActivitiesSkeleton = () => {
  return (
    <>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-activities',
          prevEl: '.swiper-prev-activities',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {[...Array(6)].map((nft, index) => (
          <SwiperSlide key={index}>
            <div className="group h-[494px] w-full p-3">
              <div className="h-[250px] w-full animate-pulse rounded-2xl bg-gray-300" />
              <div className="inline-flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
                <div className="relative flex w-full flex-row px-5">
                  <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 p-3 backdrop-blur">
                    <div className="flex w-full flex-col items-start justify-start">
                      <div className="mt-2 inline-flex items-center justify-between self-stretch">
                        <div className="flex items-center justify-center gap-2 rounded-lg p-2">
                          <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                          <div className="flex items-start justify-start gap-2">
                            <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                          </div>
                        </div>
                        <div className="items-center">
                          <div className="h-2 w-6 animate-pulse rounded-full bg-gray-300" />
                        </div>
                      </div>
                      <div className="mt-3 inline-flex w-full items-center justify-between gap-2 pt-1">
                        <div className="h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                        <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                      </div>
                      <div className="mt-3 flex w-full justify-between py-2">
                        <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                        </div>
                        <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                        </div>
                      </div>
                      <div className="mt-5 flex w-full items-center">
                        <div className="mr-5 h-12 w-16 animate-pulse rounded-full bg-gray-300 p-3" />
                        <div className="h-12 w-full animate-pulse rounded-full bg-gray-300 p-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideshowActivities;
