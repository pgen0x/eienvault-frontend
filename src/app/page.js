'use client';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import SlideshowDiscover from '@/app/components/slideshow/discover';
import SlideshowActivities from '@/app/components/slideshow/activities';
import SlideshowCreator from '@/app/components/slideshow/creator';
import Avatar from '@/app/assets/images/avatar.jpg';
import Image from 'next/image';
import TrendingTop from '@/app/components/trading-top';
import Auction from '@/app/components/auction';
import UpcomingAuction from '@/app/components/auction/upcoming';
import { Tab } from '@headlessui/react';
import Line from '@/app/assets/icon/line3';
import LineRound from '@/app/assets/icon/line4';
import {
  faCircleCheck,
  faChevronRight,
  faChevronLeft,
  faMinus,
  faPlus,
  faEllipsis,
  faCartPlus,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faMedium,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoIcon from './assets/icon/logoicon';

export default function Home() {
  const isMounted = useIsMounted();
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="relative homepage">
        <Auction />
        <section className="relative -mt-24 pt-10 flex h-[690px] w-full flex-col gap-4 bg-gray-100 text-black px-10">
          <div className="container mx-auto">
            <Tab.Group>
              <Tab.List>
                <Tab><strong className="pr-5">Collections</strong></Tab>
                <Tab><strong className="text-neutral-400">Marketplace</strong></Tab>
              </Tab.List>
              <Tab.Panels className="pt-4">
                <Tab.Panel>
                  <TrendingTop />
                </Tab.Panel>
                <Tab.Panel>
                  <TrendingTop />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
        <section>
          <div className="w-full section-discover text-black">
            <div className="container mx-auto flex items-center justify-center">
              <div className="flex-initial w-[29%]">
                <h2 className="text-3xl">Discover Our Best <br />Collections For you to buy.</h2>
                <p>Eien vault is a marketplace for nft, a one of a kind digital asset that you can truly own.</p>
                <div className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-full bg-primary-500 px-4 py-2 mt-5">
                  <button className="text-center text-base font-bold leading-normal text-white">
                    DIscover more
                  </button>
                </div>
              </div>
              <div className="flex-initial w-[69%] relative flex items-center justify-center mb-5">
                <SlideshowDiscover />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full text-black bg-gray-100">
            <div className="container mx-auto py-4 px-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl">Recent Activities</h2>
                <a href="#" title="See all" className="text-primary-500">See all</a>
              </div>
              <div className="flex-initial w-full relative flex items-center justify-center mb-5">
                <SlideshowActivities />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full text-black bg-gray-100">
            <div className="container mx-auto py-4 px-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl">Upcoming auctions</h2>
                <a href="#" title="See all" className="text-primary-500">See all</a>
              </div>
              <UpcomingAuction />
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-between text-black bg-gray-100 bg-orange-100 h-[400px] block overflow-hidden">
            <div className="w-max-full w-full relative left-0 -bottom-[6rem]">
              {/* <Line /> */}
            </div>
            <div className="flex-2 w-full">
              <div className="relative block rounded-full w-[40vw] h-[40vw] -top-[50px] bg-red-400">
                <div className="w-[90%] flex relative top-[130px] mx-auto justify-center items-center">
                  <div className="w-full text-center text-gray-800 bg-white/60 px-3 backdrop-blur rounded-lg p-10">
                    <h2 className="text-2xl font-bold">Don't miss a drop</h2>
                    <p>Subscribe to our real time newspaper and be the first to know<br /> about upcoming drops</p>
                    <form className="flex gap-2 w-full mt-5">
                      <input type="text" className="w-full px-5 py-2 rounded-full" placeholder="Your email address" />
                      <button type="submit" className="bg-primary-500 px-5 py-2 rounded-full text-white">Subscribe</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap self-end">
              <div className="relative -left-[100px]">
                <LineRound />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full text-black bg-gray-100">
            <div className="container mx-auto py-4 px-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl">Trending creator</h2>
                <a href="#" title="See all" className="text-primary-500">See all</a>
              </div>
              <div className="flex-initial w-full relative flex items-center justify-center mb-5">
                <SlideshowCreator />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full h-[480px] text-black bg-gray-100">
            <div className="container mx-auto py-4 px-4">
              <div className="flex items-center justify-between">
                <div className="w-full h-fit relative">
                  <img className="rounded-2xl shadow" src="https://via.placeholder.com/344x344" />
                  <img className="left-[127px] top-[172px] absolute rounded-2xl shadow" src="https://via.placeholder.com/243x245" />
                  <img className="left-[297px] top-[34px] absolute rounded-2xl shadow" src="https://via.placeholder.com/243x327" />
                </div>
                <div className="w-full flex flex-col px-[150px]">
                  <h2 className="font-bold text-2xl">Discover hidden gems</h2>
                  <p className="my-3">Eien vault is your window into a world of unique and extraordinary digital art. Immerse yourself in a diverse collection of NFTs created by talented artists from around the globe.</p>
                  <a href="#" className="text-center w-full rounded-full bg-primary-500 px-3 py-2 text-white">Learn more</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-amber-100 pt-5 h-[550px]">
            <div className="relative flex justify-between container mx-auto bg-white bg-opacity-50 rounded-2xl backdrop-blur-xl p-5 z-[1]">
              <div className="text-slate-600 flex-1">
                <h2 className="font-bold text-3xl">Use your NFTs to get a crypto <br />loan</h2>
                <p className="mt-3 py-5 font-semibold">Use your NFT as collateral to borrow wETH, DAI, or USDC <br />from lenders. Repay your loan, and you get your NFT<br /> back. No auto-liquidations! 0% borrower fees!</p>
                <div className="my-5">
                  <button className="text-white bg-primary-500 font-bold rounded-full px-5 py-2">Get loan now</button>
                  <button className="ml-1 bg-white text-primary-500 font-bold rounded-full px-5 py-2">I want to lend</button>
                </div>
                <div className="flex w-full justify-between p-5">
                  <div className="">
                    <h3 className="text-3xl font-bold text-center">$450M+</h3>
                    <p className="">Total volume loan (USD)</p>
                  </div>
                  <div className="">
                    <h3 className="text-3xl font-bold text-center">20k+</h3>
                    <p className="">Total member of loan</p>
                  </div>
                  <div className="">
                    <h3 className="text-3xl font-bold text-center">$8k</h3>
                    <p className="">Average loan size</p>
                  </div>
                </div>
              </div>
              <div className="text-black flex-1">
                <img className="w-full" src="https://via.placeholder.com/720x405" />
              </div>
            </div>
            <div className="relative -left-[30px] bottom-[200px] bg-red-400 rounded-full w-64 h-64"></div>
          </div>
        </section>
        <section className="w-full relative -mt-[50px] px-[50px]">
          <div className="bg-white rounded-tl-2xl rounded-tr-2xl p-[30px]">
            <div className="flex">
              <div className="w-[40vw]">
                <div className="w-64">
                  <img src="logo.svg" className="w-36" />
                </div>
                <div className="text-gray-900 mt-5">
                  <p>EienVault is at the forefront of the digital revolution in the art world. We invite you to embrace this exciting new era and discover the limitless possibilities that NFT art offers</p>
                </div>
                <div className="flex flex-col text-primary-500 py-5">
                  <h4 className="text-xl font-bold">Join our community</h4>
                  <ul className="flex justify-between w-fit gap-7 mt-3">
                    <li className="text-2xl"><FontAwesomeIcon icon={faTwitter} /></li>
                    <li className="text-2xl"><FontAwesomeIcon icon={faDiscord} /></li>
                    <li className="text-2xl"><FontAwesomeIcon icon={faMedium} /></li>
                    <li className="text-2xl"><FontAwesomeIcon icon={faEnvelope} /></li>
                  </ul>
                </div>
              </div>
              <div className="flex justify-evenly w-full">
                <div className="">
                  <h2 className="text-primary-500 font-bold text-xl">Company</h2>
                  <ul className="text-gray-900 mt-5">
                    <li className="py-2">What is NFT ?</li>
                    <li className="py-2">Snap marketplace NFT</li>
                    <li className="py-2">Publish an NFT with us</li>
                    <li className="py-2">About us</li>
                    <li className="py-2">Advisory devices</li>
                  </ul>
                </div>
                <div className="">
                  <h2 className="text-primary-500 font-bold text-xl">EienVault</h2>
                  <ul className="text-gray-900 mt-5">
                    <li className="py-2">Displaying NFTs</li>
                    <li className="py-2">Report security issues</li>
                    <li className="py-2">Career</li>
                  </ul>
                </div>
                <div className="">
                  <h2 className="text-primary-500 font-bold text-xl">Other</h2>
                  <ul className="text-gray-900 mt-5">
                    <li className="py-2">Get help</li>
                    <li className="py-2">Term of use</li>
                    <li className="py-2">Creator term of services</li>
                    <li className="py-2">Privacy policy</li>
                  </ul>
                </div>
                <div className="">
                  <h2 className="text-primary-500 font-bold text-xl">Stats</h2>
                  <ul className="text-gray-900 mt-5">
                    <li className="py-2">Ranking</li>
                    <li className="py-2">Activity</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-primary-500 text-gray-900 py-5 mt-5">
              2023  Snapft, inc
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
