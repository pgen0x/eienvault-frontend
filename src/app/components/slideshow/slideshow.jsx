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
            <div className="inline-flex w-full flex-col items-center justify-center gap-2 p-2 lg:items-start lg:px-5">
              <div className="flex flex-row items-center rounded-lg bg-[#fff1d4] px-2 py-2">
                <span class="mr-2 h-2 w-2 animate-ping rounded-full bg-red-400 opacity-90"></span>
                <div className="w-24 whitespace-nowrap font-bold leading-[24px] text-[#ff6467]">
                  Live auction
                </div>
              </div>
              <div className="flex h-full max-w-full flex-col items-center justify-center gap-6 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800 lg:h-[340px] lg:flex-row lg:px-4">
                <div className="relative h-[310px] w-[310px]">
                  <Image src={image} layout="fill" objectFit="cover" />
                  <div className="absolute bottom-2 left-2 inline-flex flex-col items-start justify-start gap-2.5">
                    <div className="inline-flex items-start justify-start gap-1.5 rounded bg-zinc-600 bg-opacity-40 px-1.5">
                      <div className="text-lg font-medium leading-relaxed text-white">
                        Auction end in :
                      </div>
                    </div>
                    <div className="inline-flex items-start justify-start gap-2">
                      <div className="inline-flex w-10 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-600 bg-opacity-40 px-2.5 py-2">
                        <div className="text-base font-medium leading-normal text-white">
                          1d
                        </div>
                      </div>
                      <div className="inline-flex w-10 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-600 bg-opacity-40 px-2.5 py-2">
                        <div className="text-base font-medium leading-normal text-white">
                          6h
                        </div>
                      </div>
                      <div className="inline-flex w-10 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-600 bg-opacity-40 px-2.5 py-2">
                        <div className="text-base font-medium leading-normal text-white">
                          40m
                        </div>
                      </div>
                      <div className="inline-flex w-10 flex-col items-center justify-center gap-2 rounded-lg bg-zinc-600 bg-opacity-40 px-2.5 py-2">
                        <div className="text-base font-medium leading-normal text-white">
                          52s
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="inline-flex h-full w-80 flex-col items-center justify-center gap-4">
                  <div className="flex h-28 flex-col items-start justify-start gap-2 self-stretch">
                    <div className="flex h-16 flex-col items-start justify-start self-stretch">
                      <div className="self-stretch text-xl font-bold leading-loose text-black dark:text-white">
                        Black orange #312
                      </div>
                      <div className="inline-flex items-center justify-start gap-2 self-stretch">
                        <div className="text-xs font-normal leading-none text-neutral-700 dark:text-neutral-200">
                          By
                        </div>
                        <div className="flex items-center justify-center gap-1 rounded-md">
                          <div className="flex h-4 w-4 justify-start gap-px rounded-full">
                            <Image
                              src={Avatar}
                              className="rounded-full"
                              objectFit="contain"
                            />
                          </div>
                          <div className="flex items-start justify-start gap-1">
                            <div className="text-xs font-medium leading-none text-neutral-700 dark:text-neutral-200">
                              Winstreaks23
                            </div>
                            <div className="text-xs font-black leading-none text-sky-400">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-start gap-1">
                          <div className="text-xs font-normal leading-none text-neutral-700 dark:text-neutral-200">
                            On
                          </div>
                          <Ethereum width={12} height={12} />
                          <div className="text-xs font-normal leading-none text-neutral-700 dark:text-neutral-200">
                            ETH
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch text-xs font-normal leading-none text-zinc-700 dark:text-neutral-200">
                      This illustration is inspired by my confusing cat face,
                      her name is swimsuit.{' '}
                    </div>
                  </div>
                  <div className="flex h-16 flex-col items-start justify-start gap-2 self-stretch">
                    <div className="inline-flex items-center justify-start gap-3 self-stretch">
                      <div className="text-xs font-medium leading-none text-zinc-700 dark:text-neutral-200">
                        5 minted
                      </div>
                      <div className="h-1 w-1 rounded-full dark:bg-neutral-200 bg-zinc-700" />
                      <div className="text-xs font-medium leading-none text-zinc-700 dark:text-neutral-200">
                        12 per wallet
                      </div>
                    </div>
                    <div className="inline-flex justify-start gap-2 self-stretch sm:items-center md:flex-col md:items-center">
                      <div className="flex h-9 shrink grow basis-0 items-center justify-center gap-7 rounded-lg  p-1.5">
                        <div className="inline-flex h-7 w-2 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                          <div className="text-xs font-black leading-tight text-sky-400">
                            <FontAwesomeIcon icon={faMinus} />
                          </div>
                        </div>
                        <div className="text-xs font-normal leading-tight text-zinc-700 dark:text-neutral-200">
                          1
                        </div>
                        <div className="inline-flex h-7 w-2 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5">
                          <div className="text-xs font-black leading-tight text-sky-400">
                            <FontAwesomeIcon icon={faPlus} />
                          </div>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 self-stretch rounded-lg bg-sky-400 px-3 py-1.5">
                          <div className="text-xs font-semibold leading-loose text-white">
                            Mint for 0.2 ETH
                          </div>
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
