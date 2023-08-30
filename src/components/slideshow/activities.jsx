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

const Slideshow = () => {
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
    <>
      <button className="swiper-prev absolute -left-5 z-10 mr-2 rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <Swiper
        className="!pb-5 !pl-5"
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
            <div className="group h-[494px] w-full p-3">
              <img
                className="z-10 h-[250px] w-full rounded-2xl duration-300 ease-in-out group-hover:h-[210px] group-hover:transition-all"
                src="https://fakeimg.pl/325x265"
              />
              <div className="inline-flex w-full flex-col items-center justify-center lg:items-start">
                <div className="relative flex w-full flex-row px-5">
                  <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 p-3 backdrop-blur">
                    <div className="flex w-full flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-between self-stretch">
                        <div className="flex items-center justify-center gap-2 bg-white bg-opacity-70 ">
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
                        <div className="items-center">
                          <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                      </div>
                      <div className="inline-flex w-full items-center justify-between gap-2 pt-1">
                        <div className="text-xl2 font-medium leading-tight text-gray-600">
                          Sailing #215
                        </div>
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          <Ethereum className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="mt-5 flex w-full justify-between py-2">
                        <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                          <p>Price</p>
                          <p className="font-bold">0.39 ETH</p>
                        </div>
                        <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                          <p>Highest bid</p>
                          <p className="font-bold">No bids yet</p>
                        </div>
                      </div>
                      <div className="mt-5 flex w-full items-center">
                        <FontAwesomeIcon
                          className="mr-5 h-5 w-5 cursor-pointer rounded-full p-3 text-primary-500 hover:bg-primary-50 "
                          icon={faCartPlus}
                        />
                        <button className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                          Buy Now
                        </button>
                      </div>
                      <a
                        href="/nft/user"
                        className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all"
                      >
                        View Detail
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-next absolute -right-5 z-10 ml-2 rounded-full bg-primary-500 px-4 py-2 text-white hover:bg-primary-300">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </>
  );
};

export default Slideshow;
