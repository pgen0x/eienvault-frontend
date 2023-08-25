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
import Line from '@/app/assets/icon/line';
import Awan from '@/app/assets/icon/awan';
import Awan2 from '@/app/assets/icon/awan2';
import Dot from '@/app/assets/icon/dot';
import Slideshow from '../slideshow';

const UpcomingAuction = () => {
  return (
    <>
      <div className="flex gap-4 mt-5">
        <div className="flex flex-col p-2 flex-1 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x700')] h-[650px]">
          <div className="w-fit flex items-center justify-center gap-2 rounded-lg bg-white p-2">
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
          <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 mt-2 font-bold text-black">
            Worriness #18
          </div>
          <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 mt-2 text-white">
            Auction starts in :
          </div>
          <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
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
        <div className="flex flex-col justify-between gap-4 flex-1">
          <div className="flex flex-col p-2 flex-1 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')]">
            <div className="w-fit flex items-center justify-center gap-2 rounded-lg bg-white p-2">
              <img className="h-4 w-4 rounded-2xl" src="https://via.placeholder.com/16x16" />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-700">
                  Ryuma
                </div>
                <div className="text-xs font-black leading-none text-primary-500">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </div>
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 mt-2 font-bold text-black">
              Worriness #18
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 mt-2 text-white">
              Auction starts in :
            </div>
            <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
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
          <div className="flex flex-col p-2 flex-1 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')]">
            <div className="w-fit flex items-center justify-center gap-2 rounded-lg bg-white p-2">
              <img className="h-4 w-4 rounded-2xl" src="https://via.placeholder.com/16x16" />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-700">
                  Ryuma
                </div>
                <div className="text-xs font-black leading-none text-primary-500">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </div>
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 mt-2 font-bold text-black">
              Worriness #18
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 mt-2 text-white">
              Auction starts in :
            </div>
            <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
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
        </div>
        <div className="flex flex-col justify-between gap-4 flex-1">
          <div className="flex flex-col p-2 flex-1 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')]">
            <div className="w-fit flex items-center justify-center gap-2 rounded-lg bg-white p-2">
              <img className="h-4 w-4 rounded-2xl" src="https://via.placeholder.com/16x16" />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-700">
                  Ryuma
                </div>
                <div className="text-xs font-black leading-none text-primary-500">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </div>
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 mt-2 font-bold text-black">
              Worriness #18
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 mt-2 text-white">
              Auction starts in :
            </div>
            <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
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
          <div className="flex flex-col p-2 flex-1 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')]">
            <div className="w-fit flex items-center justify-center gap-2 rounded-lg bg-white p-2">
              <img className="h-4 w-4 rounded-2xl" src="https://via.placeholder.com/16x16" />
              <div className="flex items-start justify-start gap-2">
                <div className="text-xs font-medium leading-none text-neutral-700">
                  Ryuma
                </div>
                <div className="text-xs font-black leading-none text-primary-500">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>
              </div>
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 mt-2 font-bold text-black">
              Worriness #18
            </div>
            <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 mt-2 text-white">
              Auction starts in :
            </div>
            <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
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
        </div>
      </div>
    </>
  );
};

export default UpcomingAuction;
