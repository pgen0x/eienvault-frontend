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
import Slideshow from '../slideshow';

const UpcomingAuction = () => {
  return (
    <>
      <div className="mt-5 flex gap-4">
        <div className="group h-[666px] flex-1 overflow-hidden">
          <div className="flex h-[666px] flex-col justify-end rounded-lg bg-[url('https://fakeimg.pl/500x700')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[514px] group-hover:transition-all">
            <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
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
            <div className="mt-2 w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
              Worriness #18
            </div>
            <div className="mt-2 w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
              Auction starts in :
            </div>
            <div className="mt-2 flex w-fit items-center justify-between gap-2 text-center">
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
          <div className="duration-800 h-0 overflow-hidden opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
            <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
              <div className="flex justify-between gap-5">
                <div className="grid w-full grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                  <div className="flex flex-col">
                    <span>Price</span>
                    <span className="font-semibold">0.0 ETH</span>
                  </div>
                  <div className="flex flex-col">
                    <span>Highest bid</span>
                    <span className="font-semibold">No bids yet</span>
                  </div>
                </div>
                <button
                  className="w-full rounded-full bg-primary-200 p-3 text-white"
                  disabled="disabled"
                >
                  Place a bid
                </button>
              </div>
              <a
                href="/nft/user"
                className="w-full w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
              >
                View Detail
              </a>
            </div>
          </div>
        </div>
        <div className="flex h-[666px] flex-1 flex-col justify-between gap-4">
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="flex h-[325px] flex-col justify-end gap-1 rounded-lg bg-[url('https://fakeimg.pl/500x350')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all">
              <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
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
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                <div className="flex gap-2">
                  <div className="grid w-full grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                    <div className="flex flex-col">
                      <span>Price</span>
                      <span className="font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Highest bid</span>
                      <span className="font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button
                    className="w-full rounded-full bg-primary-200 p-3 text-white"
                    disabled="disabled"
                  >
                    Place a bid
                  </button>
                </div>
                <a
                  href="/nft/user"
                  className="w-full w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
                >
                  View Detail
                </a>
              </div>
            </div>
          </div>
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="flex h-[325px] flex-col justify-end gap-1 rounded-lg bg-[url('https://fakeimg.pl/500x350')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all">
              <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
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
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                <div className="flex justify-between gap-5">
                  <div className="grid w-full grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                    <div className="flex flex-col">
                      <span>Price</span>
                      <span className="font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Highest bid</span>
                      <span className="font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button
                    className="w-full rounded-full bg-primary-200 p-3 text-white"
                    disabled="disabled"
                  >
                    Place a bid
                  </button>
                </div>
                <a
                  href="/nft/user"
                  className="w-full w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
                >
                  View Detail
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[666px] flex-1 flex-col justify-between gap-4">
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="flex h-[325px] flex-col justify-end gap-1 rounded-lg bg-[url('https://fakeimg.pl/500x350')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all">
              <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
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
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                <div className="flex justify-between gap-5">
                  <div className="grid w-full grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                    <div className="flex flex-col">
                      <span>Price</span>
                      <span className="font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Highest bid</span>
                      <span className="font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button
                    className="w-full rounded-full bg-primary-200 p-3 text-white"
                    disabled="disabled"
                  >
                    Place a bid
                  </button>
                </div>
                <a
                  href="/nft/user"
                  className="w-full w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
                >
                  View Detail
                </a>
              </div>
            </div>
          </div>
          <div className="group h-[325px] flex-1 overflow-hidden">
            <div className="flex h-[325px] flex-col justify-end gap-1 rounded-lg bg-[url('https://fakeimg.pl/500x350')] bg-cover bg-center p-2 duration-300 ease-in-out group-hover:h-[189px] group-hover:transition-all">
              <div className="flex w-fit items-center justify-center gap-2 rounded-lg bg-white p-2">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="flex w-fit items-center justify-between gap-2 text-center">
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
            <div className="duration-800 h-0 overflow-hidden px-3 opacity-0 ease-in-out group-hover:h-auto group-hover:opacity-100 group-hover:transition-all">
              <div className="flex flex-col gap-2 rounded-b-xl bg-white p-3">
                <div className="flex justify-between gap-5">
                  <div className="grid w-full grid-flow-col justify-stretch rounded-xl bg-gray-200 p-3">
                    <div className="flex flex-col">
                      <span>Price</span>
                      <span className="font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span>Highest bid</span>
                      <span className="font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button
                    className="w-full rounded-full bg-primary-200 p-3 text-white"
                    disabled="disabled"
                  >
                    Place a bid
                  </button>
                </div>
                <a
                  href="/nft/user"
                  className="w-full w-full rounded-full py-1 text-center text-primary-500 hover:bg-primary-50"
                >
                  View Detail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpcomingAuction;
