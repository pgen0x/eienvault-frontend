// src/Slideshow.js
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import Rightarrow from '@/assets/icon/rightarrow';
import LeftArrow from '@/assets/icon/lefarrow';
import Ethereum from '@/assets/icon/ethereum';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import Avatar from '@/assets/images/avatar.jpg';

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
import Line from '@/assets/icon/line';
import Awan from '@/assets/icon/awan';
import Awan2 from '@/assets/icon/awan2';
import Dot from '@/assets/icon/dot';
import { Slideshow, SlideshowMobile } from '../slideshow';

const Auction = () => {
  return (
    <>
      <section className="relative -top-24 flex w-full items-center justify-center bg-semantic-orange-200">
        <div className="absolute right-0 top-0">
          <Line />
        </div>
        <div className="absolute bottom-28 right-[12%] h-[582px] w-[582px] translate-y-1/3 items-center justify-center rounded-full bg-red-400" />
        <div className="absolute right-[29vw] top-32">
          <Awan />
        </div>
        <div className="absolute bottom-3 right-0 -translate-x-16 translate-y-4">
          <Awan2 />
        </div>
        <div className="container m-auto">
          <div className="relative md: pt-24 lg:pt-10 mb-5 hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex w-full flex-initial items-center justify-center">
              <Slideshow />
          </div>
          <div className="relative mb-5 flex sm:flex md:hidden lg:hidden xl:hidden 2xl:hidden w-full flex-initial items-center justify-center">
              <SlideshowMobile />
            </div>
        </div>
      </section>
    </>
  );
};

export default Auction;
