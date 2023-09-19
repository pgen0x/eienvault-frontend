import { useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import trading from './trading.json';
import tradingMobile from './trading-mobile.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCartPlus } from '@fortawesome/free-solid-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import { useRouter } from 'next-nprogress-bar';
import Bitcoin from '@/assets/icon/bitcoin';
import Ggtoken from '@/assets/icon/ggtoken';
import Monero from '@/assets/icon/monero';
import { useAuth } from '@/hooks/AuthContext';
import { useAccount } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { ImageWithFallback } from '../imagewithfallback';
// import dataCollections from '../../app/collection/MOCK_DATA.json';
import formatter from '@/utils/shortNumberFormatter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';

const servers = [
  'All Mainnet',
  'Testnet',
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

const Main = () => {
  const [TrendingTop, setTrendingTop] = useState('trending');
  const [Range, setRange] = useState('1h');
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const router = useRouter();

  const handleTrendingTop = (event, target) => {
    setTrendingTop(target);
  };

  const handleRange = (event, target) => {
    setRange(target);
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer w-full px-2.5 py-2 rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-200')
    );
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex max-w-min flex-col gap-3 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
          <div className="flex space-x-1 rounded-full bg-white px-1">
            <label className={classRadio(TrendingTop, 'trending')}>
              Trending
              <input
                className="hidden"
                type="radio"
                name="trendingTopOptions"
                onChange={(event) => handleTrendingTop(event, 'trending')}
              />
            </label>
            <label className={classRadio(TrendingTop, 'top')}>
              Top
              <input
                className="hidden"
                type="radio"
                name="trendingTopOptions"
                onChange={(event) => handleTrendingTop(event, 'top')}
              />
            </label>
          </div>
          <div className="flex space-x-1 rounded-full bg-white px-1">
            <label className={classRadio(Range, '1h')}>
              1h
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '1h')}
              />
            </label>
            <label className={classRadio(Range, '1d')}>
              1d
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '1d')}
              />
            </label>
            <label className={classRadio(Range, '7d')}>
              7d
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '7d')}
              />
            </label>
          </div>
          <div className="w-52 flex-none space-x-1 px-1">
            <Listbox value={selectedServer} onChange={setSelectedServer}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate text-gray-600">
                    {selectedServer}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <svg
                      width="16"
                      height="9"
                      viewBox="0 0 16 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z"
                        fill="#7D778A"
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {servers.map((server, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none px-4 py-2 ${
                          active ? 'bg-primary-500 text-white' : 'text-gray-900'
                        }`
                      }
                      value={server}
                    >
                      {({ selectedServer }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selectedServer ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {server}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>
        <div className="flex items-end px-3">
          <button
            onClick={() => router.push(`/collection`)}
            className="text-primary-500"
          >
            See all
          </button>
        </div>
      </div>
    </>
  );
};

export const TrendingTop = ({ dataCollections }) => {
  const [limit, setLimit] = useState(0);
  const router = useRouter();
  const classFloor = (value) => {
    return Number(value) < 0
      ? 'w-fit rounded-full font-semibold bg-red-500 text-center text-white px-2'
      : 'w-fit rounded-full font-semibold bg-green-500 text-center text-white px-2';
  };

  const classMovement = (value) => {
    return Number(value) < 0
      ? 'w-fit text-center font-semibold text-red-500 px-2'
      : 'w-fit text-center font-semibold text-green-500 px-2';
  };

  const handleResize = () => {
    const screen = window.innerWidth;
    if (screen > 768 && screen < 1280) {
      setLimit(10);
    } else if (screen > 1280 && screen < 1440) {
      setLimit(15);
    } else {
      setLimit(20);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Main />
      <ul
        role="list"
        className="mt-4 grid w-full grid-flow-col grid-rows-5 gap-3"
      >
        {dataCollections.slice(0, limit).map((collection, index) => (
          <li key={index} className="w-full">
            <div className="flex w-full justify-between rounded-md bg-white px-5 py-2">
              <div className="flex w-full items-center gap-x-4">
                <p className="text-sm text-primary-500">{index + 1}.</p>
                <div className="h-11 w-11">
                  <ImageWithFallback
                    src={`/uploads/collections/${collection.logo}`}
                    alt={collection.name}
                    width={48}
                    height={48}
                    diameter={48}
                    address={collection.tokenAddress}
                    className="rounded-full"
                  />
                </div>

                <div className="flex w-full flex-col">
                  <p
                    className="text-md h-[20px] w-full cursor-pointer overflow-hidden text-ellipsis font-semibold leading-6 text-gray-900"
                    onClick={() =>
                      router.push(`/collection/${collection.tokenAddress}`)
                    }
                  >
                    {collection.name}
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full gap-2">
                      <p className="w-full">Floor</p>
                      <p className="w-full">
                        $
                        {Number(
                          formatEther(Number(collection.floorPrice)),
                        ).toFixed(2)}
                      </p>
                      <p
                        className={classFloor(
                          collection.priceChangePercentage1h,
                        )}
                      >
                        {collection.priceChangePercentage1h}%
                      </p>
                    </div>
                    <div className="flex w-full gap-2">
                      <span className="w-full">Volume</span>
                      <p className="w-full">
                        $
                        {Number(formatEther(Number(collection.volume))).toFixed(
                          2,
                        )}
                      </p>
                      <p
                        className={classMovement(
                          collection.volumeChangePercentage1h,
                        )}
                      >
                        {collection.volumeChangePercentage1h}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export const TrendingTopSkeleton = () => {
  const [limit, setLimit] = useState(0);
  const handleResize = () => {
    const screen = window.innerWidth;
    if (screen > 768 && screen < 1280) {
      setLimit(10);
    } else if (screen > 1280 && screen < 1440) {
      setLimit(15);
    } else {
      setLimit(20);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Main />
      <ul
        role="list"
        className="mt-4 grid w-full grid-flow-col grid-rows-5 gap-3"
      >
        {[...Array(limit)].map((x, i) => (
          <li key={i} className="w-full">
            <div className="flex w-full justify-between rounded-md bg-white px-5 py-2">
              <div className="flex min-w-0 items-center gap-x-4">
                <div className="h-3 w-3 animate-pulse rounded-full bg-gray-300"></div>
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-300" />
                <div className="min-w-0 flex-auto">
                  <div className="mb-2 h-4 w-36 animate-pulse rounded-full bg-gray-300" />
                  <div className="truncate text-xs leading-5">
                    <div className="mb-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                  <div className="w-30 truncate text-xs leading-5 text-gray-500">
                    <div className="mb-1 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="mb-2 mt-[1.9rem] h-2 w-10 animate-pulse rounded-full bg-gray-300" />
                <div className="mb-2 mt-1 h-2 w-10 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="flex flex-col items-end">
                <div className="mb-2 mt-[1.9rem] h-2 w-10 animate-pulse rounded-full bg-gray-300" />
                <div className="mb-2 mt-1 h-2 w-10 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const MainMobile = () => {
  const [TrendingTop, setTrendingTop] = useState('trending');
  const [Range, setRange] = useState('1h');
  const [Coin, setCoin] = useState('ethereum');

  const handleTrendingTop = (event, target) => {
    setTrendingTop(target);
  };

  const handleRange = (event, target) => {
    setRange(target);
  };

  const handleCoin = (event, target) => {
    setCoin(target);
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer w-full px-2.5 py-2 rounded-full text-sm font-medium leading-5 text-center flex items-center justify-center ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-200')
    );
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between rounded-full bg-white px-1 py-2">
            <label className={classRadio(TrendingTop, 'trending')}>
              Trending
              <input
                className="hidden"
                type="radio"
                name="trendingTopOptions"
                onChange={(event) => handleTrendingTop(event, 'trending')}
              />
            </label>
            <label className={classRadio(TrendingTop, 'top')}>
              Top
              <input
                className="hidden"
                type="radio"
                name="trendingTopOptions"
                onChange={(event) => handleTrendingTop(event, 'top')}
              />
            </label>
          </div>
          <div className="flex space-x-1 rounded-full bg-white px-1 py-2">
            <label className={classRadio(Range, '1h')}>
              1h
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '1h')}
              />
            </label>
            <label className={classRadio(Range, '1d')}>
              1d
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '1d')}
              />
            </label>
            <label className={classRadio(Range, '7d')}>
              7d
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleRange(event, '7d')}
              />
            </label>
          </div>
          <div className="flex space-x-1 rounded-full bg-white px-1 py-2">
            <label className={classRadio(Coin, 'ethereum')}>
              <Ethereum />
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleCoin(event, 'ethereum')}
              />
            </label>
            <label className={classRadio(Coin, 'bitcoin')}>
              <Bitcoin />
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleCoin(event, 'bitcoin')}
              />
            </label>
            <label className={classRadio(Coin, 'ggtoken')}>
              <Ggtoken />
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleCoin(event, 'ggtoken')}
              />
            </label>
            <label className={classRadio(Coin, 'monero')}>
              <Monero />
              <input
                className="hidden"
                type="radio"
                name="rangeOptions"
                onChange={(event) => handleCoin(event, 'monero')}
              />
            </label>
          </div>
        </div>
        <div className="hidden items-end px-3 sm:hidden md:flex lg:flex xl:flex 2xl:flex">
          <button
            onClick={() => router.push(`/collection`)}
            className="text-primary-500"
          >
            See all
          </button>
        </div>
      </div>
    </>
  );
};

export const TrendingTopMobile = ({ dataCollections }) => {
  const router = useRouter();
  const [nfts, setNfts] = useState({});

  const classFloor = (value) => {
    return Number(value) < 0
      ? 'w-20 rounded-full font-semibold bg-red-500 text-center text-white px-2'
      : 'w-20 rounded-full font-semibold bg-green-500 text-center text-white px-2';
  };

  const classMovement = (value) => {
    return Number(value) < 0
      ? 'font-semibold text-red-500'
      : 'font-semibold text-green-500';
  };

  return (
    <>
      <MainMobile />
      <div className="mt-5 flex flex-col gap-5">
        {dataCollections.map((collection, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl bg-white p-5"
          >
            <div className="flex w-full items-center gap-3 border-b border-gray-300 pb-2">
              <div className="h-11 w-11">
                <ImageWithFallback
                  src={`/uploads/collections/${collection.logo}`}
                  alt={collection.name}
                  width={48}
                  height={48}
                  diameter={48}
                  address={collection.tokenAddress}
                  className="rounded-full"
                />
              </div>
              <h3 className="w-full">{collection.name}</h3>
              <button
                className="h-8 w-12 rounded-full bg-primary-500 text-white hover:bg-primary-300"
                onClick={() =>
                  router.push(`/collection/${collection.tokenAddress}`)
                }
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div className="flex w-full gap-3">
              <div className="flex w-full flex-col gap-3">
                <span>Floor</span>
                <span>
                  $
                  {Number(formatEther(Number(collection.floorPrice))).toFixed(
                    2,
                  )}
                </span>
                <span
                  className={classFloor(collection.priceChangePercentage1h)}
                >
                  {collection.priceChangePercentage1h}%
                </span>
              </div>
              <div className="flex w-full flex-col gap-3">
                <span>Volume</span>
                <span>${formatter(collection.volume)}</span>
                <span
                  className={classMovement(collection.volumeChangePercentage1h)}
                >
                  {collection.volumeChangePercentage1h}%
                </span>
              </div>
            </div>
            <div className="w-full font-semibold text-gray-700">
              {collection.tokenAddress && <MobileNft collection={collection} />}
            </div>
          </div>
        ))}
        <button
          onClick={() => router.push('/collection')}
          className="rounded-full bg-primary-500 py-2 text-white hover:bg-primary-300"
        >
          View more collections
        </button>
      </div>
    </>
  );
};

const MobileNft = ({ collection }) => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  
  useEffect(() => {
    getNfts();
  }, [collection.tokenAddress]);

  const getNfts = async () => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbycollection/${
          collection.tokenAddress
        }?limit=${6}`,
      })
      .then((response) => {
        setNfts(response.data.nfts);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Swiper
      modules={[Scrollbar]}
      spaceBetween={50}
      slidesPerView={4}
      scrollbar={{ draggable: true }}
    >
      {nfts.length == 0 &&
        [...Array(5)].map((nft, index) => {
          return (
            <SwiperSlide>
              <span className="absolute ml-[45px] mt-[5px] rounded-lg bg-gray-500 px-3 py-2 text-xs backdrop-blur-md"></span>
              <div className="flex h-20 w-20 animate-pulse flex-col justify-end bg-gray-300 bg-cover bg-center px-2 text-right">
                <span className="mb-1 flex w-full rounded-lg bg-gray-500 py-2 text-xs"></span>
              </div>
            </SwiperSlide>
          );
        })}
      {nfts.length > 0 &&
        nfts.map((nft, index) => (
          <SwiperSlide
            key={index}
            onClick={() =>
              router.push(`/nft/${nft.collectionAddress}/${nft.tokenId}`)
            }
          >
            <div className="w-full px-1">
              <button className="absolute ml-[45px] mt-[5px] rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
              <div className="h-20 w-20">
                <Image
                  className="h-full w-full object-cover"
                  width={600}
                  height={600}
                  placeholder="blur"
                  blurDataURL={`https://via.placeholder.com/50x50`}
                  src={nft?.imageUri}
                />
              </div>
              <button className="-mt-5 flex w-20 rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                <Ethereum className="h-4 w-4" />{' '}
                <span className="w-full">5 ETH</span>
              </button>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default TrendingTop;
