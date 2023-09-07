// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/assets/icon/rightarrow';
import LeftArrow from '@/assets/icon/lefarrow';
import Ethereum from '@/assets/icon/ethereum';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import Avatar from '@/assets/images/avatar.jpg';

import { Autoplay, Pagination } from 'swiper/modules';
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

export const SlideshowCreator = () => {
  const sliderBreakPoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
      width: 280,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      width: 280,
    },
    1280: {
      width: 280,
    },
    1536: {
      width: 280,
    },
    1700: {
      width: 280,
      spaceBetween: 5,
    },
    2200: {
      width: 280,
      spaceBetween: 5,
    },
  };
  return (
    <>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-prev absolute -left-5 z-10 mr-2 rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <Swiper
        className="!pb-10"
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
            <div className="inline-flex w-full flex-col items-center justify-center lg:items-start">
              <div className="relative flex flex-row">
                <div className="inline-flex px-3 flex-col items-start justify-start">
                  <img
                    className="z-10 w-full rounded-tl-2xl rounded-tr-2xl"
                    src="https://fakeimg.pl/287x149"
                  />
                  <div className="w-full gap-4 rounded-bl-2xl rounded-br-2xl bg-white p-5">
                    <div className="flex w-full flex-col items-start justify-start">
                      <div className="z-10 -mt-[70px] flex items-center justify-center">
                        <img
                          className="h-20 w-20 rounded-full border-[3px]"
                          src="https://fakeimg.pl/70x70"
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-2 bg-white bg-opacity-70">
                        <div className="text-xl2 font-medium leading-tight text-gray-600">
                          Pelukis Handal
                        </div>
                        <div className="text-xs font-black leading-none text-primary-500">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </div>
                      <div className="inline-flex h-14 items-center justify-between self-stretch overflow-hidden text-ellipsis pt-5 text-sm">
                        <p>
                          In our group, we specialize in creating awe-inspiring
                          paintinng
                        </p>
                      </div>
                      <div className="my-2 flex w-full justify-between rounded-md bg-white py-2 text-center text-sm">
                        <div className="flex w-full flex-col">
                          <div className="font-semibold">$678M</div>
                          <div className="">Volume</div>
                        </div>
                        <div className="flex w-full flex-col">
                          <div className="font-semibold">237</div>
                          <div className="">Drops</div>
                        </div>
                        <div className="flex w-full flex-col">
                          <div className="font-semibold">128</div>
                          <div className="">Artist</div>
                        </div>
                      </div>
                      <div className="flex w-full gap-2">
                        <button className="w-full rounded-full bg-primary-500 p-1 text-center text-sm font-semibold text-white hover:bg-primary-300">
                          <FontAwesomeIcon icon={faPlus} />
                          <span className="ml-2 ">Follow</span>
                        </button>
                        <button className="w-full rounded-full p-1 px-1 py-1 text-center text-sm font-semibold text-primary-500 hover:bg-primary-50">
                          Visit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="hidden sm:hidden md:block lg:block xl:block 2xl:block swiper-next absolute -right-5 z-10 ml-2 rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export const SlideshowCreatorSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((x, i) => (
        <div className="inline-flex w-[280px]  flex-col items-center justify-center lg:items-start">
          <div className="relative flex flex-row">
            <div className="inline-flex flex-col items-start justify-start">
              <div className="w-[280px] h-[145px] bg-gray-300 animate-pulse z-10 w-full rounded-t-2xl" />
              <div className="w-[280px] gap-4 rounded-bl-2xl rounded-br-2xl bg-white p-5">
                <div className="flex w-full flex-col items-start justify-start">
                  <div className="z-10 -mt-[70px] flex items-center justify-center">
                    <div className="h-20 w-20 bg-gray-300 animate-pulse rounded-full border-[3px]" />
                  </div>
                  <div className="mt-2 w-[132px] h-3 bg-gray-300 animate-pulse rounded-full" />
                  <div className="mt-5 w-[90%] h-2 bg-gray-300 animate-pulse rounded-full" />
                  <div className="mt-2 w-[95%] h-2 bg-gray-300 animate-pulse rounded-full" />
                  <div className="mt-2 w-full h-2 bg-gray-300 animate-pulse rounded-full" />
                  <div className="my-2 flex w-full gap-5 justify-between rounded-md bg-white py-2 text-center text-sm">
                    <div className="flex w-full flex-col">
                      <div className="w-full h-2 mt-2 bg-gray-300 animate-pulse rounded-full" />
                      <div className="w-full h-2 mt-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="w-full h-2 mt-2 bg-gray-300 animate-pulse rounded-full" />
                      <div className="w-full h-2 mt-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                    <div className="flex w-full flex-col">
                      <div className="w-full h-2 mt-2 bg-gray-300 animate-pulse rounded-full" />
                      <div className="w-full h-2 mt-3 bg-gray-300 animate-pulse rounded-full" />
                    </div>
                  </div>
                  <div className="flex w-full gap-5">
                    <div className="w-full h-8 mt-1 bg-gray-300 animate-pulse rounded-full" />
                    <div className="w-full h-8 mt-1 bg-gray-300 animate-pulse rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
      )}
    </>
  );
}

export default SlideshowCreator;
