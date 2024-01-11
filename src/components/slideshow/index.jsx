import HelaIcon from '@/assets/icon/hela';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatEther, formatUnits, zeroAddress } from 'viem';
import { useAccount, useBalance, useToken } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';
import { ImageWithFallback } from '../imagewithfallback';
import ModalBid from '../modal/bid';
import Countdown from './countdown';

const images = [1, 2, 3, 4];

export const Slideshow = ({
  auctions,
  placeBid,
  refreshMetadata,
  refreshData,
}) => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [auctionData, setAcutionData] = useState({});
  const { address } = useAccount();
  const [selectedAddress, setSelectedAddress] = useState(zeroAddress);
  const { data: balanceToken } = useToken({
    address: selectedAddress,
    chainId: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 8668 : 666888,
    enabled: true,
  });

  const sliderBreakPoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 5,
      width: 400,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    1024: {
      spaceBetween: 5,
      width: 530,
    },
    1280: {
      spaceBetween: 24,
      width: 644,
    },
    1536: {
      spaceBetween: 24,
      width: 644,
    },
    1700: {
      spaceBetween: 24,
      width: 644,
    },
    2200: {
      spaceBetween: 24,
      width: 200,
    },
  };

  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
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
    paidWith,
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
      paidWith,
    });
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    // Set selectedAddress based on auction.paidWith
    auctions.forEach((auction) => {
      if (auction.paidWith !== zeroAddress) {
        setSelectedAddress(auction.paidWith);
      }
    });
  }, [auctions]);

  return (
    <>
      <ButtonPrimary className="swiper-prev absolute -left-5 z-10 mr-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonPrimary>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
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
        {auctions.map((auction, index) => {
          const currentDate = moment();
          const endDate = moment.unix(auction.endDate);
          const releaseDate = moment.unix(auction.releaseDate);
          const isNotExpired = endDate.isAfter(currentDate);
          const isNotRelease = currentDate.isBefore(releaseDate);

          const bidAmount =
            auction.paidWith === zeroAddress
              ? formatEther(getHighestBid(auction).highestBid)
              : formatUnits(
                  getHighestBid(auction).highestBid,
                  balanceToken?.decimals,
                );
          return (
            <SwiperSlide key={index}>
              <div className="inline-flex w-full flex-col justify-center gap-2 p-2 lg:items-start lg:pt-16">
                <div className="flex w-fit flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                  <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                  <div className="whitespace-nowrap text-sm font-semibold text-gray-900">
                    Live auction
                  </div>
                </div>
                <div className="relative flex h-full flex-row md:w-full lg:w-full">
                  {auction.nftDetails?.imageUri !== null ? (
                    <Image
                      className="h-96 w-full rounded-2xl bg-white object-cover lg:w-96"
                      width={500}
                      height={404}
                      placeholder="blur"
                      blurDataURL={auction.nftDetails?.imageUri}
                      src={auction.nftDetails?.imageUri}
                      alt={auction.collectionData.name}
                    />
                  ) : (
                    <div className="flex h-96 w-[500px]  flex-col justify-end rounded-2xl bg-gray-300">
                      <button
                        className="mb-4 inline-flex justify-center gap-2 self-center rounded-full border border-primary-500 bg-transparent px-2 py-2 text-sm font-semibold text-primary-500 hover:border-primary-300 hover:text-primary-300"
                        onClick={() =>
                          refreshMetadata(auction.collection, auction.tokenId)
                        }
                      >
                        Refresh Metadata
                      </button>
                    </div>
                  )}

                  <div className="my-3 inline-flex h-[357px] w-full flex-col items-start justify-start gap-4 rounded-br-2xl rounded-tr-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl  dark:bg-zinc-800 dark:bg-opacity-50">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start self-stretch">
                        <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                          <div
                            className="cursor-pointer text-2xl font-bold leading-9 text-neutral-900 dark:text-white"
                            onClick={() =>
                              router.push(
                                `/nft/${auction.collection}/${auction.tokenId}`,
                              )
                            }
                          >
                            {auction.nftDetails?.name}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="inline-flex items-center justify-start gap-2">
                        <span className="text-gray-900 dark:text-white">
                          By
                        </span>
                        <div
                          className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2"
                          onClick={() =>
                            router.push(`/profile/${auction?.seller}`)
                          }
                        >
                          <ImageWithFallback
                            className="h-full w-full rounded-2xl "
                            width={15}
                            height={15}
                            alt={auction?.seller}
                            diameter={15}
                            address={auction?.seller}
                            src={`${process.env.NEXT_PUBLIC_CDN_URL}/users/${auction?.sellerData?.logo}`}
                          />
                          <div className="flex items-start justify-start gap-2">
                            <div className="text-xs font-bold leading-none text-neutral-900">
                              {auction?.sellerData?.username
                                ? auction?.sellerData?.username
                                : truncateAddress4char(auction?.seller)}
                            </div>
                            {auction?.sellerData?.isVerified && (
                              <div className="text-xs font-black leading-none text-primary-500">
                                <FontAwesomeIcon icon={faCircleCheck} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                          On{' '}
                        </div>
                        <div className="flex items-start justify-start gap-2">
                          <div className="text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                            {(auction.collectionData?.chainId === 666888 ||
                              auction.collectionData?.chainId === 8668) && (
                              <HelaIcon className="h-4 w-4" />
                            )}
                          </div>
                          <div className="text-sm font-medium leading-tight text-neutral-900 dark:text-white">
                            {auction.collectionData?.Chain?.symbol}
                          </div>
                        </div>
                      </div>
                      <div className="line-clamp-5 min-h-[88px] w-72 text-sm font-light leading-tight text-neutral-900 dark:text-white">
                        {auction.collectionData?.description
                          ? auction.collectionData?.description
                          : `Welcome to our ${auction.collectionData.name} collection! Explore a world of digital art and assets that represent unique and exclusive tokens on the blockchain. You'll find something special in our collection. Each NFT is a one-of-a-kind piece, verified and secured on the blockchain, making it a valuable addition to your digital asset portfolio. Join us on this journey of innovation and creativity in the world of non-fungible tokens. Start collecting, trading, and owning a piece of the digital future with our NFTs!`}
                      </div>
                    </div>
                    {isNotRelease ? (
                      <div className="h-[35px]" />
                    ) : (
                      <div className="inline-flex items-center justify-start gap-4 self-stretch">
                        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                          <div className="flex flex-col self-stretch text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                            Highest Bid{' '}
                            <span className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                              {bidAmount}{' '}
                              {auction.paidWith !== zeroAddress
                                ? balanceToken?.symbol
                                : 'HLUSD'}
                            </span>
                          </div>
                        </div>
                        <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-2">
                          <div className="self-stretch text-sm font-normal leading-tight text-neutral-900">
                            <span className="mr-2 text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                              By
                            </span>

                            <span className="text-sm font-bold leading-tight text-neutral-900 dark:text-white">
                              {truncateAddress4char(
                                getHighestBid(auction).highestBidder,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <ButtonPrimary
                      onClick={() =>
                        handleOpenModalBid(
                          auction.marketId,
                          auction.listingPrice,
                          auction.nftDetails?.imageUri,
                          auction.nftDetails?.tokenId,
                          auction.price,
                          auction.nftDetails?.name,
                          auction.collectionData,
                          getHighestBid(auction),
                          formatEther(getLowestBid(auction)),
                          auction.paidWith,
                        )
                      }
                      disabled={
                        isNotRelease
                          ? true
                          : isNotExpired
                          ? address === auction?.nftDetails?.owner
                            ? true
                            : auction?.listOffers &&
                              auction?.listOffers.some(
                                (offer) => offer.address === address,
                              )
                            ? true
                            : false
                          : true
                      }
                    >
                      <span className="text-center text-base font-bold leading-normal">
                        {address === auction?.nftDetails?.owner
                          ? 'Owned By You'
                          : auction?.listOffers &&
                            auction?.listOffers.some(
                              (offer) => offer.address === address,
                            )
                          ? 'Offer Already Made'
                          : 'Place Bid'}
                      </span>
                    </ButtonPrimary>
                    <div className="inline-flex items-center justify-center gap-2 self-center">
                      <div className="text-center text-sm font-medium leading-tight text-gray-600 dark:text-white">
                        {isNotRelease ? (
                          <>
                            {' '}
                            <span className="mr-2 text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                              Starts in
                            </span>
                            <span className="text-neutral-900 dark:text-white">
                              <Countdown endDate={auction.releaseDate} />
                            </span>
                          </>
                        ) : isNotExpired ? (
                          <>
                            {' '}
                            <span className="mr-2 text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                              Ends in
                            </span>
                            <span className="text-neutral-900 dark:text-white">
                              <Countdown endDate={auction.endDate} />
                            </span>
                          </>
                        ) : (
                          'Expired'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {auctions.length <= 0 &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="inline-flex w-full flex-col justify-center gap-2 p-2 lg:items-start lg:pt-16">
                <div className="flex w-fit flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                  <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                  <div className="whitespace-nowrap text-sm font-semibold text-gray-900">
                    Live auction
                  </div>
                </div>

                <div className="relative flex h-full flex-row md:w-full lg:w-full">
                  <div className="h-96 w-[500px] animate-pulse rounded-2xl bg-gray-300" />
                  <div className="my-3 inline-flex w-full flex-col items-start justify-start gap-4 rounded-br-2xl rounded-tr-2xl bg-white bg-opacity-50 p-5  backdrop-blur-xl">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start self-stretch">
                        <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                          <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-2xl font-bold leading-9"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="mb-5 inline-flex h-3 w-40 animate-pulse items-center justify-start gap-4 rounded-lg bg-gray-300"></div>
                      <div className="h-3 w-72 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                      <div className="h-3 w-60 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                      <div className="h-3 w-64 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                      <div className="h-3 w-56 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                      <div className="h-3 w-60 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                      <div className="h-3 w-44 animate-pulse rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                    </div>
                    <div className="mt-4 inline-flex items-start justify-start gap-4 self-stretch">
                      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                        <div className="h-4 w-36 animate-pulse self-stretch rounded-lg bg-gray-300 text-sm font-normal leading-tight text-gray-300"></div>
                        <div className="h-11 w-36 animate-pulse self-stretch rounded-full bg-gray-300 text-sm font-normal leading-tight text-gray-300"></div>
                      </div>
                      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                        <div className="h-4 w-36 animate-pulse self-stretch rounded-lg bg-gray-300 text-sm font-normal leading-tight text-gray-300"></div>
                        <div className="h-11 w-36 animate-pulse self-stretch rounded-full bg-gray-300 text-sm font-normal leading-tight text-gray-300"></div>
                      </div>
                    </div>
                    <div className="mt-4 inline-flex h-3 w-80 animate-pulse items-center justify-center gap-2 self-center rounded-lg bg-gray-300 text-sm font-light leading-tight"></div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <ButtonPrimary className="swiper-next absolute -right-5 z-10 ml-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonPrimary>
      <ModalBid
        isOpenModal={isOpenModal}
        onClose={closeModal}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModal}
        refreshData={refreshData}
      />
    </>
  );
};

export const SlideshowMobile = ({
  auctions,
  placeBid,
  refreshMetadata,
  refreshData,
}) => {
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [auctionData, setAcutionData] = useState({});
  const { address } = useAccount();
  const [selectedAddress, setSelectedAddress] = useState(zeroAddress);
  const { data: balanceToken } = useBalance({
    address: address,
    token: selectedAddress,
    chainId: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 8668 : 666888,
    watch: true,
  });

  const sliderBreakPoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 5,
      width: 400,
    },
    1024: {
      spaceBetween: 24,
      width: 400,
    },
    1280: {
      spaceBetween: 24,
      width: 400,
    },
    1536: {
      spaceBetween: 24,
      width: 400,
    },
    1700: {
      spaceBetween: 24,
      width: 400,
    },
    2200: {
      spaceBetween: 24,
      width: 400,
    },
  };

  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
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
    paidWith,
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
      paidWith,
    });
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    // Set selectedAddress based on auction.paidWith
    auctions.forEach((auction) => {
      if (auction.paidWith !== zeroAddress) {
        setSelectedAddress(auction.paidWith);
      }
    });
  }, [auctions]);
  return (
    <>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
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
        {auctions.map((auction, index) => {
          const currentDate = moment();
          const endDate = moment.unix(auction.endDate);
          const releaseDate = moment.unix(auction.releaseDate);
          const isNotExpired = endDate.isAfter(currentDate);
          const isNotRelease = currentDate.isBefore(releaseDate);
          const bidAmount =
            auction.paidWith === zeroAddress
              ? formatEther(getHighestBid(auction).highestBid)
              : formatUnits(
                  getHighestBid(auction).highestBid,
                  balanceToken?.decimals,
                );
          return (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center gap-4 py-4 lg:flex-row lg:items-start lg:px-10 lg:pt-16">
                <div className="relative flex w-[340px] flex-col">
                  <div className="mt-[6rem] flex flex-row items-center self-start rounded-lg bg-[#fff1d4] px-2 py-2">
                    <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                    <div className="whitespace-nowrap text-xs font-semibold text-gray-900">
                      Live auction
                    </div>
                  </div>
                </div>
                <div className="relative flex w-[340px] flex-col">
                  {auction.nftDetails?.imageUri !== null ? (
                    <Image
                      className="h-96 w-full rounded-2xl bg-white object-cover lg:w-96"
                      width={500}
                      height={404}
                      placeholder="blur"
                      blurDataURL={auction.nftDetails?.imageUri}
                      src={auction.nftDetails?.imageUri}
                      alt={
                        auction.nftDetails?.name || auction.collectionData?.name
                      }
                    />
                  ) : (
                    <div className="flex h-96 w-[340px]  flex-col justify-end rounded-2xl bg-gray-300">
                      <button
                        className="mb-4 inline-flex justify-center gap-2 self-center rounded-full border border-primary-500 bg-transparent px-2 py-2 text-sm font-semibold text-primary-500 hover:border-primary-300 hover:text-primary-300"
                        onClick={() =>
                          refreshMetadata(auction.collection, auction.tokenId)
                        }
                      >
                        Refresh Metadadata
                      </button>
                    </div>
                  )}
                  <div className="w-full px-5">
                    <div className="inline-flex w-full flex-col justify-center gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
                      <div className="flex flex-col items-start justify-start">
                        <div className="inline-flex items-center justify-start self-stretch">
                          <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                            <div
                              className="text-2xl font-bold leading-9 text-neutral-900"
                              onClick={() =>
                                router.push(
                                  `/nft/${auction.collection}/${auction.tokenId}`,
                                )
                              }
                            >
                              {auction.nftDetails?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-start gap-1">
                        <div className="inline-flex items-center justify-start gap-4">
                          <span className="text-gray-900">By</span>
                          <div
                            className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2"
                            onClick={() =>
                              router.push(
                                `/profile/${auction.collectionData?.userAddress}`,
                              )
                            }
                          >
                            <ImageWithFallback
                              className="h-full w-full rounded-2xl "
                              width={15}
                              height={15}
                              diameter={15}
                              address={auction.collectionData?.tokenAddress}
                              src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${auction.collectionData?.logo}`}
                              alt={
                                auction.nftDetails?.name ||
                                auction.collectionData?.name
                              }
                            />
                            <div className="flex items-start justify-start gap-2">
                              <div className="text-xs font-medium leading-none text-neutral-900">
                                {auction.collectionData?.User?.username
                                  ? auction.collectionData?.User?.username
                                  : truncateAddress4char(
                                      auction.collectionData?.userAddress,
                                    )}
                              </div>
                              {auction.collectionData?.User?.isVerified && (
                                <div className="text-xs font-black leading-none text-primary-500">
                                  <FontAwesomeIcon icon={faCircleCheck} />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-sm font-normal leading-tight text-neutral-900">
                            On{' '}
                          </div>
                          <div className="flex items-start justify-start gap-2">
                            <div className="text-sm font-normal leading-tight text-neutral-900">
                              {(auction.collectionData?.chainId === 666888 ||
                                auction.collectionData?.chainId === 8668) && (
                                <HelaIcon className="h-4 w-4" />
                              )}
                            </div>
                            <div className="text-sm font-medium leading-tight text-neutral-900">
                              {auction.collectionData?.Chain?.symbol}
                            </div>
                          </div>
                        </div>
                        <div className="line-clamp-5 h-full w-full text-sm font-light leading-tight text-neutral-900">
                          {auction.collectionData?.description}
                        </div>
                      </div>
                      <div className="inline-flex items-center justify-start gap-4 self-stretch">
                        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                          <div className="self-stretch text-sm font-normal leading-tight text-neutral-900">
                            Highest Bid{' '}
                            <span className="flex flex-col text-sm font-bold leading-tight text-neutral-900">
                              {bidAmount}{' '}
                              {auction.paidWith !== zeroAddress
                                ? balanceToken?.symbol
                                : 'HLUSD'}
                            </span>
                          </div>
                        </div>
                        <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
                          <div className="self-stretch text-sm font-normal leading-tight text-neutral-900">
                            <span className="mr-2 text-sm font-normal leading-tight text-neutral-900">
                              By
                            </span>

                            <span className="text-sm font-bold leading-tight text-neutral-900">
                              {truncateAddress4char(
                                getHighestBid(auction).highestBidder,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ButtonPrimary
                        onClick={() =>
                          handleOpenModalBid(
                            auction.marketId,
                            auction.listingPrice,
                            auction.nftDetails?.imageUri,
                            auction.nftDetails?.tokenId,
                            auction.price,
                            auction.nftDetails?.name,
                            auction.collectionData,
                            getHighestBid(auction),
                            formatEther(getLowestBid(auction)),
                            auction.paidWith,
                          )
                        }
                        disabled={
                          isNotRelease
                            ? true
                            : isNotExpired
                            ? address === auction?.nftDetails?.owner
                              ? true
                              : auction?.listOffers &&
                                auction?.listOffers.some(
                                  (offer) => offer.address === address,
                                )
                              ? true
                              : false
                            : true
                        }
                      >
                        <span className="text-center text-base font-bold leading-normal">
                          {address === auction?.nftDetails?.owner
                            ? 'Owned By You'
                            : auction?.listOffers &&
                              auction?.listOffers.some(
                                (offer) => offer.address === address,
                              )
                            ? 'Offer Already Made'
                            : 'Place Bid'}
                        </span>
                      </ButtonPrimary>
                      <div className="flex w-full flex-col">
                        <div className="inline-flex w-full items-center justify-center gap-2">
                          <div className="text-sm font-medium leading-tight text-gray-600">
                            {isNotRelease ? (
                              <>
                                {' '}
                                <span className="mr-2 text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                                  Starts in
                                </span>
                                <span className="text-neutral-900 dark:text-white">
                                  <Countdown endDate={auction.releaseDate} />
                                </span>
                              </>
                            ) : isNotExpired ? (
                              <>
                                {' '}
                                <span className="mr-2 text-sm font-normal leading-tight text-neutral-900 dark:text-white">
                                  Ends in
                                </span>
                                <span className="text-neutral-900 dark:text-white">
                                  <Countdown endDate={auction.endDate} />
                                </span>
                              </>
                            ) : (
                              'Expired'
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}

        {auctions.length <= 0 &&
          [...Array(1)].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center justify-center gap-4 py-4 lg:flex-row lg:items-start lg:px-10 lg:pt-16">
                <div className="flex flex-col justify-start gap-3 ">
                  <div className="mt-[6rem] flex flex-row items-center self-start rounded-lg bg-[#fff1d4] px-2 py-2">
                    <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                    <div className="whitespace-nowrap text-xs font-semibold text-gray-900">
                      Live auction
                    </div>
                  </div>
                  <div className="relative flex max-w-fit flex-col">
                    <div className="h-72 w-full animate-pulse rounded-2xl bg-gray-300 object-cover lg:w-96" />
                    <div className="h-56 w-full px-5">
                      <div className="inline-flex w-full flex-col justify-center gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
                        <div className="flex flex-col items-start justify-start">
                          <div className="inline-flex items-center justify-start self-stretch">
                            <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                              <div className="h-4 w-20 animate-pulse rounded-full bg-gray-400 text-2xl font-bold leading-9 text-neutral-900"></div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-1">
                          <div className="inline-flex items-center justify-start gap-4">
                            <span className="h-4 w-12 animate-pulse rounded-full bg-gray-400"></span>
                            <span className="h-4 w-12 animate-pulse rounded-full bg-gray-400"></span>
                            <span className="h-4 w-24 animate-pulse rounded-full bg-gray-400"></span>
                          </div>
                          <div className="line-clamp-5 h-full w-full text-sm font-light leading-tight text-neutral-900"></div>
                        </div>
                        <div className="inline-flex items-center justify-start gap-4 self-stretch">
                          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                            <div className="h-4 w-28 animate-pulse self-stretch rounded-full bg-gray-400 text-sm font-normal leading-tight"></div>
                          </div>
                          <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
                            <div className="self-stretch text-sm font-normal leading-tight text-neutral-900">
                              <span className="mr-2 h-4 w-24 animate-pulse rounded-full bg-gray-400 text-sm font-normal leading-tight"></span>
                            </div>
                          </div>
                        </div>

                        <span className="text-center text-base font-bold leading-normal text-white"></span>
                        <div className="flex w-full flex-col">
                          <div className="inline-flex w-full items-center justify-center gap-2">
                            <div className="h-4 w-24 animate-pulse rounded-full bg-gray-400 text-sm font-medium leading-tight"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
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

export default Slideshow;
