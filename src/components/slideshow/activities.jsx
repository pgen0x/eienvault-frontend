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

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

export const SlideshowActivities = () => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [auctionData, setAcutionData] = useState({});
  const [placeBidHash, setPlaceBidHash] = useState();
  const { address } = useAccount();

  const { data: walletClient } = useWalletClient();

  const sliderBreakPoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
      width: 350,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    1024: {
      width: 495,
    },
    1280: {
      width: 350,
    },
    1536: {
      width: 350,
    },
    1700: {
      width: 350,
      spaceBetween: 5,
    },
    2200: {
      width: 350,
      spaceBetween: 5,
    },
  };

  useEffect(() => {
    getNfts();
  }, []);

  const getNfts = async () => {
    await axios.request({
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
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  }

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
      return 'No bids'; // Return a message if there are no bids
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

  return (
    <>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-prev-activities mr-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-300 text-white absolute -left-5 z-10"><FontAwesomeIcon icon={faChevronLeft} /></button>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: ".swiper-next-activities",
          prevEl: ".swiper-prev-activities"
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
        {nfts && nfts.map((nft, index) => (
          <SwiperSlide key={index}>
            <div className="w-full p-3 group h-[494px]">
              <Suspense fallback={<div className="w-full h-[250px] bg-gray-300 animate-pulse rounded-2xl" />}>
                <Image
                  className="w-full rounded-2xl z-10 group-hover:h-[210px] h-[250px] group-hover:transition-all ease-in-out duration-300 object-cover"
                  src={nft.nftDetails.imageUri ? nft.nftDetails.imageUri : 'https://placehold.co/325x265.png'}
                  blurDataURL={nft.nftDetails.imageUri ? nft.nftDetails.imageUri : 'https://placehold.co/325x265.png'}
                  alt={nft.nftDetails.name ? nft.nftDetails.name : ''}
                  width={325}
                  height={265}
                  placeholder="blur"
                  objectFit="cover"
                />
              </Suspense>
              <div className="w-full inline-flex flex-col items-center justify-center lg:items-start">
                <div className="w-full px-5 relative flex flex-row">
                  <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 backdrop-blur p-3">
                    <div className="w-full flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-between self-stretch">
                        <div className="flex items-center justify-center gap-2 bg-white bg-opacity-70 ">
                          <Image
                            src={nft.collectionData.logo ? `/uploads/collections/${nft.collectionData.logo}` : 'https://placehold.co/16x16.png'}
                            alt={nft.collectionData.name ? nft.collectionData.name : (nft.collectionData.tokenAddress ? nft.collectionData.tokenAddress : '')}
                            width={16}
                            height={16}
                            className="rounded-2xl"
                            objectFit="cover"
                          />
                          <div className="flex items-start justify-start gap-2">
                            <div className="text-xs font-medium leading-none text-neutral-700">
                              {nft.collectionData.name ? nft.collectionData.name : (nft.collectionData.tokenAddress ? nft.collectionData.tokenAddress : '')}
                            </div>
                            <div className="text-xs font-black leading-none text-primary-500">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                          </div>
                        </div>
                        <div className="items-center">
                          <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                      </div>
                      <div className="w-full inline-flex items-center justify-between gap-2 pt-1">
                        <div className="text-xl2 font-medium leading-tight text-gray-600">
                          {nft.nftDetails.name ? nft.nftDetails.name : ''} #{nft.nftDetails.tokenId ? nft.nftDetails.tokenId : ''}
                        </div>
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          <Ethereum className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex justify-between w-full mt-5 py-2">
                        <div className="flex flex-col items-start truncate text-sm leading-5">
                          <p>Price</p>
                          <p className="font-bold">{nft.nftDetails.price ? formatEther(Number(nft.nftDetails.price)) : '0.00'} {nft.collectionData.Chain.symbol ? nft.collectionData.Chain.symbol : '-'}</p>
                        </div>
                        <div className="flex flex-col items-start truncate text-sm leading-5">
                          <p>Highest bid</p>
                          <p className="font-bold">No bids yet</p>
                        </div>
                      </div>
                      {!nft.isAuctioned && (
                        <div className="flex mt-5 w-full items-center">
                          <FontAwesomeIcon className="mr-5 w-5 h-5 p-3 rounded-full text-primary-500 cursor-pointer hover:bg-primary-50 " icon={faCartPlus} />
                          <button className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2 hover:bg-primary-300">
                            Buy Now
                          </button>
                        </div>
                      )}
                      {nft.isAuctioned && (
                        <div className="flex mt-5 w-full items-center">
                          <button
                            className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2 hover:bg-primary-300"
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
                          >
                            Place a bid
                          </button>
                        </div>
                      )}
                      <button onClick={() => router.push('/nft/user')} className="bg-white hover:bg-primary-50 text-primary-500 mt-2 w-full py-0 text-center group-hover:py-2 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 rounded-full group-hover:transition-all ease-in-out duration-800">View Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-next-activities ml-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-300 text-white absolute -right-5 z-10"><FontAwesomeIcon icon={faChevronRight} /></button>
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
      {[...Array(5)].map((x, i) => (
        <div key={i} className="w-full p-3 group h-[494px]">
          <div className="w-full h-[250px] bg-gray-300 animate-pulse rounded-2xl" />
          <div className="w-full inline-flex flex-col items-center justify-center lg:items-start">
            <div className="w-full px-5 relative flex flex-row">
              <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 backdrop-blur p-3">
                <div className="w-full flex flex-col items-start justify-start">
                  <div className="inline-flex items-center justify-between self-stretch mt-2">
                    <div className="flex items-center justify-center gap-2 rounded-lg p-2">
                      <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                      <div className="flex items-start justify-start gap-2">
                        <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
                      </div>
                    </div>
                    <div className="items-center">
                      <div className="w-6 h-2 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                  </div>
                  <div className="mt-3 w-full inline-flex items-center justify-between gap-2 pt-1">
                    <div className="w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                    <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                  </div>
                  <div className="flex justify-between w-full mt-3 py-2">
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                  </div>
                  <div className="flex mt-5 w-full items-center">
                    <div className="mr-5 w-16 h-12 p-3 rounded-full bg-gray-300 animate-pulse" />
                    <div className="w-full h-12 p-3 rounded-full bg-gray-300 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SlideshowActivities;
