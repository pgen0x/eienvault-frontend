// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/app/assets/icon/rightarrow';
import LeftArrow from '@/app/assets/icon/lefarrow';
import Ethereum from '@/app/assets/icon/ethereum';
import Cat from '@/app/assets/images/cat.png';
import Hos from '@/app/assets/images/hos.jpg';
import Avatar from '@/app/assets/images/avatar.jpg';

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
  faCartPlus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

const Slideshow = () => {
  const sliderBreakPoints = {
    640: {
      slidesPerView: 2,
      spaceBetween: 5,
      width: 400,
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
      <Swiper
        className="pl-5"
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
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
            <img className="w-[360px] rounded-2xl relative top-8 -left-4 z-10" src="https://via.placeholder.com/325x265" />
            <div className="w-[330px] inline-flex flex-col items-center justify-center lg:items-start">
              <div className="relative flex flex-row">
                <div className="my-3 w-[330px] inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white bg-opacity-50 p-5  backdrop-blur-xl">
                  <div className="w-full flex flex-col items-start justify-start">
                    <div className="inline-flex items-center justify-between self-stretch pt-5">
                      <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2">
                        <img
                          className="h-4 w-4 rounded-2xl"
                          src="https://via.placeholder.com/16x16"
                        />
                        <div className="flex items-start justify-start gap-2">
                          <div className="text-xs font-medium leading-none text-neutral-700">
                            Ryuma
                          </div>
                          <div className="text-xs font-black leading-none text-sky-400">
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
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                        <p>Price</p>
                        <p className="font-bold">0.39 ETH</p>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                        <p>Highest bid</p>
                        <p className="font-bold">No bids yet</p>
                      </div>
                    </div>
                    <div className="flex mt-5 w-full">
                      <FontAwesomeIcon className="mr-5 py-3 text-sky-400" icon={faCartPlus} />
                      <button className="w-full text-center text-base font-bold text-white bg-sky-400 rounded-full px-4 py-2">
                        Buy Now
                      </button>
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
