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
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faDiscord,
  faMedium,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useAccount } from 'wagmi';
import { useRouter } from 'next-nprogress-bar';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonTertiary from '@/components/button/buttonTertiary';
import CloudDiscover from '@/assets/icon/cloud-discover';
import CloudDiscover1 from '@/assets/icon/cloud-discover1';
import CloudSubscribe from '@/assets/icon/cloudsubscribe';
import Wave from '@/assets/icon/wave';
import LineL from '@/assets/icon/linel';
import CastleDiscover from '@/assets/icon/castlediscover';
import CastleDiscover2 from '@/assets/icon/castlediscover2';
import ButtonSecondary from '@/components/button/buttonSecondary';
import TooltipTriangle from '@/assets/icon/tooltipTriangle';
import TopTooltip from '@/components/tooltip/topTooltip';
import ButtonLink from '../components/button/buttonLink';

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
      setDataActivities(responseData.nfts);
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

  const refreshDataActivities = () => {
    setTimeout(async () => {
      console.log('Trigger refreshDataActivities');
      setIsLoadingActivities(true);
      setDataDiscover([]);
      await getNfts();
    }, 500)
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
        <section className="relative z-10 -mt-24 flex h-auto w-full flex-col gap-4 bg-gray-100 px-3 pb-10 pt-10 text-black dark:bg-zinc-800 dark:text-white sm:h-auto md:h-[690px] lg:h-[690px] xl:h-[690px] 2xl:h-[690px]">
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
          <div className="w-full bg-gradient-to-t from-[#FFF1D4] via-[#FFF1D4] to-[#FFCFD1] bg-left-bottom text-black dark:from-[#C96E6E] dark:via-[#A68647] dark:to-neutral-800">
            <div className="absolute -ml-12 mt-[20px] hidden lg:block">
              <CloudDiscover1 className="text-primary-500 dark:text-primary-200" />
            </div>
            <div className="absolute mt-[75px] hidden lg:ml-[180px] lg:block">
              <CloudDiscover className="text-primary-500 dark:text-primary-200" />
            </div>

            <div className="container relative z-20 mx-auto flex flex-col items-center justify-center sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full flex-initial p-5 sm:w-full md:w-[50%] lg:w-[29%] xl:w-[29%] 2xl:w-[29%]">
                <h2 className="text-3xl font-semibold text-black dark:text-white">
                  Discover Our Best <br />
                  Collections For you to buy.
                </h2>
                <p className="text-black dark:text-white">
                  Eien vault is a marketplace for nft, a one of a kind digital
                  asset that you can truly own.
                </p>
                <ButtonPrimary className="mt-5 !w-fit">
                  Discover more
                </ButtonPrimary>
              </div>
              <div className="relative my-5 flex w-full flex-initial items-center justify-center px-4 sm:w-full md:w-[50%] lg:w-[69%] xl:w-[69%] 2xl:w-[69%]">
                {isLoadingDiscover || dataDiscover.length <= 0 ? (
                  <SlideshowDiscoverSkeleton />
                ) : (
                  <SlideshowDiscover
                    dataDiscover={dataDiscover}
                    refreshData={refreshDataDiscover}
                  />
                )}
              </div>
            </div>
            <div className="absolute -mt-[290px] ml-[400px]  hidden lg:block">
              <CastleDiscover className="text-primary-300 dark:text-primary-200" />
            </div>
            <div className="absolute -mt-[190px]">
              <CastleDiscover2 className="text-primary-400 dark:text-primary-200" />
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
                <ButtonLink onClick={() => router.push('/nft')} title="See all">
                  See all
                </ButtonLink>
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
          <div className="relative flex h-[400px] w-full justify-between overflow-hidden bg-gradient-to-t from-[#FFF1D4] via-[#FFF1D4] to-[#FFCFD1] px-3 text-black dark:from-[#C96E6E] dark:via-[#A68647] dark:to-neutral-800">
            <div className="absolute hidden lg:ml-[63%] lg:block">
              <CloudSubscribe className="text-primary-500 dark:text-primary-200" />
            </div>
            <div className="absolute mt-[75px] hidden lg:ml-[180px] lg:block">
              <CloudDiscover className="text-primary-500 dark:text-primary-200" />
            </div>
            <div className="absolute bottom-0 hidden w-full text-center md:block">
              <Wave className="fill-primary-500 dark:fill-primary-200" />
            </div>
            <div className="absolute left-1/2 h-[666px] w-[666px] -translate-x-1/2 transform items-center justify-center rounded-full bg-red-400 dark:bg-semantic-orange-400 md:left-1/2 md:block" />
            <div className="mx-auto flex max-w-fit items-center justify-center md:w-full md:max-w-lg">
              <div className="z-10 w-full rounded-lg bg-white/60 p-10 px-3 text-center text-gray-800 backdrop-blur-md dark:bg-zinc-800 dark:bg-opacity-50 dark:text-white">
                <h2 className="text-2xl font-bold">Don&lsquo;t miss a drop</h2>
                <p>
                  Subscribe to our real time newspaper and be the first to know
                  <br /> about upcoming drops
                </p>
                <form className="mt-5 flex w-full flex-col gap-2 md:flex-row">
                  <input
                    type="text"
                    className="w-full rounded-full border-0 bg-white focus:ring-primary-500 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-500 dark:focus:ring-gray-500"
                    placeholder="Your email address"
                  />
                  <ButtonPrimary type="submit" className="w-full md:w-fit">
                    Subscribe
                  </ButtonPrimary>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full bg-gray-100 text-black dark:bg-zinc-800 dark:text-white">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Trending creator</h2>
                <ButtonLink
                  onClick={() => router.push('/user')}
                  title="See all"
                >
                  See all
                </ButtonLink>
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
                  <ButtonPrimary onClick={() => router.push('/nft')}>
                    Learn more
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="relative flex h-full w-full justify-between overflow-hidden bg-gradient-to-t from-[#FFF1D4] via-[#FFF1D4] to-[#FFCFD1] px-3 pb-[50px] text-black dark:from-[#C96E6E] dark:via-[#A68647] dark:to-neutral-800">
            <div className="container relative z-[1] mx-auto my-4 flex max-w-fit flex-col justify-between gap-5 rounded-2xl bg-white bg-opacity-50 p-5 backdrop-blur-sm dark:bg-zinc-800 dark:bg-opacity-50 sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="w-full text-slate-600 dark:text-white">
                <h2 className="text-3xl font-bold">
                  Use your NFTs to get a crypto loan
                </h2>
                <p className="mt-3 py-5 font-semibold">
                  Use your NFT as collateral to borrow wETH, DAI, or USDC from
                  lenders. Repay your loan, and you get your NFT back. No
                  auto-liquidations! 0% borrower fees!
                </p>
                <div className="my-5 flex flex-col gap-3 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                  <ButtonPrimary className="!w-fit">Coming soon</ButtonPrimary>
                  <ButtonSecondary className="!w-fit">
                    I want to lend
                  </ButtonSecondary>
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
                  src="/images/watchformore.svg"
                  className="w-full"
                  alt="watchformore"
                />
              </div>
            </div>
            <div className="absolute bottom-[-120px] h-[304px] w-[304px] rounded-full bg-red-400 dark:bg-semantic-orange-400 " />
            <div className="absolute -top-[31rem] w-full text-center md:block">
              <LineL className="text-primary-500 dark:text-primary-200" />
            </div>
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
                <div className="hidden flex-col py-5 text-primary-500 dark:text-white sm:hidden md:block lg:block xl:block 2xl:block">
                  <h4 className="text-xl font-bold">Join our community</h4>
                  <ul className="mt-3 flex w-fit justify-between gap-4">
                    <li className="text-xl">
                      <a
                        href="#"
                        className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                        <TopTooltip title="Twitter" />
                      </a>
                    </li>
                    <li className="text-xl">
                      <a
                        href="#"
                        className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                      >
                        <FontAwesomeIcon icon={faDiscord} />
                        <TopTooltip title="Discord" />
                      </a>
                    </li>
                    <li className="text-xl">
                      <a
                        href="#"
                        className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                      >
                        <FontAwesomeIcon icon={faMedium} />
                        <TopTooltip title="Medium" />
                      </a>
                    </li>
                    <li className="text-xl">
                      <a
                        href="#"
                        className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />
                        <TopTooltip title="Mail" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex w-full flex-col justify-evenly sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
                <div className="flex w-full gap-5">
                  <div className="w-full">
                    <h2 className="text-xl font-bold text-primary-500 dark:text-white">
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
                    <h2 className="text-xl font-bold text-primary-500 dark:text-white">
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
                    <h2 className="text-xl font-bold text-primary-500 dark:text-white">
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
                    <h2 className="text-xl font-bold text-primary-500 dark:text-white">
                      Stats
                    </h2>
                    <ul className="mt-5 text-gray-900 dark:text-white">
                      <li className="py-2">Ranking</li>
                      <li className="py-2">Activity</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-col py-5 text-primary-500 dark:text-white sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <h4 className="text-xl font-bold">Join our community</h4>
                <ul className="mt-3 flex w-fit justify-between gap-4">
                  <li className="text-xl">
                    <a
                      href="#"
                      className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                      <TopTooltip title="Discord" />
                    </a>
                  </li>
                  <li className="text-xl">
                    <a
                      href="#"
                      className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                    >
                      <FontAwesomeIcon icon={faDiscord} />
                      <TopTooltip title="Discord" />
                    </a>
                  </li>
                  <li className="text-xl">
                    <a
                      href="#"
                      className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                    >
                      <FontAwesomeIcon icon={faMedium} />
                      <TopTooltip title="Medium" />
                    </a>
                  </li>
                  <li className="text-xl">
                    <a
                      href="#"
                      className="group relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-primary-100 active:bg-primary-200 dark:hover:bg-neutral-500"
                    >
                      <FontAwesomeIcon icon={faEnvelope} />
                      <TopTooltip title="Mail" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5 border-t border-primary-500 py-5 text-gray-900 dark:border-white dark:text-white">
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
                <div className="my-4 w-full text-2xl font-medium leading-9 text-neutral-800 dark:text-neutral-100">
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
