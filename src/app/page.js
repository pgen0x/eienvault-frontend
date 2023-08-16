'use client';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import SlideshowDiscover from '@/app/components/slideshow/discover';
import SlideshowActivities from '@/app/components/slideshow/activities';
import Avatar from '@/app/assets/images/avatar.jpg';
import Image from 'next/image';
import TrendingTop from '@/app/components/trading-top';
import Auction from '@/app/components/auction';
import { Tab } from '@headlessui/react';

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
                <Tab.Panel>Content 2</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
        <section>
          <div className="w-full section-3 text-black">
            <div className="container mx-auto flex items-center justify-center">
              <div className="flex-initial w-[29%]">
                <h2 className="text-3xl">Discover Our Best <br />Collections For you to buy.</h2>
                <p>Eien vault is a marketplace for nft, a one of a kind digital asset that you can truly own.</p>
                <div className="inline-flex h-11 items-center justify-center gap-2 self-stretch rounded-full bg-sky-400 px-4 py-2 mt-5">
                  <button className="text-center text-base font-bold leading-normal text-white">
                    DIscover more
                  </button>
                </div>
              </div>
              <div className="flex-initial w-[69%] relative flex h-[632px] items-center justify-center">
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
                <a href="#" title="See all" className="text-sky-400">See all</a>
              </div>
              <SlideshowActivities />
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
