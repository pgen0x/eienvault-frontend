'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import {
  SlideshowDiscover,
  SlideshowDiscoverSkeleton,
} from '@/components/slideshow/discover';
import {
  SlideshowActivities,
  SlideshowActivitiesSkeleton,
} from '@/components/slideshow/activities';
import {
  SlideshowCreator,
  SlideshowCreatorSkeleton,
} from '@/components/slideshow/creator';
import Avatar from '@/assets/images/avatar.jpg';
import Image from 'next/image';
import {
  TrendingTop,
  TrendingTopSkeleton,
  TrendingTopMobile,
} from '@/components/trending-top';
import Auction from '@/components/auction';
import {
  UpcomingAuction,
  UpcomingAuctionMobile,
  UpcomingAuctionMobileSkeleton,
  UpcomingAuctionSkeleton,
} from '@/components/auction/upcoming';
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
import { Suspense, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useAccount } from 'wagmi';
import { useRouter } from 'next-nprogress-bar';

export default function Home() {
  const router = useRouter();
  const isMounted = useIsMounted();
  const { token } = useAuth();
  const { address } = useAccount();

  const [dataUsers, setDataUsers] = useState([]);
  const [dataActivities, setDataActivities] = useState([]);
  const [dataCollections, setDataCollections] = useState([]);
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [dataDiscover, setDataDiscover] = useState([]);

  const [errorUsers, setErrorUsers] = useState(false);
  const [errorCollections, setErrorCollections] = useState(false);
  const [errorActivities, setErrorActivities] = useState(false);
  const [errorUpcoming, setErrorUpcoming] = useState(false);
  const [errorDiscover, setErrorDiscover] = useState(false);

  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [isLoadingCollections, setIsLoadingCollections] = useState(true);
  const [isLoadingActivities, setIsLoadingActivities] = useState(true);
  const [isLoadingUpcoming, setIsLoadingUpcoming] = useState(true);
  const [isLoadingDiscover, setIsLoadingDiscover] = useState(true);

  const getCollections = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/get`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        setErrorCollections(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();
      setDataCollections(responseData.collections);
    } catch (error) {
      setErrorCollections(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingCollections(false);
      setErrorCollections(false);
    }
  };

  const getNfts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/market/items?limit=10`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        setErrorActivities(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();
      setDataActivities(responseData);
    } catch (error) {
      setErrorActivities(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingActivities(false);
      setErrorActivities(false);
    }
  };

  const getUpcoming = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/market/marketauction?limit=5`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        setErrorUpcoming(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();
      const filteredData = responseData.filter((nft) => {
        const releaseDate = parseInt(nft.releaseDate);
        const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds

        return releaseDate > currentTime;
      });
      setDataUpcoming(filteredData);
    } catch (error) {
      setErrorUpcoming(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingUpcoming(false);
      setErrorUpcoming(false);
    }
  };

  const getDiscover = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getdiscover?limit=5`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        setIsLoadingDiscover(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();
      const nft = responseData.nfts;
      const filteredData = nft.filter((item) => item.itemDetails);
      setDataDiscover(filteredData);
    } catch (error) {
      setErrorDiscover(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingDiscover(false);
      setErrorDiscover(false);
    }
  };

  const getUsers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/getusers?limit=10`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!res.ok) {
        setErrorUsers(true);
        console.error('Fetch failed:', res);
        throw new Error('Network response was not ok');
      }

      const responseData = await res.json();
      setDataUsers(responseData.users);
    } catch (error) {
      setErrorUsers(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingUsers(false);
      setErrorUsers(false);
    }
  };

  useEffect(() => {
    getNfts();
    getCollections();
    getUpcoming();
    getDiscover();
    getUsers();
  }, [token, address]);

  if (!isMounted) {
    return null;
  }

  const refreshDataActivities = async () => {
    console.log('Trigger refreshDataActivities');
    setIsLoadingActivities(true);
    setDataDiscover([]);
    await getNfts();
  };

  const refreshDataDiscover = async () => {
    console.log('Trigger refreshDataDiscover');
    setIsLoadingDiscover(true);
    setDataActivities([]);
    await getDiscover();
  };

  return (
    <>
      <div className="homepage relative">
        <Auction />
        <section className="relative z-10 -mt-24 flex h-auto w-full flex-col gap-4 bg-gray-100 pb-10 pt-10 text-black dark:bg-zinc-800 dark:text-white sm:h-auto md:h-[690px] lg:h-[690px] xl:h-[690px] 2xl:h-[690px]">
          <div className="container mx-auto">
            <Tab.Group>
              <Tab.List className="flex gap-5">
                <Tab
                  className={({ selected }) =>
                    selected
                      ? 'text-xl font-semibold text-black dark:text-white'
                      : 'text-xl font-semibold text-neutral-400'
                  }
                >
                  Collections
                </Tab>
                {/* <Tab
                  className={({ selected }) =>
                    selected
                      ? 'font-bold text-black'
                      : 'font-bold text-neutral-400'
                  }
                >
                  Marketplace
                </Tab> */}
              </Tab.List>
              <Tab.Panels className="pt-4">
                <Tab.Panel>
                  <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                    {isLoadingCollections || dataCollections.length <= 0 ? (
                      <TrendingTopSkeleton />
                    ) : (
                      <TrendingTop dataCollections={dataCollections} />
                    )}
                  </div>
                  <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                    <TrendingTopMobile dataCollections={dataCollections} />
                  </div>
                </Tab.Panel>
                {/* <Tab.Panel>
                  <TrendingTopSkeleton />
                </Tab.Panel> */}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </section>
        <section>
          <div className="w-full bg-[url('/images/discover-section-clean-background.png')] bg-cover bg-left-bottom text-black">
            <div className="-mt-[20]md:ml-[20px] absolute md:mt-20">
              <Image
                width={398}
                height={121}
                objectFit="cover"
                src="/images/cloud-discover-1.png"
                className="h-full"
                alt="cloud-discover"
              />
            </div>
            <div className="absolute -mt-[90px] hidden md:ml-[350px] md:block lg:ml-[450px]">
              <Image
                width={326}
                height={207}
                objectFit="cover"
                src="/images/cloud-discover-3.png"
                className="h-full"
                alt="cloud-discover"
              />
            </div>
            <div className="absolute mt-[190px] hidden -translate-x-16 translate-y-4 md:ml-[340px] md:block lg:ml-[500px]">
              <Image
                width={354}
                height={99}
                objectFit="cover"
                src="/images/cloud-discover-2.png"
                className="h-full"
                alt="cloud-discover"
              />
            </div>
            <div className="container relative z-20 mx-auto flex flex-col items-center justify-center sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full flex-initial p-5 sm:w-full md:w-[50%] lg:w-[29%] xl:w-[29%] 2xl:w-[29%]">
                <h2 className="text-3xl">
                  Discover Our Best <br />
                  Collections For you to buy.
                </h2>
                <p>
                  Eien vault is a marketplace for nft, a one of a kind digital
                  asset that you can truly own.
                </p>
                <button className="mt-5 rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                  Discover more
                </button>
              </div>
              <div className="relative my-5 flex w-full flex-initial items-center justify-center sm:w-full md:w-[50%] lg:w-[69%] xl:w-[69%] 2xl:w-[69%]">
                {isLoadingDiscover || dataDiscover.length <= 0 ? (
                  <SlideshowDiscoverSkeleton />
                ) : (
                  <SlideshowDiscover
                    dataDiscover={dataDiscover}
                    refreshDataDiscover={refreshDataDiscover}
                  />
                )}
              </div>
            </div>
            <div className="absolute -mt-[290px] ml-[400px]">
              <Image
                width={332}
                height={218}
                objectFit="cover"
                src="/images/discover-castle-1.png"
                className="h-full"
                alt="discover-castle"
              />
            </div>
            <div className="absolute -ml-[60px] -mt-[140px]">
              <Image
                width={332}
                height={218}
                objectFit="cover"
                src="/images/discover-castle-2.png"
                className="h-full"
                alt="discover-castle"
              />
            </div>
          </div>
        </section>
        <section className="relative z-10">
          <div className="w-full bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Activities</h2>
              </div>
              <div className="relative my-5 w-full flex-initial items-center justify-center">
                {isLoadingActivities || dataActivities.length <= 0 ? (
                  <SlideshowActivitiesSkeleton />
                ) : (
                  <SlideshowActivities
                    dataActivities={dataActivities}
                    isLoadingActivities={isLoadingActivities}
                    refreshData={refreshDataActivities}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="relative z-20 w-full bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Upcoming auctions</h2>
                <a href="#" title="See all" className="text-primary-500">
                  See all
                </a>
              </div>
              <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                {isLoadingUpcoming || dataUpcoming.length <= 0 ? (
                  <UpcomingAuctionSkeleton />
                ) : (
                  <UpcomingAuction dataUpcoming={dataUpcoming} />
                )}
              </div>
              <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                {isLoadingUpcoming || dataUpcoming.length <= 0 ? (
                  <UpcomingAuctionMobileSkeleton />
                ) : (
                  <UpcomingAuctionMobile dataUpcoming={dataUpcoming} />
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex h-[400px] w-full justify-between overflow-hidden bg-[url('/images/subscribe-section-background.png')] bg-cover bg-bottom text-black">
            <div className="absolute z-10 mt-20 hidden md:-left-[8vw] md:block lg:left-[23vw]">
              <Image
                width={518}
                height={156}
                objectFit="cover"
                src="/images/cloud-subscribe-1.png"
                className="h-full"
                alt="cloud"
              />
            </div>
            <div className="absolute left-[44vw] z-10 mt-[310px]">
              <Image
                width={210}
                height={60}
                objectFit="cover"
                src="/images/cloud-subscribe-2.png"
                className="h-full"
                alt="cloud"
              />
            </div>
            <div className="md: absolute right-[8vw] z-10 -mt-[10px] lg:right-[28vw]">
              <Image
                width={326}
                height={207}
                objectFit="cover"
                src="/images/cloud-subscribe-3.png"
                className="h-full"
                alt="cloud"
              />
            </div>
            <div className="relative top-0 mx-auto block h-[30rem] max-h-full w-full max-w-full rounded-full bg-red-400 sm:top-0 md:-top-[50px] md:max-h-[30rem] md:max-w-[30rem] lg:-top-[50px] xl:-top-[50px] 2xl:-top-[50px]">
              <div className="relative top-[50px] mx-auto flex w-[90%] items-center justify-center sm:top-[50px] md:top-[130px] md:w-full lg:top-[130px] xl:top-[130px] 2xl:top-[130px]">
                <div className="z-10 w-full rounded-lg bg-white/60 p-10 px-3 text-center text-gray-800 backdrop-blur-md dark:bg-zinc-800 dark:bg-opacity-50 dark:text-white">
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
                      className="w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-500"
                      placeholder="Your email address"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-primary-500 px-5 text-white hover:bg-primary-300"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* <BgSubscribe className="relative w-full max-h-[30rem] object-cover" /> */}
          </div>
        </section>
        <section>
          <div className="w-full bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trending creator</h2>
                <a href="#" title="See all" className="text-primary-500">
                  See all
                </a>
              </div>
              <div className="relative my-5 flex w-full flex-initial items-center justify-center gap-5">
                {isLoadingUsers || dataUsers.length <= 0 ? (
                  <SlideshowCreatorSkeleton />
                ) : (
                  <SlideshowCreator dataUsers={dataUsers} />
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="h-auto w-full bg-gray-100 pb-10 text-black dark:bg-zinc-800 dark:text-white">
            <div className="container mx-auto px-20 pb-5">
              <div className="flex flex-col-reverse items-center justify-between gap-5 py-5 lg:flex-row">
                <div className="w-fit py-5 sm:w-fit md:w-fit lg:w-full">
                  <div className="relative h-[344px] w-[244px] sm:w-[244px] md:w-[344px]">
                    <Image
                      width={344}
                      height={344}
                      src="/images/macan.png"
                      className="h-full w-full rounded-2xl object-cover"
                      alt="macan"
                    />
                  </div>
                  <div className="relative -mt-[131px] ml-[30px] h-[245px] w-[243px] sm:-mt-[131px] sm:ml-[30px] md:-mt-[181px] md:ml-[83px]">
                    <Image
                      width={243}
                      height={245}
                      src="/images/marmer.png"
                      className="h-full w-full rounded-2xl object-cover"
                      alt="marmer"
                    />
                  </div>
                  <div className="relative -mt-[404px] ml-[100px] h-[327px] w-[243px] sm:-mt-[404px] sm:ml-[100px] md:-mt-[364px] md:ml-[203px]">
                    <Image
                      src="/images/monalisa.png"
                      width={243}
                      height={327}
                      className="rounded-2xl object-cover"
                      alt="monalisa"
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col gap-5 py-5">
                  <h2 className="text-4xl font-bold">Discover hidden gems</h2>
                  <p className="my-3 text-xl">
                    Eien vault is your window into a world of unique and
                    extraordinary digital art. Immerse yourself in a diverse
                    collection of NFTs created by talented artists from around
                    the globe.
                  </p>
                  <button
                    onClick={() => router.push('/nft')}
                    className="w-full rounded-full bg-primary-500 px-3 py-2 text-center text-lg font-bold text-white hover:bg-primary-300"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-amber-100 bg-[url('/images/nft-lending-section-background.png')] bg-cover bg-right-bottom p-5 pb-20">
            <div className="container relative z-[1] mx-auto flex flex-col justify-between gap-5 rounded-2xl bg-white bg-opacity-50 p-5 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-50 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full text-slate-600 dark:text-white md:px-20">
                <h2 className="text-3xl font-bold">
                  Use your NFTs to get a crypto loan
                </h2>
                <p className="mt-3 py-5 font-semibold">
                  Use your NFT as collateral to borrow wETH, DAI, or USDC from
                  lenders. Repay your loan, and you get your NFT back. No
                  auto-liquidations! 0% borrower fees!
                </p>
                <div className="my-5 flex flex-col gap-3 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                  <button className="w-full rounded-full bg-primary-500 px-5 py-2 font-bold text-white hover:bg-primary-300 md:w-fit">
                    Get loan now
                  </button>
                  <button className="ml-1 w-full rounded-full bg-white px-5 py-2 font-bold text-primary-500 hover:bg-primary-50 md:w-fit">
                    I want to lend
                  </button>
                </div>
                <div className="flex w-full flex-col items-center justify-between gap-5 p-5 md:flex-row">
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
              <div className="flex w-full items-center justify-center text-black">
                <Image
                  width={660}
                  height={365}
                  src="/images/watchformore.png"
                  className="w-full"
                  alt="watchformore"
                />
              </div>
            </div>
            <div className="absolute -left-[30px] -mt-[240px] h-64 w-64 rounded-full bg-red-400"></div>
          </div>
        </section>
        <section className="relative z-10 -mt-[50px] w-full px-[10px] sm:px-[10px] md:px-[50px] lg:px-[50px] xl:px-[50px] 2xl:px-[50px]">
          <div className="rounded-tl-2xl rounded-tr-2xl bg-white p-[30px] dark:bg-zinc-800">
            <div className="flex flex-col gap-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full sm:w-full md:w-[40vw] lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw]">
                <div className="w-64">
                  <span className="dark:hidden">
                    <img src="/logo.svg" className="w-36" />
                  </span>
                  <span className="hidden dark:block">
                    <img src="/logo-dark.svg" className="w-36" />
                  </span>
                </div>
                <div className="mt-5 text-gray-900 dark:text-white">
                  <p>
                    EienVault is at the forefront of the digital revolution in
                    the art world. We invite you to embrace this exciting new
                    era and discover the limitless possibilities that NFT art
                    offers
                  </p>
                </div>
                <div className="hidden flex-col py-5 text-primary-500 sm:hidden md:block lg:block xl:block 2xl:block">
                  <h4 className="text-xl font-bold">Join our community</h4>
                  <ul className="mt-3 flex w-fit justify-between gap-2">
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-white dark:hover:bg-zinc-300"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-white dark:hover:bg-zinc-300"
                      >
                        <FontAwesomeIcon icon={faDiscord} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-white dark:hover:bg-zinc-300"
                      >
                        <FontAwesomeIcon icon={faMedium} />
                      </a>
                    </li>
                    <li className="text-2xl">
                      <a
                        href="#"
                        className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:bg-white dark:hover:bg-zinc-300"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full flex-col justify-evenly sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">
                      Company
                    </h2>
                    <ul className="mt-5 text-gray-900 dark:text-white">
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
                    <ul className="mt-5 text-gray-900 dark:text-white">
                      <li className="py-2">Displaying NFTs</li>
                      <li className="py-2">Report security issues</li>
                      <li className="py-2">Career</li>
                    </ul>
                  </div>
                </div>
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">
                      Other
                    </h2>
                    <ul className="mt-5 text-gray-900 dark:text-white">
                      <li className="py-2">Get help</li>
                      <li className="py-2">Term of use</li>
                      <li className="py-2">Creator term of services</li>
                      <li className="py-2">Privacy policy</li>
                    </ul>
                  </div>
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500">
                      Stats
                    </h2>
                    <ul className="mt-5 text-gray-900 dark:text-white">
                      <li className="py-2">Ranking</li>
                      <li className="py-2">Activity</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col py-5 text-primary-500 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <h4 className="text-xl font-bold">Join our community</h4>
                <ul className="mt-3 flex w-fit justify-between gap-2">
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:hover:bg-zinc-700"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:hover:bg-zinc-700"
                    >
                      <FontAwesomeIcon icon={faDiscord} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:hover:bg-zinc-700"
                    >
                      <FontAwesomeIcon icon={faMedium} />
                    </a>
                  </li>
                  <li className="text-2xl">
                    <a
                      href="#"
                      className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 dark:hover:bg-zinc-700"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5 border-t border-primary-500 py-5 text-gray-900 dark:text-white">
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
            <div className="flex w-full justify-center overflow-hidden rounded-bl-2xl rounded-tl-2xl bg-white bg-opacity-50 py-5 dark:bg-zinc-800 dark:bg-opacity-50 lg:w-2/3">
              <Slideshow />
            </div>
          </div>
        </div>
      </section> */}
    </>
  );
}
