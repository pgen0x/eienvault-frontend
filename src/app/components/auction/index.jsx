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

const Auction = () => {
  return (
    <>
      <section className="relative -top-24 flex h-[632px] w-full items-center justify-center bg-semantic-orange-200">
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
          <div className="flex-initial w-full relative flex items-center justify-center mb-5">
            <Slideshow />
          </div>
        </div>
      </section>
    </>
  );
};

export default Auction;
