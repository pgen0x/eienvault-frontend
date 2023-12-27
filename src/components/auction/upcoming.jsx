import { useRouter } from 'next-nprogress-bar';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { truncateAddress } from '@/utils/truncateAddress';
import UpcomingCountdown from '../slideshow/upcomingcountdown';
import { ImageWithFallback } from '../imagewithfallback';
import { formatEther } from 'viem';
import ButtonTertiary from '../button/buttonTertiary';

const getHighestBid = (auctionData) => {
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
};

export const UpcomingAuction = ({ dataUpcoming }) => {
  const router = useRouter();

  return (
    <>
      <div className="mb-5 mt-5 gap-4 md:flex">
        <div className="group hidden h-[666px] w-2/6 overflow-hidden lg:block">
          <div
            style={{
              backgroundImage: `url(${dataUpcoming[0]?.nftDetails?.imageUri})`,
            }}
            className="flex h-[666px] flex-col justify-end rounded-lg bg-white bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[514px] group-hover:transition-all"
          >
            <div
              className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-2"
              onClick={() =>
                router.push(
                  `/collection/${
                    dataUpcoming[0].collectionData?.slug
                      ? dataUpcoming[0].collectionData?.slug
                      : dataUpcoming[0].collectionData?.tokenAddress
                      ? dataUpcoming[0].collectionData?.tokenAddress
                      : ''
                  }`,
                )
              }
            >
              <ImageWithFallback
                className="h-full w-full rounded-2xl "
                width={15}
                height={15}
                alt={dataUpcoming[0].collectionData.name}
                diameter={15}
                address={dataUpcoming[0].collectionData?.tokenAddress}
                src={`${process.env.NEXT_PUBLIC_CDN_URL}/${dataUpcoming[0].collectionData?.logo}`}
              />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-900">
                  {dataUpcoming[0].collectionData.name ||
                    truncateAddress(
                      dataUpcoming[0].collectionData.tokenAddress,
                    )}
                </div>
                <div className="text-xs font-black leading-none text-primary-500">
                  {dataUpcoming[0].collectionData?.User.isVerified && (
                    <FontAwesomeIcon icon={faCircleCheck} />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-2 w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
              {dataUpcoming[0].nftDetails?.name ||
                dataUpcoming[0].collectionData?.name}{' '}
              #{dataUpcoming[0].tokenId}
            </div>
            <div className="mt-2 w-fit rounded-lg bg-white bg-opacity-40 p-2 text-gray-700">
              Auction starts in :
            </div>
            <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
              <UpcomingCountdown endDate={dataUpcoming[0].endDate} />
            </div>
          </div>
          <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
            <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3 dark:bg-neutral-900 dark:text-white">
              <div className="flex justify-between gap-5">
                <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3 dark:bg-neutral-700">
                  <div className="flex flex-col">
                    <span className="text-sm">Price</span>
                    <span className="text-sm font-semibold">
                      {formatEther(dataUpcoming[0]?.price)}{' '}
                      {dataUpcoming[0].collectionData?.Chain.symbol}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">Highest bid</span>
                    <span className="text-sm font-semibold">
                      {formatEther(getHighestBid(dataUpcoming[0]).highestBid)}{' '}
                      {dataUpcoming[0].collectionData?.Chain?.symbol}
                    </span>
                  </div>
                </div>
                <button
                  className="w-2/6 rounded-full bg-primary-200 p-3 text-white"
                  disabled="disabled"
                >
                  Place a bid
                </button>
              </div>
              <ButtonTertiary
                onClick={() =>
                  router.push(
                    `/nft/${dataUpcoming[0].collectionData?.tokenAddress}/${dataUpcoming[0].tokenId}`,
                  )
                }
              >
                View Detail
              </ButtonTertiary>
            </div>
          </div>
        </div>
        <div className="flex h-[666px] w-full flex-wrap lg:w-4/6">
          {dataUpcoming.slice(1).map((nft, index) => (
            <div
              className="group h-1/2 w-1/2 min-w-max overflow-hidden p-2"
              key={index}
            >
              <div
                style={{
                  backgroundImage: `url(${nft.nftDetails?.imageUri})`,
                }}
                className="flex h-[322px] flex-col justify-end gap-1 rounded-lg bg-white bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all"
              >
                <div
                  className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-2"
                  onClick={() =>
                    router.push(
                      `/collection/${
                        nft.collectionData?.slug
                          ? nft.collectionData?.slug
                          : nft.collectionData?.tokenAddress
                          ? nft.collectionData?.tokenAddress
                          : ''
                      }`,
                    )
                  }
                >
                  <ImageWithFallback
                    className="h-full w-full rounded-2xl "
                    width={15}
                    height={15}
                    alt={nft.collectionData.name}
                    diameter={15}
                    address={nft.collectionData?.tokenAddress}
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${nft.collectionData?.logo}`}
                  />
                  <div className="flex items-start justify-start gap-2">
                    <div className="text-xs font-medium leading-none text-neutral-900">
                      {nft.collectionData.User.username ||
                        truncateAddress(nft.collectionData.tokenAddress)}
                    </div>
                    {nft.collectionData?.User.isVerified && (
                      <div className="text-xs font-black leading-none text-primary-500">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                  {nft.nftDetails.name || nft.collectionData?.name} #
                  {nft.tokenId}
                </div>
                <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-gray-700">
                  Auction starts in :
                </div>
                <div className="flex w-fit items-center justify-between gap-2 text-center">
                  <UpcomingCountdown endDate={nft.endDate} />
                </div>
              </div>
              <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
                <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3 dark:bg-neutral-900 dark:text-white">
                  <div className="flex justify-between gap-5">
                    <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3 dark:bg-neutral-700">
                      <div className="flex flex-col">
                        <span className="text-sm">Price</span>
                        <span className="text-sm font-semibold">
                          {formatEther(dataUpcoming[0]?.price)}{' '}
                          {dataUpcoming[0].collectionData?.Chain.symbol}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">Highest bid</span>
                        <span className="text-sm font-semibold">
                          {formatEther(
                            getHighestBid(dataUpcoming[0]).highestBid,
                          )}{' '}
                          {dataUpcoming[0].collectionData?.Chain?.symbol}
                        </span>
                      </div>
                    </div>
                    <button
                      className="w-2/6 rounded-full bg-primary-200 p-3 text-white"
                      disabled="disabled"
                    >
                      Place a bid
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      router.push(
                        `/nft/${nft.collectionData?.tokenAddress}/${nft.tokenId}`,
                      )
                    }
                    className="w-full rounded-full py-1 text-center font-bold text-primary-500 hover:bg-primary-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                  >
                    View Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const UpcomingAuctionSkeleton = () => {
  return (
    <>
      <div className="mt-5 flex gap-4">
        <div className="group h-[666px] flex-1 overflow-hidden">
          <div className="flex h-[666px] animate-pulse flex-col justify-end rounded-lg bg-gray-400 bg-cover bg-center p-2">
            <div className="flex items-center justify-start gap-2 rounded-lg bg-opacity-70 py-2">
              <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
              <div className="flex items-start justify-start gap-2">
                <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
              </div>
            </div>
            <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
            <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
            <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
              <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
              <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
              <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
              <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
            </div>
          </div>
        </div>
        <div className="flex h-[666px] flex-1 flex-col justify-between gap-4">
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="h-[325px] flex-1 overflow-hidden">
              <div className="flex h-[325px] animate-pulse flex-col justify-end gap-1 rounded-lg bg-gray-400 bg-cover bg-center p-2">
                <div className="flex w-fit items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="h-[325px] flex-1 overflow-hidden">
              <div className="flex h-[325px] animate-pulse flex-col justify-end gap-1 rounded-lg bg-gray-400 bg-cover bg-center p-2">
                <div className="flex w-fit items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[666px] flex-1 flex-col justify-between gap-4">
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="h-[325px] flex-1 overflow-hidden">
              <div className="flex h-[325px] animate-pulse flex-col justify-end gap-1 rounded-lg bg-gray-400 bg-cover bg-center p-2">
                <div className="flex w-fit items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="h-[325px] flex-1 overflow-hidden">
              <div className="flex h-[325px] animate-pulse flex-col justify-end gap-1 rounded-lg bg-gray-400 bg-cover bg-center p-2">
                <div className="flex w-fit items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const UpcomingAuctionMobile = ({ dataUpcoming }) => {
  const router = useRouter();
  const sliderBreakPoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
      width: 350,
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

  return (
    <Swiper
      className="max-h-[360px] !pb-5"
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
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {dataUpcoming.map((nft, index) => (
        <SwiperSlide key={index}>
          <div className="group h-1/2 w-1/2 min-w-max overflow-hidden p-2">
            <div
              style={{
                backgroundImage: `url(${nft.nftDetails?.imageUri})`,
              }}
              className="flex h-[322px] flex-col justify-end gap-1 rounded-lg bg-white bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all"
            >
              <div
                className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-lg bg-white p-2"
                onClick={() =>
                  router.push(
                    `/collection/${
                      nft.collectionData?.slug
                        ? nft.collectionData?.slug
                        : nft.collectionData?.tokenAddress
                        ? nft.collectionData?.tokenAddress
                        : ''
                    }`,
                  )
                }
              >
                <ImageWithFallback
                  className="h-full w-full rounded-2xl "
                  width={15}
                  height={15}
                  alt={nft.collectionData.name}
                  diameter={15}
                  address={nft.collectionData?.tokenAddress}
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${nft.collectionData?.logo}`}
                />
                <div className="flex items-start justify-start gap-2">
                  <div className="text-xs font-medium leading-none text-neutral-900">
                    {nft.collectionData.User.username ||
                      truncateAddress(nft.collectionData.tokenAddress)}
                  </div>
                  {nft.collectionData?.User.isVerified && (
                    <div className="text-xs font-black leading-none text-primary-500">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                  )}
                </div>
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                {nft.nftDetails.name || nft.collectionData?.name} #{nft.tokenId}
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-gray-700">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
                <UpcomingCountdown endDate={nft.endDate} />
              </div>
            </div>
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3 dark:bg-neutral-900 dark:text-white">
                <div className="flex justify-between gap-5">
                  <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3 dark:bg-neutral-700">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">
                        {formatEther(dataUpcoming[0]?.price)}{' '}
                        {dataUpcoming[0].collectionData?.Chain.symbol}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">
                        {formatEther(
                          Number(getHighestBid(dataUpcoming[0]).highestBid),
                        )}{' '}
                        {dataUpcoming[0].collectionData?.Chain?.symbol}
                      </span>
                    </div>
                  </div>
                  <button
                    className="w-2/6 rounded-full bg-primary-200 p-3 text-white"
                    disabled="disabled"
                  >
                    Place a bid
                  </button>
                </div>
                <button
                  onClick={() =>
                    router.push(
                      `/nft/${nft.collectionData?.tokenAddress}/${nft.tokenId}`,
                    )
                  }
                  className="w-full rounded-full py-1 text-center font-bold text-primary-500 hover:bg-primary-50 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const UpcomingAuctionMobileSkeleton = ({ dataUpcoming }) => {
  const sliderBreakPoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
      width: 350,
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

  return (
    <Swiper
      className="max-h-[360px] !pb-5"
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
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {[...Array(5)].map((nft, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="group w-full min-w-max overflow-hidden p-2">
              <div className="flex h-[325px] animate-pulse flex-col justify-end gap-1 rounded-lg bg-gray-400 bg-cover bg-center p-2">
                <div className="flex w-fit items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                  </div>
                </div>
                <div className="mt-2 h-8 w-48 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 h-8 w-40 animate-pulse rounded-lg bg-gray-300 p-2" />
                <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                  <div className="h-12 w-12 animate-pulse rounded-lg bg-gray-300 py-3" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default UpcomingAuction;
