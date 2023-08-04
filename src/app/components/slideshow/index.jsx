// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/app/assets/icon/rightarrow';
import LeftArrow from '@/app/assets/icon/lefarrow';
import Ethereum from '@/app/assets/icon/ethereum';
import Cat from '@/app/assets/images/cat.png';
import Hos from '@/app/assets/images/hos.jpg';
import Avatar from '@/app/assets/images/avatar.jpg';

import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import {
  faCircleCheck,
  faChevronRight,
  faChevronLeft,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

const Slideshow = () => {
  const sliderBreakPoints = {
    640: {
      slidesPerView: 1,
      spaceBetween: 5,
      width: 400,
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
  return (
    <>
      {/* <div className="absolute left-[498px] top-[1/2] inline-flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-sky-400 bg-opacity-50">
          <div className="text-2xl font-black leading-9 text-white">
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
        </div>
        <div className="absolute right-[162px] top-[1/2] inline-flex h-12 w-12 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-sky-400 bg-opacity-50">
          <div className="text-2xl font-black leading-9 text-white">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div> */}
      <Swiper
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="inline-flex w-full flex-col items-center justify-center gap-2 p-2 lg:items-start lg:px-10 lg:pt-16">
              <div className="flex flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                <span class="mr-2 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-90"></span>
                <div className="w-24 whitespace-nowrap font-bold leading-[24px] text-[#ff6467]">
                  Live auction
                </div>
              </div>
              <div className="relative flex h-96 w-96 flex-row">
                <img
                  className="h-96 w-96 rounded-2xl "
                  src="https://via.placeholder.com/275x404"
                />
                <div className="my-3 inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-tr-2xl bg-white bg-opacity-50 p-5  backdrop-blur-xl">
                  <div className="flex flex-col items-start justify-start">
                    <div className="inline-flex items-center justify-start self-stretch">
                      <div className="flex h-full shrink grow basis-0 items-end justify-start gap-2">
                        <div className="text-2xl font-bold leading-9 text-neutral-700">
                          Kaido ryu
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex items-center justify-start gap-2">
                      <div className="text-sm font-medium leading-tight text-gray-600">
                        5 minted
                      </div>
                      <div className="h-1 w-1 rounded-full bg-gray-600" />
                      <div className="text-sm font-medium leading-tight text-gray-600">
                        12 per wallet
                      </div>
                      <div className="h-1 w-1 rounded-full bg-gray-600" />
                      <div className="text-sm font-medium leading-tight text-gray-600">
                        1d 2h 32m 12s
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start gap-1">
                    <div className="inline-flex items-start justify-start gap-1 self-stretch">
                      <div className="shrink grow basis-0 text-sm font-normal leading-tight text-neutral-700">
                        Creator
                      </div>
                    </div>
                    <div className="inline-flex items-center justify-start gap-4">
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
                            circle-check
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-normal leading-tight text-neutral-700">
                        On{' '}
                      </div>
                      <div className="flex items-start justify-start gap-2">
                        <div className="text-sm font-normal leading-tight text-neutral-700">
                          ETHereum
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
                      <div className="inline-flex h-11 items-center justify-center gap-8 self-stretch rounded-xl bg-white p-1.5">
                        <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                          <div className="text-xs font-black leading-tight text-sky-400">
                            Minus
                          </div>
                        </div>
                        <div className="text-xs font-normal leading-tight text-zinc-700">
                          1
                        </div>
                        <div className="inline-flex h-6 w-6 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                          <div className="text-xs font-black leading-tight text-sky-400">
                            Plus
                          </div>
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
                      <div className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-lg bg-sky-400 px-4 py-2">
                        <div className="text-center text-base font-bold leading-normal text-white">
                          Mint
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
