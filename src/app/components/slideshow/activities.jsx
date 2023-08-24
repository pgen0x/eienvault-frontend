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
      <button className="swiper-prev mr-2 px-4 py-2 rounded-full bg-sky-300 text-white absolute -left-5 z-10"><FontAwesomeIcon icon={faChevronLeft} /></button>
      <Swiper
        className="!pl-5 !pb-5"
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
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full p-3">
              <img className="w-full rounded-2xl z-10" src="https://via.placeholder.com/325x265" />
              <div className="w-full inline-flex flex-col items-center justify-center lg:items-start">
                <div className="w-full px-5 relative flex flex-row">
                  <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white/60 backdrop-blur p-5">
                    <div className="w-full flex flex-col items-start justify-start">
                      <div className="inline-flex items-center justify-between self-stretch">
                        <div className="flex items-center justify-center gap-2 bg-white bg-opacity-70 ">
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
                      <div className="flex justify-between w-full mt-5 py-2">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-next ml-2 px-4 py-2 rounded-full bg-sky-300 text-white absolute -right-5 z-10"><FontAwesomeIcon icon={faChevronRight} /></button>
    </>
  );
};

export default Slideshow;
