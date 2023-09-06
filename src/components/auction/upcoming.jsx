import { useRouter } from 'next-nprogress-bar';
import {
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Swiper, SwiperSlide } from 'swiper/react';
import Cat from '@/assets/images/cat.png';
import Hos from '@/assets/images/hos.jpg';
import { Autoplay, Pagination } from 'swiper/modules';
const images = [Hos, Cat, Hos, Cat, Hos, Cat, Cat]; // Add the image URLs here

export const UpcomingAuction = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex gap-4 mt-5">
        <div className="group flex-1 h-[666px] overflow-hidden">
          <div className="flex flex-col p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x700')] bg-cover bg-center h-[666px] group-hover:h-[514px] group-hover:transition-all ease-in-out duration-300">
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
          <div className="overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
            <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
              <div className="flex justify-between gap-5">
                <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                  <div className="flex flex-col">
                    <span className="text-sm">Price</span>
                    <span className="text-sm font-semibold">0.0 ETH</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm">Highest bid</span>
                    <span className="text-sm font-semibold">No bids yet</span>
                  </div>
                </div>
                <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
              </div>
              <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 flex-1 h-[666px]">
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center h-[325px] group-hover:h-[189px] group-hover:transition-all ease-in-out duration-300">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="w-fit flex gap-2 justify-between items-center text-center">
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
            <div className="px-3 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
              <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
                <div className="flex justify-between gap-5">
                  <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
                </div>
                <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
              </div>
            </div>
          </div>
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center h-[325px] group-hover:h-[189px] group-hover:transition-all ease-in-out duration-300">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="w-fit flex gap-2 justify-between items-center text-center">
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
            <div className="px-3 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
              <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
                <div className="flex justify-between gap-5">
                  <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
                </div>
                <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 flex-1 h-[666px]">
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center h-[325px] group-hover:h-[189px] group-hover:transition-all ease-in-out duration-300">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="w-fit flex gap-2 justify-between items-center text-center">
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
            <div className="px-3 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
              <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
                <div className="flex justify-between gap-5">
                  <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
                </div>
                <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
              </div>
            </div>
          </div>
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center h-[325px] group-hover:h-[189px] group-hover:transition-all ease-in-out duration-300">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="w-fit flex gap-2 justify-between items-center text-center">
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
            <div className="px-3 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
              <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
                <div className="flex justify-between gap-5">
                  <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
                </div>
                <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const UpcomingAuctionSkeleton = () => {
  return (
    <>
      <div className="flex gap-4 mt-5">

        <div className="group flex-1 h-[666px] overflow-hidden">
          <div className="flex flex-col p-2 justify-end rounded-lg bg-gray-400 animate-pulse bg-cover bg-center h-[666px]">
            <div className="flex items-center justify-start gap-2 rounded-lg bg-opacity-70 py-2">
              <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
              <div className="flex items-start justify-start gap-2">
                <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
              </div>
            </div>
            <div className="bg-gray-300 animate-pulse w-48 h-8 rounded-lg p-2 mt-2" />
            <div className="bg-gray-300 animate-pulse w-40 h-8 rounded-lg p-2 mt-2" />
            <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
              <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
              <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
              <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
              <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 flex-1 h-[666px]">
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex-1 h-[325px] overflow-hidden">
              <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-gray-400 animate-pulse bg-cover bg-center h-[325px]">
                <div className="w-fit flex items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
                  </div>
                </div>
                <div className="bg-gray-300 animate-pulse w-48 h-8 rounded-lg p-2 mt-2" />
                <div className="bg-gray-300 animate-pulse w-40 h-8 rounded-lg p-2 mt-2" />
                <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex-1 h-[325px] overflow-hidden">
              <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-gray-400 animate-pulse bg-cover bg-center h-[325px]">
                <div className="w-fit flex items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
                  </div>
                </div>
                <div className="bg-gray-300 animate-pulse w-48 h-8 rounded-lg p-2 mt-2" />
                <div className="bg-gray-300 animate-pulse w-40 h-8 rounded-lg p-2 mt-2" />
                <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 flex-1 h-[666px]">
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex-1 h-[325px] overflow-hidden">
              <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-gray-400 animate-pulse bg-cover bg-center h-[325px]">
                <div className="w-fit flex items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
                  </div>
                </div>
                <div className="bg-gray-300 animate-pulse w-48 h-8 rounded-lg p-2 mt-2" />
                <div className="bg-gray-300 animate-pulse w-40 h-8 rounded-lg p-2 mt-2" />
                <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="group flex-1 h-[325px] overflow-hidden">
            <div className="flex-1 h-[325px] overflow-hidden">
              <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-gray-400 animate-pulse bg-cover bg-center h-[325px]">
                <div className="w-fit flex items-center justify-center gap-2 rounded-lg p-2">
                  <div className="h-4 w-4 rounded-2xl animate-pulse bg-gray-300" />
                  <div className="flex items-start justify-start gap-2">
                    <div className="bg-gray-300 animate-pulse w-16 h-4 rounded-lg" />
                  </div>
                </div>
                <div className="bg-gray-300 animate-pulse w-48 h-8 rounded-lg p-2 mt-2" />
                <div className="bg-gray-300 animate-pulse w-40 h-8 rounded-lg p-2 mt-2" />
                <div className="w-fit flex gap-2 justify-between items-center mt-2 text-center">
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                  <div className="bg-gray-300 animate-pulse w-12 h-12 rounded-lg py-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export const UpcomingAuctionMobile = () => {
  const router = useRouter();
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
    <Swiper
      className="!pb-5"
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
          <div className="group px-3 flex-1 h-[325px] overflow-hidden">
            <div className="flex flex-col gap-1 p-2 justify-end rounded-lg bg-[url('https://via.placeholder.com/500x350')] bg-cover bg-center h-[325px] group-hover:h-[189px] group-hover:transition-all ease-in-out duration-300">
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
              <div className="w-fit rounded-lg bg-white bg-opacity-70 p-2 font-bold text-black">
                Worriness #18
              </div>
              <div className="w-fit rounded-lg bg-white bg-opacity-40 p-2 text-white">
                Auction starts in :
              </div>
              <div className="w-fit flex gap-2 justify-between items-center text-center">
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
            <div className="px-3 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 group-hover:transition-all ease-in-out duration-800">
              <div className="flex flex-col gap-2 bg-white rounded-b-xl p-3">
                <div className="flex justify-between gap-5">
                  <div className="w-4/6 bg-gray-200 rounded-xl p-3 grid grid-flow-col justify-stretch">
                    <div className="flex flex-col">
                      <span className="text-sm">Price</span>
                      <span className="text-sm font-semibold">0.0 ETH</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Highest bid</span>
                      <span className="text-sm font-semibold">No bids yet</span>
                    </div>
                  </div>
                  <button className="w-2/6 bg-primary-200 p-3 rounded-full text-white" disabled="disabled">Place a bid</button>
                </div>
                <button onClick={() => router.push('/nft/user')} className="w-full hover:bg-primary-50 text-primary-500 w-full py-1 text-center rounded-full">View Detail</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default UpcomingAuction;
