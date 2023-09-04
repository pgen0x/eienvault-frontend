'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { SlideshowDiscover, SlideshowDiscoverSkeleton } from '@/components/slideshow/discover';
import { SlideshowActivities, SlideshowActivitiesSkeleton } from '@/components/slideshow/activities';
import { SlideshowCreator, SlideshowCreatorSkeleton } from '@/components/slideshow/creator';
import Avatar from '@/assets/images/avatar.jpg';
import Image from 'next/image';
import { TrendingTop, TrendingTopSkeleton, TrendingTopMobile } from '@/components/treding-top';
import Auction from '@/components/auction';
import { UpcomingAuction, UpcomingAuctionMobile, UpcomingAuctionSkeleton } from '@/components/auction/upcoming';
import { Tab } from '@headlessui/react';
import Line from '@/assets/icon/line3';
import LineRound from '@/assets/icon/line4';
import {
  faCircleCheck,
  faChevronRight,
  faChevronLeft,
  faMinus,
  faPlus,
  faEllipsis,
  faCartPlus,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="homepage relative">
        <Auction />
        <section className="relative -mt-24 flex h-auto sm:h-auto md:h-[690px] lg:h-[690px] my-5 xl:h-[690px] 2xl:h-[690px] w-full flex-col gap-4 bg-gray-100 px-10 pt-10 text-black">
          <div className="container mx-auto">
            <Tab.Group>
              <Tab.List>
                <Tab>
                  <strong className="pr-5">Collections</strong>
                </Tab>
                <Tab>
                  <strong className="text-neutral-400">Marketplace</strong>
                </Tab>
              </Tab.List>
              <Tab.Panels className="pt-4">
                <Tab.Panel>
                  <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                    <TrendingTop />
                  </div>
                  <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                    <TrendingTopMobile />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <TrendingTopSkeleton />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
        <section>
          <div className="section-discover w-full text-black">
            <div className="container mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-center">
              <div className="w-full sm:w-full md:w-[29%] lg:w-[29%] xl:w-[29%] 2xl:w-[29%] flex-initial p-5">
                <h2 className="text-3xl">
                  Discover Our Best <br />
                  Collections For you to buy.
                </h2>
                <p>
                  Eien vault is a marketplace for nft, a one of a kind digital
                  asset that you can truly own.
                </p>
                <button className="mt-5 rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                  DIscover more
                </button>
              </div>
              <div className="relative my-5 flex w-full sm:w-full md:w-[69%] lg:w-[69%] xl:w-[69%] 2xl:w-[69%] flex-initial items-center justify-center">
                <SlideshowDiscover />
                {/* <SlideshowDiscoverSkeleton /> */}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-gray-100 text-black">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Activities</h2>
                <a href="#" title="See all" className="text-primary-500">
                  See all
                </a>
              </div>
              <div className="relative my-5 flex w-full flex-initial items-center justify-center">
                <SlideshowActivities />
                {/* <SlideshowActivitiesSkeleton /> */}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-gray-100 text-black">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming auctions</h2>
                <a href="#" title="See all" className="text-primary-500">
                  See all
                </a>
              </div>
              <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                <UpcomingAuction />
              </div>
              <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <UpcomingAuctionMobile />
              </div>
              {/* <UpcomingAuctionSkeleton /> */}
            </div>
          </div>
        </section>
        <section>
          <div className="flex h-[400px] justify-between overflow-hidden bg-orange-100 text-black">
            <div className="w-max-full relative -bottom-[6rem] left-0 w-full">
              {/* <Line /> */}
            </div>
            <div className="flex-2 w-full">
              <div className="relative top-0 sm:top-0 md:-top-[50px] lg:-top-[50px] xl:-top-[50px] 2xl:-top-[50px] block h-[30rem] w-[30rem] max-w-full max-h-full rounded-full bg-red-400">
                <div className="relative top-[50px] sm:top-[50px] md:top-[130px] lg:top-[130px] xl:top-[130px] 2xl:top-[130px] mx-auto flex w-[90%] items-center justify-center">
                  <div className="w-full rounded-lg bg-white/60 p-10 px-3 text-center text-gray-800 backdrop-blur">
                    <h2 className="text-2xl font-bold">
                      Don&lsquo;t miss a drop
                    </h2>
                    <p>
                      Subscribe to our real time newspaper and be the first to
                      know
                      <br /> about upcoming drops
                    </p>
                    <form className="mt-5 flex w-full gap-2">
                      <input
                        type="text"
                        className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                        placeholder="Your email address"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-primary-500 px-5 py-2 text-white hover:bg-primary-300"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-wrap self-end">
              <div className="relative -left-[100px]">
                <LineRound />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-gray-100 text-black">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trending creator</h2>
                <a href="#" title="See all" className="text-primary-500">
                  See all
                </a>
              </div>
              <div className="relative my-5 flex w-full flex-initial items-center justify-center gap-5">
                <SlideshowCreator />
                {/* <SlideshowCreatorSkeleton /> */}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="h-auto sm:h-auto md:h-[480px] lg:h-[480px] xl:h-[480px] 2xl:h-[480px] w-full bg-gray-100 text-black">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center justify-between gap-5">
                <div className="relative h-fit w-full py-5">
                  <img
                    className="rounded-2xl shadow"
                    src="https://fakeimg.pl/344x344"
                  />
                  <img
                    className="absolute left-[37px] top-[172px] rounded-2xl shadow"
                    src="https://fakeimg.pl/243x245"
                  />
                  <img
                    className="absolute left-[127px] top-[24px] rounded-2xl shadow"
                    src="https://fakeimg.pl/243x327"
                  />
                </div>
                <div className="flex w-full flex-col py-5">
                  <h2 className="text-2xl font-bold">Discover hidden gems</h2>
                  <p className="my-3">
                    Eien vault is your window into a world of unique and
                    extraordinary digital art. Immerse yourself in a diverse
                    collection of NFTs created by talented artists from around
                    the globe.
                  </p>
                  <a
                    href="#"
                    className="w-full rounded-full bg-primary-500 px-3 py-2 text-center text-white hover:bg-primary-300"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="h-auto sm:h-auto md:h-[550px] lg:h-[550px] xl:h-[550px] 2xl:h-[550px] w-full bg-amber-100 p-5">
            <div className="container relative z-[1] mx-auto flex gap-5 flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-between rounded-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
              <div className="text-slate-600">
                <h2 className="text-3xl font-bold">
                  Use your NFTs to get a crypto <br />
                  loan
                </h2>
                <p className="mt-3 py-5 font-semibold">
                  Use your NFT as collateral to borrow wETH, DAI, or USDC <br />
                  from lenders. Repay your loan, and you get your NFT
                  <br /> back. No auto-liquidations! 0% borrower fees!
                </p>
                <div className="flex flex-col sm:flex-col md:flex-col lg:flex-col xl:flex-col 2xl:flex-col gap-5 justify-between my-5">
                  <button className="w-full rounded-full bg-primary-500 px-5 py-2 font-bold text-white hover:bg-primary-300">
                    Get loan now
                  </button>
                  <button className="w-full ml-1 rounded-full bg-white px-5 py-2 font-bold text-primary-500 hover:bg-primary-50">
                    I want to lend
                  </button>
                </div>
                <div className="flex w-full justify-between p-5">
                  <div className="">
                    <h3 className="text-center text-3xl font-bold">$450M+</h3>
                    <p className="">Total volume loan (USD)</p>
                  </div>
                  <div className="">
                    <h3 className="text-center text-3xl font-bold">20k+</h3>
                    <p className="">Total member of loan</p>
                  </div>
                  <div className="">
                    <h3 className="text-center text-3xl font-bold">$8k</h3>
                    <p className="">Average loan size</p>
                  </div>
                </div>
              </div>
              <div className="text-black">
                <img className="w-full" src="https://fakeimg.pl/720x405" />
              </div>
            </div>
            <div className="absolute -left-[30px] -mt-[240px] h-64 w-64 rounded-full bg-red-400"></div>
          </div>
        </section>
        <section className="relative mt-[30px] w-full px-[10px] sm:px-[10px] md:px-[50px] lg:px-[50px] xl:px-[50px] 2xl:px-[50px]">
          <div className="rounded-tl-2xl rounded-tr-2xl bg-white p-[30px]">
            <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full sm:w-full md:w-[40vw] lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw]">
                <div className="w-64">
                  <img src="logo.svg" className="w-36" />
                </div>
                <div className="mt-5 text-gray-900">
                  <p>
                    EienVault is at the forefront of the digital revolution in
                    the art world. We invite you to embrace this exciting new
                    era and discover the limitless possibilities that NFT art
                    offers
                  </p>
                </div>
                <div className="flex flex-col py-5 text-primary-500 hidden sm:hidden md:block lg:block xl:block 2xl:block">
                  <h4 className="text-xl font-bold">Join our community</h4>
                  <ul className="mt-3 flex w-fit justify-between gap-2">
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                      >
                        <FontAwesomeIcon icon={faDiscord} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                      >
                        <FontAwesomeIcon icon={faMedium} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row w-full justify-evenly">
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">
                      Company
                    </h2>
                    <ul className="mt-5 text-gray-900">
                      <li className="py-2">What is NFT ?</li>
                      <li className="py-2">EienVault</li>
                      <li className="py-2">Publish an NFT with us</li>
                      <li className="py-2">About us</li>
                      <li className="py-2">Advisory devices</li>
                    </ul>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">
                      EienVault
                    </h2>
                    <ul className="mt-5 text-gray-900">
                      <li className="py-2">Displaying NFTs</li>
                      <li className="py-2">Report security issues</li>
                      <li className="py-2">Career</li>
                    </ul>
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">Other</h2>
                    <ul className="mt-5 text-gray-900">
                      <li className="py-2">Get help</li>
                      <li className="py-2">Term of use</li>
                      <li className="py-2">Creator term of services</li>
                      <li className="py-2">Privacy policy</li>
                    </ul>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">Stats</h2>
                    <ul className="mt-5 text-gray-900">
                      <li className="py-2">Ranking</li>
                      <li className="py-2">Activity</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col py-5 text-primary-500 block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <h4 className="text-xl font-bold">Join our community</h4>
                <ul className="mt-3 flex w-fit justify-between gap-2">
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                    >
                      <FontAwesomeIcon icon={faDiscord} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                    >
                      <FontAwesomeIcon icon={faMedium} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5 border-t border-primary-500 py-5 text-gray-900">
              2023 EienVault, inc
            </div>
          </div>
        </section>
      </div>

      {/* <section className="absolute right-0 top-0 z-0 h-full w-full bg-gradient-to-b from-[#00B6D0] to-sky-50 dark:to-gray-900">
        <div className="z-10 flex flex-col">
          <div className="flex w-full flex-col gap-4 pl-3 pt-20 lg:flex-row lg:pb-6 lg:pl-16 lg:pt-32">
            <div className="h-full w-full basis-0 flex-col justify-center gap-4 py-2 lg:h-[444px] lg:w-1/2 lg:basis-auto">
              <div className="flex flex-col items-start justify-start gap-2">
                <div className="w-full text-4xl font-bold leading-[57.60px] text-neutral-800 dark:text-neutral-100 xl:text-5xl">
                  Discover the largest NFT Marketplace
                </div>
                <div className="my-4 w-full text-2xl font-medium leading-9 text-neutral-600 dark:text-neutral-100">
                  Snap marketplace is a marketplace for nft, a one of a kind
                  digital asset that you can truly own, Digital has been around
                  for a long time, but never like this.
                </div>
                <div className="my-4 inline-flex h-16 items-center justify-center gap-2 rounded-[14px] bg-primary-500 px-4">
                  <button className="text-2xl font-bold leading-9 text-white">
                    Discover marketplace
                  </button>
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center overflow-hidden rounded-bl-2xl rounded-tl-2xl bg-white bg-opacity-50 py-5 dark:bg-gray-800 dark:bg-opacity-50 lg:w-2/3">
              <Slideshow />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
