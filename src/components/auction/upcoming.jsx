import { useRouter } from 'next-nprogress-bar';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import { Autoplay, Pagination } from 'swiper/modules';
import { truncateAddress } from '@/utils/truncateAddress';
import UpcomingCountdown from '../slideshow/upcomingcountdown';
import { ImageWithFallback } from '../imagewithfallback';
import { formatEther } from 'viem';
const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

export const UpcomingAuction = ({ dataUpcoming }) => {
  const router = useRouter();

  console.log('dataUpcoming', dataUpcoming);

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

  return (
    <>
      <div className="mb-5 mt-5 hidden gap-4 md:hidden lg:flex">
        <div className="group h-[666px] w-2/6 overflow-hidden">
          <div
            style={{
              backgroundImage: `url(${dataUpcoming[0]?.nftDetails?.imageUri})`,
            }}
            className="flex h-[666px] flex-col justify-end rounded-lg bg-white bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[514px] group-hover:transition-all"
          >
            <div className="flex w-fit items-center justify-center gap-2 rounded-lg  p-2">
              <ImageWithFallback
                className="h-full w-full rounded-2xl "
                width={15}
                height={15}
                alt={dataUpcoming[0].collectionData.name}
                diameter={15}
                address={dataUpcoming[0].collectionData?.tokenAddress}
                src={`/uploads/collections/${dataUpcoming[0].collectionData?.logo}`}
              />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-700">
                  {dataUpcoming[0].collectionData.User.username ||
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
              {dataUpcoming[0].nftDetails.name ||
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
            <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
              <div className="flex justify-between gap-5">
                <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                  <div className="flex flex-col">
                    <span className="text-sm">Price</span>
                    <span className="text-sm font-semibold">
                      {formatEther(Number(dataUpcoming[0]?.price))}{' '}
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
                    `/nft/${dataUpcoming[0].collectionData?.tokenAddress}/${dataUpcoming[0].tokenId}`,
                  )
                }
                className="w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap w-4/6 h-[666px]">
          {dataUpcoming.slice(1).map((nft, index) => (
            <>
              <div className="group h-1/2 w-1/2 min-w-max overflow-hidden p-2">
                <div
                  style={{
                    backgroundImage: `url(${nft.nftDetails?.imageUri})`,
                  }}
                  className="flex h-[322px] flex-col justify-end gap-1 rounded-lg bg-white bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all"
                >
                  <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
                    <ImageWithFallback
                      className="h-full w-full rounded-2xl "
                      width={15}
                      height={15}
                      alt={nft.collectionData.name}
                      diameter={15}
                      address={nft.collectionData?.tokenAddress}
                      src={`/uploads/collections/${nft.collectionData?.logo}`}
                    />
                    <div className="flex items-start justify-start gap-2">
                      <div className="text-xs font-medium leading-none text-neutral-700">
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
                  <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                    <div className="flex justify-between gap-5">
                      <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                        <div className="flex flex-col">
                          <span className="text-sm">Price</span>
                          <span className="text-sm font-semibold">
                            {formatEther(Number(dataUpcoming[0]?.price))}{' '}
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
                      className="w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
                    >
                      View Detail
                    </button>
                  </div>
                </div>
              </div>
            </>
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

export const UpcomingAuctionMobile = () => {
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
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="group h-[325px] flex-1 overflow-hidden px-3">
            <div className="flex h-[325px] flex-col justify-end gap-1 rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all">
              <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
                <img
                  className="h-4 w-4 rounded-2xl"
                  src="https://via.placeholder.com/16x16"
                />
                <div className="flex items-start justify-start gap-2">
                  <div className="text-xs font-medium leading-none text-neutral-700">
                    Ryuma
                  </div>
                  <div className="text-xs font-black leading-none text-primary-500">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                </div>
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
                <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-white">
                  1d
                </div>
                <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-white">
                  10m
                </div>
                <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-white">
                  12s
                </div>
                <div className="w-12 rounded-lg bg-white bg-opacity-40 py-3 text-white">
                  1d
                </div>
              </div>
            </div>
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                <div className="flex justify-between gap-5">
                  <div className="grid w-4/6 grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
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
                  onClick={() => router.push('/nft/user')}
                  className="w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
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

export default UpcomingAuction;
