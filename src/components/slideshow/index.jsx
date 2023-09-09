import React, { useState, useEffect } from 'react';
import Ethereum from '@/assets/icon/ethereum';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/legacy/image';
import {
  faCircleCheck,
  faChevronRight,
  faChevronLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '@/hooks/AuthContext';
import { useAccount } from 'wagmi';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import Countdown from './countdown';

const images = [1, 2, 3, 4];

export const Slideshow = () => {
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
      spaceBetween: 24,
      width: 545,
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
  const { token } = useAuth();
  const { address } = useAccount();
  const [auctions, setAuctions] = useState([]);
  const [isErrorAuctions, setErrorAuctions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/market/marketauction`,
          {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          setErrorAuctions(true);
          console.error('Fetch failed:', res);
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();
        console.log(responseData);
        setAuctions(responseData);
      } catch (error) {
        setErrorAuctions(true);
        console.error('Fetch failed:', error);
      } finally {
        setErrorAuctions(false); // Set isLoading to false after fetching data
      }
    };

    fetchData();
  }, [token, address]);

  return (
    <>
      <button className="swiper-prev absolute -left-5 z-10 mr-2 hidden rounded-full bg-primary-400 px-4 py-2 text-white sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
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
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
      >
        {auctions.map((auction, index) => (
          <SwiperSlide key={index}>
            <div className="inline-flex w-full flex-col justify-center gap-2 p-2 lg:items-start lg:pt-16">
              <div className="flex w-fit flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                <div className="whitespace-nowrap text-sm font-semibold text-gray-900">
                  Live mint and auction
                </div>
              </div>
              <div className="relative flex h-full flex-row md:w-full lg:w-full">
                <Image
                  className="h-96 w-full rounded-2xl object-cover lg:w-96"
                  width={500}
                  height={404}
                  placeholder="blur"
                  blurDataURL={auction.nftDetails.imageUri}
                  src={auction.nftDetails.imageUri}
                />
                <div className="my-3 inline-flex h-[357px] w-full flex-col items-start justify-start gap-4 rounded-br-2xl rounded-tr-2xl bg-white bg-opacity-50  p-5 backdrop-blur-xl">
                  <div className="flex flex-col items-start justify-start">
                    <div className="inline-flex items-center justify-start self-stretch">
                      <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                        <div className="text-2xl font-bold leading-9 text-neutral-700">
                          {auction.collectionData.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <div className="inline-flex items-center justify-start gap-4">
                      <span className="text-gray-900">By</span>
                      <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2 ">
                        <Image
                          className="h-full w-full rounded-2xl "
                          width={15}
                          height={15}
                          placeholder="blur"
                          blurDataURL={auction.collectionData.logo}
                          src={`/uploads/collections/${auction.collectionData.logo}`}
                        />
                        <div className="flex items-start justify-start gap-2">
                          <div className="text-xs font-medium leading-none text-neutral-700">
                            {truncateAddress4char(
                              auction.collectionData.userAddress,
                            )}
                          </div>
                          <div className="text-xs font-black leading-none text-primary-500">
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-tight text-neutral-700">
                        On{' '}
                      </div>
                      <div className="flex items-start justify-start gap-2">
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          <HelaIcon className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-medium leading-tight text-neutral-700">
                          HLUSD
                        </div>
                      </div>
                    </div>
                    <div className="line-clamp-6 w-72 text-sm font-light leading-tight text-neutral-700">
                      {auction.collectionData.description}
                    </div>
                  </div>
                  <div className="inline-flex items-start justify-start gap-4 self-stretch">
                    <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                      <div className="self-stretch text-sm font-normal leading-tight text-neutral-700">
                        Highest Bid{' '}
                        <span className="text-sm font-bold leading-tight text-neutral-700">
                          -
                        </span>
                      </div>
                    </div>
                    <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
                      <div className="self-stretch text-sm font-normal leading-tight text-neutral-700">
                        <span className="mr-2 text-sm font-normal leading-tight text-neutral-700">
                          By
                        </span>

                        <span className="text-sm font-bold leading-tight text-neutral-700">
                          {truncateAddress4char(auction.seller)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300">
                    <span className="text-center text-base font-bold leading-normal text-white">
                      Place Bid
                    </span>
                  </button>
                  <div className="inline-flex items-center justify-center gap-2 self-center">
                    <div className="text-center text-sm font-medium leading-tight text-gray-600">
                      <span className="mr-2 text-sm font-normal leading-tight text-neutral-700">
                        Ends in
                      </span>
                      <Countdown endDate={auction.endDate} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {auctions.length <= 0 &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="inline-flex w-full flex-col justify-center gap-2 p-2 lg:items-start lg:pt-16">
                <div className="flex w-fit flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                  <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                  <div className="whitespace-nowrap text-sm font-semibold text-gray-900">
                    Live mint and auction
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
      <button className="swiper-next absolute -right-5 z-10 ml-2 hidden rounded-full bg-primary-400 px-4 py-2 text-white sm:hidden md:block lg:block xl:block 2xl:block">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export const SlideshowMobile = () => {
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
        // autoplay={{
        //   delay: 3000,
        //   disableOnInteraction: false,
        // }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="inline-flex w-[375px] flex-col items-start justify-start gap-2 p-2 lg:items-start lg:px-10 lg:pt-16">
              <div className="mt-[6rem] flex flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                <span className="mr-2 h-1 w-1 animate-ping rounded-full bg-red-400 opacity-90"></span>
                <div className="whitespace-nowrap text-xs font-semibold text-gray-900">
                  Live mint and auction
                </div>
              </div>
              <div className="relative flex w-[375px] flex-col">
                <img
                  className="h-96 w-96 rounded-2xl object-cover"
                  src="https://fakeimg.pl/275x404"
                />
                <div className="w-full px-5">
                  <div className="inline-flex w-full flex-col justify-center gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
                    <div className="flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-start self-stretch">
                        <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                          <div className="text-2xl font-bold leading-9 text-neutral-700">
                            Kaido ryu
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="inline-flex items-center justify-start gap-4">
                        <span className="text-gray-900">By</span>
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2">
                          <img
                            className="h-4 w-4 rounded-2xl"
                            src="https://fakeimg.pl/16x16"
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
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          On{' '}
                        </div>
                        <div className="flex items-start justify-start gap-2">
                          <div className="text-sm font-normal leading-tight text-neutral-700">
                            <Ethereum className="h-4 w-4" />
                          </div>
                          <div className="text-sm font-medium leading-tight text-neutral-700">
                            ETH
                          </div>
                        </div>
                      </div>
                      <div className="h-full w-72 text-sm font-light leading-tight text-neutral-700">
                        Dive into the enchanting world of Dragon Art, where myth
                        and fantasy collide with extraordinary creativity. Our
                        collection of captivating dragon-themed artwork brings
                        these majestic creatures to life.
                      </div>
                    </div>
                    <div className="inline-flex items-start justify-start gap-4 self-stretch">
                      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-center gap-2">
                        <div className="self-stretch text-sm font-normal leading-tight text-neutral-700">
                          Buy amount
                        </div>
                        <div className="inline-flex h-11 items-center justify-center gap-8 self-stretch rounded-full bg-white p-1.5">
                          <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                            <button className="text-xs font-black leading-tight text-primary-500">
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                          </div>
                          <div className="text-xs font-normal leading-tight text-zinc-700">
                            1
                          </div>
                          <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                            <button className="text-xs font-black leading-tight text-primary-500">
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="inline-flex shrink grow basis-0 flex-col items-start justify-start gap-2">
                        <div className="self-stretch text-sm font-normal leading-tight text-neutral-700">
                          <span className="text-sm font-normal leading-tight text-neutral-700">
                            Mint for
                          </span>
                          <span className="text-sm font-light leading-tight text-neutral-700">
                            {' '}
                          </span>
                          <span className="text-sm font-bold leading-tight text-neutral-700">
                            0.3 ETH
                          </span>
                        </div>
                        <div className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-full bg-primary-500 px-4 py-2">
                          <button className="text-center text-base font-bold leading-normal text-white">
                            Mint
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="inline-flex w-full items-center justify-center gap-2">
                        <div className="text-sm font-medium leading-tight text-gray-600">
                          5 minted
                        </div>
                        <div className="h-1 w-1 rounded-full bg-gray-600" />
                        <div className="text-sm font-medium leading-tight text-gray-600">
                          12 per wallet
                        </div>
                      </div>
                      <div className="inline-flex w-full items-center justify-center gap-2">
                        <div className="text-sm font-medium leading-tight text-gray-600">
                          1d 2h 32m 12s
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
    </>
  );
};

export default Slideshow;
