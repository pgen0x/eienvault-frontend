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

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

export const SlideshowDiscover = () => {
  const router = useRouter();
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
  return (
    <>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-prev mr-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-300 text-white absolute -left-5 z-10"><FontAwesomeIcon icon={faChevronLeft} /></button>
      <Swiper
        className="!pb-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        navigation={{
          nextEl: ".swiper-next",
          prevEl: ".swiper-prev"
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
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full p-3 group h-[542px]">
              <img className="w-full rounded-2xl z-10 group-hover:h-[250px] h-[290px] group-hover:transition-all ease-in-out duration-300" src="https://via.placeholder.com/325x265" />
              <div className="w-full px-5 inline-flex flex-col items-center justify-center lg:items-start">
                <div className="relative w-full flex flex-row">
                  <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white bg-opacity-50 p-3  backdrop-blur-xl">
                    <div className="w-full flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-between self-stretch">
                        <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2">
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
                        <div className="items-center">
                          <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                      </div>
                      <div className="w-full inline-flex items-center justify-between gap-2 pt-1">
                        <div className="text-xl2 font-medium leading-tight text-gray-600">
                          Sailing #215
                        </div>
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          <Ethereum className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex justify-between w-full mt-5 px-2 py-2 bg-white rounded-md">
                        <div className="flex flex-col items-start truncate text-sm leading-5">
                          <p>Price</p>
                          <p className="font-bold">0.39 ETH</p>
                        </div>
                        <div className="flex flex-col items-start truncate text-sm leading-5">
                          <p>Highest bid</p>
                          <p className="font-bold">No bids yet</p>
                        </div>
                      </div>
                      <div className="flex mt-5 w-full items-center">
                        <FontAwesomeIcon className="mr-5 w-5 h-5 p-3 rounded-full text-primary-500 cursor-pointer hover:bg-primary-50 " icon={faCartPlus} />
                        <button className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2 hover:bg-primary-300">
                          Buy Now
                        </button>
                      </div>
                      <button onClick={() => router.push('/nft/user')} className="bg-white hover:bg-primary-50 text-primary-500 mt-2 w-full py-0 text-center group-hover:py-2 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 rounded-full group-hover:transition-all ease-in-out duration-800">View Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-next ml-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-300 text-white absolute -right-5 z-10"><FontAwesomeIcon icon={faChevronRight} /></button>
    </>
  );
};
export const SlideshowDiscoverSkeleton = () => {
  return (
    <>
      {[...Array(3)].map((x, i) => (
        <div key={i} className="w-full p-3 h-[542px]">
          <div className="w-full h-[290px] bg-gray-300 animate-pulse rounded-2xl" />
          <div className="w-full px-5 inline-flex flex-col items-center justify-center lg:items-start">
            <div className="relative w-full flex flex-row">
              <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white bg-opacity-50 p-3  backdrop-blur-xl">
                <div className="w-full flex flex-col items-start justify-start">
                  <div className="inline-flex items-center justify-between self-stretch">
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
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5 mt-2">
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                      <div className="mt-1 w-24 h-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5 mt-2">
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
}

export default SlideshowDiscover;
