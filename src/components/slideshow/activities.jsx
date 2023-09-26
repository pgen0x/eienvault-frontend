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
import { NftItemDetail } from '../nft/itemDetail';
import ModalPutOnSale from '../modal/putOnSale';

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
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);

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

  const handleOpenModalPutonsale = async (tokenId, collectionAddress) => {
    setPutonsaleData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalPutonsale(true);
  };

  function closeModalBid() {
    setisOpenModalBid(false);
  }

  function closeModalBuy() {
    setisOpenModalBuy(false);
  }

  function closeModalPutonsale() {
    setisOpenModalPutonsale(false);
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
                <NftItemDetail
                  key={index}
                  nft={nft.nftDetails}
                  collection={nft.Collection}
                  handleOpenModalBuy={handleOpenModalBuy}
                  handleOpenModalBid={handleOpenModalBid}
                  handleOpenModalPutonsale={handleOpenModalPutonsale}
                  isNotExpired={isNotExpired}
                  isNotRelease={isNotRelease}
                />
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
        isOpenModal={isOpenModalBid}
        onClose={closeModalBid}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModalBid}
      />
      <ModalPutOnSale
        isOpenModal={isOpenModalPutonsale}
        onClose={closeModalPutonsale}
        onModalClose={closeModalPutonsale}
        putonsaledata={putOnSaleData}
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
