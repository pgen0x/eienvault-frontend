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
import { NftItemDetail, NftItemDetailSkeleton } from '../nft/itemDetail';
import ModalPutOnSale from '../modal/putOnSale';
import ModalShareSocialMedia from '../modal/shareSocialMedia';
import ModalReportNft from '../modal/reportNft';

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
    spaceBetween: 20,
  },
  1280: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1440: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  1920: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  2200: {
    slidesPerView: 4,
    spaceBetween: 20,
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
  const [shareData, setShareData] = useState({});
  const [reportData, setReportData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);
  const [isOpenModalShare, setisOpenModalShare] = useState(false);
  const [isOpenModalReport, setisOpenModalReport] = useState(false);

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

  const handleOpenModalPutonsale = async (tokenId, collectionAddress) => {
    setPutonsaleData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalPutonsale(true);
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

  function closeModalPutonsale() {
    setisOpenModalPutonsale(false);
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
        className="!pb-10"
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
                  collection={nft.collectionData}
                  itemDetails={nft}
                  handleOpenModalBuy={handleOpenModalBuy}
                  handleOpenModalBid={handleOpenModalBid}
                  handleOpenModalPutonsale={handleOpenModalPutonsale}
                  handleOpenModalShare={handleOpenModalShare}
                  handleOpenModalReport={handleOpenModalReport}
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

export const SlideshowActivitiesSkeleton = () => {
  return (
    <>
      <Swiper
        className="!pb-10"
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
            <NftItemDetailSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SlideshowActivities;
