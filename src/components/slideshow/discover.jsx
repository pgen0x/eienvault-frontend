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
import { NftItemDetail, NftItemDetailSkeleton } from '../nft/itemDetail';
import ModalShareSocialMedia from '../modal/shareSocialMedia';
import ModalReportNft from '../modal/reportNft';

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
    spaceBetween: 20,
  },
  1280: {
    width: 400,
    spaceBetween: 20,
  },
  1536: {
    width: 400,
    spaceBetween: 20,
  },
  1700: {
    width: 400,
    spaceBetween: 5,
    spaceBetween: 20,
  },
  2200: {
    width: 200,
    spaceBetween: 5,
    spaceBetween: 20,
  },
};

export const SlideshowDiscover = ({ dataDiscover, refreshData }) => {
  const router = useRouter();
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [shareData, setShareData] = useState({});
  const [reportData, setReportData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalShare, setisOpenModalShare] = useState(false);
  const [isOpenModalReport, setisOpenModalReport] = useState(false);

  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const handleOpenModalBuy = async (
    marketId,
    price,
    imageUri,
    name,
    tokenId,
    collectionAddress,
    ChainSymbol,
    ChainName,
  ) => {
    setBuyData({
      marketId,
      price,
      imageUri,
      name,
      tokenId,
      collectionAddress,
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

  const handleOpenModalShare = async (tokenId, collectionAddress) => {
    setShareData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalShare(true);
  };

  const handleOpenModalReport = async (tokenId, collectionAddress) => {
    setReportData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalReport(true);
  };

  function closeModalBid() {
    setisOpenModalBid(false);
  }

  function closeModalBuy() {
    setisOpenModalBuy(false);
  }

  function closeModalShare() {
    setisOpenModalShare(false);
  }

  function closeModalReport() {
    setisOpenModalReport(false);
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
        className="!pb-10"
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
          const endDate = moment.unix(data?.itemDetails?.endDate);
          const releaseDate = moment.unix(data?.itemDetails?.releaseDate);
          const isNotExpired = endDate.isAfter(currentDate);
          const isNotRelease = currentDate.isBefore(releaseDate);

          return (
            <SwiperSlide key={index}>
              <NftItemDetail
                key={index}
                nft={data}
                collection={data.Collection}
                itemDetails={data.itemDetails}
                handleOpenModalBuy={handleOpenModalBuy}
                handleOpenModalBid={handleOpenModalBid}
                handleOpenModalShare={handleOpenModalShare}
                handleOpenModalReport={handleOpenModalReport}
                isNotExpired={isNotExpired}
                isNotRelease={isNotRelease}
              />
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
        refreshData={refreshData}
      />
      <ModalBuy
        isOpenModal={isOpenModalBuy}
        onClose={closeModalBuy}
        dataBuy={buyData}
        buyAction={buyAction}
        onModalClose={closeModalBuy}
        refreshData={refreshData}
      />
      <ModalShareSocialMedia
        isOpenModal={isOpenModalShare}
        onClose={closeModalShare}
        onModalClose={closeModalShare}
        shareData={shareData}
      />
      <ModalReportNft
        isOpenModal={isOpenModalReport}
        onClose={closeModalReport}
        onModalClose={closeModalReport}
        reportData={reportData}
      />
    </>
  );
};

export const SlideshowDiscoverSkeleton = () => {
  return (
    <>
      <Swiper
        className="!pb-10"
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
        {[...Array(5)].map((x, i) => (
          <SwiperSlide key={i}>
            <NftItemDetailSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideshowDiscover;
