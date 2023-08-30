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

const SlideshowCreator = () => {
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
      <button className="swiper-prev mr-2 px-4 py-2 rounded-full bg-primary-400 text-white absolute -left-5 z-10"><FontAwesomeIcon icon={faChevronLeft} /></button>
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
            <div className="w-[280px] inline-flex flex-col items-center justify-center lg:items-start">
              <div className="relative flex flex-row">
                <div className="inline-flex flex-col items-start justify-start">
                  <img className="w-full rounded-tr-2xl rounded-tl-2xl z-10" src="https://via.placeholder.com/287x149" />
                  <div className="p-5 bg-white w-[280px] rounded-br-2xl rounded-bl-2xl gap-4">
                    <div className="w-full flex flex-col items-start justify-start">
                      <div className="flex items-center justify-center -mt-[70px] z-10">
                        <img className="h-20 w-20 rounded-full border-[3px]" src="https://via.placeholder.com/70x70" />
                      </div>
                      <div className="flex items-center justify-center gap-2 bg-white bg-opacity-70 mt-2">
                        <div className="text-xl2 font-medium leading-tight text-gray-600">
                          Pelukis Handal
                        </div>
                        <div className="text-xs font-black leading-none text-primary-500">
                          <FontAwesomeIcon icon={faCircleCheck} />
                        </div>
                      </div>
                      <div className="inline-flex text-sm items-center justify-between self-stretch pt-5 text-ellipsis overflow-hidden h-14">
                        <p>
                          In our group, we specialize in creating awe-inspiring paintinng
                        </p>
                      </div>
                      <div className="flex text-center text-sm justify-between my-2 w-full py-2 bg-white rounded-md">
                        <div className="flex flex-col w-full">
                          <div className="font-semibold">$678M</div>
                          <div className="">Volume</div>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="font-semibold">237</div>
                          <div className="">Drops</div>
                        </div>
                        <div className="flex flex-col w-full">
                          <div className="font-semibold">128</div>
                          <div className="">Artist</div>
                        </div>
                      </div>
                      <div className="flex w-full gap-2">
                        <button className="w-full text-sm text-center font-semibold text-white bg-primary-500 hover:bg-primary-300 rounded-full p-1">
                          <FontAwesomeIcon icon={faPlus} />
                          <span className="ml-2 ">Follow</span>
                        </button>
                        <button className="w-full text-sm text-center font-semibold text-primary-500 px-1 py-1 hover:bg-primary-50 rounded-full p-1">
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
      <button className="swiper-next ml-2 px-4 py-2 rounded-full bg-primary-400 text-white absolute -right-5 z-10"><FontAwesomeIcon icon={faChevronRight} /></button>
    </>
  );
};

export default SlideshowCreator;
