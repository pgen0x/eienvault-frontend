import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/assets/icon/rightarrow';
import LeftArrow from '@/assets/icon/lefarrow';
import Ethereum from '@/assets/icon/ethereum';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import Avatar from '@/assets/images/avatar.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import { useRouter } from 'next-nprogress-bar';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
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
import { ImageWithFallback } from '../imagewithfallback';
import HelaIcon from '@/assets/icon/hela';
import { formatEther } from 'viem';
import moment from 'moment';
import ModalBid from '../modal/bid';
import ModalBuy from '../modal/buy';
import { useAccount, useWalletClient } from 'wagmi';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here
const sliderBreakPoints = {
  640: {
    slidesPerView: 2,
    spaceBetween: 5,
    width: 400,
  },
  768: {
    slidesPerView: 1,
    spaceBetween: 5,
  },
  1024: {
    width: 545,
  },
  1280: {
    width: 400,
  },
  1536: {
    width: 400,
  },
  1700: {
    width: 400,
    spaceBetween: 5,
  },
  2200: {
    width: 200,
    spaceBetween: 5,
  },
};

export const SlideshowDiscover = ({ dataDiscover }) => {
  const router = useRouter();
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

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
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  return (
    <>
      <button className="swiper-prev-discover absolute -left-5 z-10 mr-2 hidden rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300 sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-discover',
          prevEl: '.swiper-prev-discover',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {dataDiscover.map((data, index) => {
          const currentDate = moment();
          const endDate = moment.unix(data.itemDetails?.endDate);
          const releaseDate = moment.unix(data.itemDetails?.releaseDate);
          const isNotExpired = endDate.isAfter(currentDate);
          const isNotRelease = currentDate.isBefore(releaseDate);
          return (
            <SwiperSlide key={index}>
              <div className="group h-[542px] w-full p-3">
                <Image
                  className="z-10 h-[250px] w-full rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[210px] group-hover:transition-all"
                  src={
                    data?.imageUri
                      ? data.imageUri
                      : 'https://placehold.co/325x265.png'
                  }
                  blurDataURL={
                    data?.imageUri
                      ? data?.imageUri
                      : 'https://placehold.co/325x265.png'
                  }
                  alt={data?.name ? data?.name : ''}
                  width={325}
                  height={265}
                  placeholder="blur"
                  objectFit="cover"
                />
                <div className="inline-flex w-full flex-col items-center justify-center px-5 lg:items-start">
                  <div className="relative flex w-full flex-row">
                    <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-3  backdrop-blur-xl">
                      <div className="flex w-full flex-col items-start justify-start">
                        <div className="inline-flex items-center justify-between self-stretch">
                          <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2">
                            <ImageWithFallback
                              className="h-full w-full rounded-2xl "
                              width={15}
                              height={15}
                              diameter={15}
                              address={data.collectionAddress}
                              src={`/uploads/collections/${data.Collection?.logo}`}
                              alt={data.name || data.Collection?.name}
                            />
                            <div className="flex items-start justify-start gap-2">
                              <div className="text-xs font-medium leading-none text-neutral-700">
                                {data.Collection?.name ||
                                  data?.collectionAddress}
                              </div>
                              <div className="text-xs font-black leading-none text-primary-500">
                                {data.Collection?.User.isVerified && (
                                  <div className="text-xs font-black leading-none text-primary-500">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="items-center">
                            <FontAwesomeIcon icon={faEllipsis} />
                          </div>
                        </div>
                        <div className="inline-flex w-full items-center justify-between gap-2 pt-1">
                          <div className="text-xl2 font-medium leading-tight text-gray-600">
                            {data.name || data.Collection.name} #{data.tokenId}
                          </div>
                          <div className="text-sm font-normal leading-tight text-neutral-700">
                            {(data.Collection?.Chain.chainId === 666888 ||
                              data.Collection?.Chain.chainId === 8668) && (
                              <HelaIcon className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <div className="mt-5 flex w-full justify-between rounded-md bg-white px-2 py-2">
                          <div className="flex flex-col items-start truncate text-sm leading-5">
                            <p>Price</p>
                            <p className="font-bold">
                              {data.itemDetails.price
                                ? formatEther(Number(data.itemDetails.price))
                                : '0.00'}{' '}
                              {data.Collection.Chain.symbol
                                ? data.Collection.Chain.symbol
                                : '-'}
                            </p>
                          </div>
                          <div className="flex flex-col items-start truncate text-sm leading-5">
                            {data.itemDetails.isAuctioned ? (
                              <>
                                <p>Highest bid</p>
                                <p className="font-bold">
                                  {formatEther(
                                    Number(
                                      getHighestBid(data.itemDetails)
                                        .highestBid,
                                    ),
                                  )}{' '}
                                  {data.Collection.Chain.symbol
                                    ? data.Collection.Chain.symbol
                                    : '-'}
                                </p>
                              </>
                            ) : (
                              <>
                                <p>Floor Price</p>
                                <p className="font-bold">
                                  {data.Collection.floorPrice
                                    ? formatEther(
                                        Number(data.Collection.floorPrice),
                                      )
                                    : '0.00'}{' '}
                                  {data.Collection.Chain.symbol
                                    ? data.Collection.Chain.symbol
                                    : '-'}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-5 flex w-full items-center">
                          {!data.itemDetails?.isAuctioned ? (
                            <div className="mt-5 flex w-full items-center">
                              {/* <FontAwesomeIcon
                              className="mr-5 h-5 w-5 cursor-pointer rounded-full p-3 text-primary-500 hover:bg-primary-50 "
                              icon={faCartPlus}
                            /> */}
                              <button
                                className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                                onClick={() =>
                                  handleOpenModalBuy(
                                    data.itemDetails.marketId,
                                    data.itemDetails.price,
                                    data.imageUri,
                                    data.name,
                                    data.tokenId,
                                    data.Collection.Chain.symbol,
                                    data.Collection.Chain.name,
                                  )
                                }
                                disabled={!isNotExpired}
                              >
                                {isNotExpired ? 'Buy Now' : 'Expired'}
                              </button>
                            </div>
                          ) : (
                            data.itemDetails?.isAuctioned && (
                              <div className="mt-5 flex w-full items-center">
                                <button
                                  className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                                  onClick={() =>
                                    handleOpenModalBid(
                                      data.itemDetails.marketId,
                                      data.itemDetails.listingPrice,
                                      data?.imageUri,
                                      data?.tokenId,
                                      data.itemDetails.price,
                                      data?.name,
                                      data.Collection,
                                      getHighestBid(data.itemDetails),
                                      formatEther(
                                        getLowestBid(data.itemDetails),
                                      ),
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
                            )
                          )}
                        </div>
                        <button
                          onClick={() =>
                            router.push(
                              `/nft/${data?.collectionAddress}/${data?.tokenId}`,
                            )
                          }
                          className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all"
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
      <button className="swiper-next-discover absolute -right-5 z-10 ml-2 hidden rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300 sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
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
};

export const SlideshowDiscoverSkeleton = () => {
  return (
    <>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next-discover',
          prevEl: '.swiper-prev-discover',
        }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {[...Array(3)].map((x, i) => (
          <SwiperSlide key={i}>
            <div className="h-[542px] w-full p-3">
              <div className="h-[290px] w-full animate-pulse rounded-2xl bg-gray-300" />
              <div className="inline-flex w-full flex-col items-center justify-center px-5 lg:items-start">
                <div className="relative flex w-full flex-row">
                  <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-3  backdrop-blur-xl">
                    <div className="flex w-full flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-between self-stretch">
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
                        <div className="mt-2 hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                          <div className="mt-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                        </div>
                        <div className="mt-2 hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
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

export default SlideshowDiscover;
