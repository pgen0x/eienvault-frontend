import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import ModalBid from '@/components/modal/bid';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAccount, useWalletClient } from 'wagmi';
import ButtonPrimary from '../button/buttonPrimary';
import ModalBuy from '../modal/buy';
import ModalPutOnSale from '../modal/putOnSale';
import ModalRemove from '../modal/remove';
import ModalShareSocialMedia from '../modal/shareSocialMedia';
import { NftItemDetail, NftItemDetailSkeleton } from '../nft/itemDetail';

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

export const RelatedNFTs = ({ dataRelatedNFTs, refreshData }) => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});
  const [shareData, setShareData] = useState({});
  const [removeData, setRemoveData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);
  const [isOpenModalShare, setisOpenModalShare] = useState(false);
  const [isOpenModalRemove, setisOpenModalRemove] = useState(false);

  const handleOpenModalBuy = async (
    marketId,
    price,
    imageUri,
    name,
    tokenId,
    collectionAddress,
    ChainSymbol,
    ChainName,
    ChainId,
    TokenSymbol,
    paidWith,
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
      ChainId,
      TokenSymbol,
      paidWith,
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

  const handleOpenModalRemove = async (
    marketId,
    tokenId,
    collectionAddress,
  ) => {
    setRemoveData({
      marketId,
      tokenId,
      collectionAddress,
    });
    setisOpenModalRemove(true);
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

  function closeModalRemove() {
    setisOpenModalRemove(false);
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
    } catch (error) {}
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
    } catch (error) {}
  };

  return (
    <>
      <ButtonPrimary className="swiper-prev-activities absolute -left-5 top-1/2 z-10 mr-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </ButtonPrimary>
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
        {dataRelatedNFTs &&
          dataRelatedNFTs.map((nft, index) => {
            const currentDate = moment();
            const endDate = moment.unix(nft?.endDate);
            const releaseDate = moment.unix(nft?.releaseDate);
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
                  handleOpenModalRemove={handleOpenModalRemove}
                  releaseDate={nft?.releaseDate}
                  endDate={nft?.endDate}
                  isNotExpired={isNotExpired}
                  isNotRelease={isNotRelease}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
      <ButtonPrimary className="swiper-next-activities absolute -right-5 top-1/2 z-10 ml-2 hidden !w-fit sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </ButtonPrimary>
      <ModalBuy
        isOpenModal={isOpenModalBuy}
        onClose={closeModalBuy}
        dataBuy={buyData}
        buyAction={buyAction}
        onModalClose={closeModalBuy}
        refreshData={refreshData}
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
      <ModalRemove
        isOpenModal={isOpenModalRemove}
        onClose={closeModalRemove}
        removeData={removeData}
        refreshData={refreshData}
      />
    </>
  );
};

export const RelatedNFTsSkeleton = () => {
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
            <NftItemDetailSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RelatedNFTs;
