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
import Image from 'next/legacy/image';
import { JazzIcon } from '../jazzicon';

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
            <label
              className={classRadio(TrendingTop, 'trending')}
              for="optionTrending"
            >
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
          <a href="#" className="text-primary-500">
            See all
          </a>
        </div>
      </div>
    </>
  );
};

export const TrendingTop = () => {
  const [limit, setLimit] = useState(0);
  const { token } = useAuth();
  const { address } = useAccount();
  const [dataCollections, setDataCollections] = useState([]);
  const [errorCollections, setErrorCollections] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const formatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
  };

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

  useEffect(() => {
    const fetchData = async () => {
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
        console.log(responseData);
        setDataCollections(responseData);
      } catch (error) {
        setErrorCollections(true);
        console.error('Fetch failed:', error);
      } finally {
        setIsLoading(false);
        setErrorCollections(false);
      }
    };

    fetchData();
  }, [token, address]);

  return (
    <>
      <Main />
      <ul
        role="list"
        className="mt-2 grid w-full grid-flow-col grid-rows-5 gap-3"
      >
        {dataCollections.slice(0, limit).map((trade, index) => (
          <li key={index} className="w-full">
            <div className="flex w-full justify-between rounded-md bg-white px-5 py-2">
              <div className="flex w-full items-center gap-x-4">
                <p className="text-sm text-primary-500">{index + 1}.</p>
                {trade.logo !== null ? (
                  <Image
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    width={48}
                    height={48}
                    src={`/uploads/collections/${trade.logo}`}
                    alt=""
                  />
                ) : (
                  <JazzIcon
                    diameter={48}
                    seed={trade.tokenAddress}
                    useGradientFallback={true}
                  />
                )}

                <div className="flex w-full flex-col">
                  <p className="text-md w-full font-semibold leading-6 text-gray-900">
                    {trade.name}
                  </p>
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex w-full gap-2">
                      <p className="w-full">Floor</p>
                      <p className="w-full">
                        ${formatEther(Number(trade.floorPrice))}
                      </p>
                      <p className={classFloor(trade.priceChangePercentage1h)}>
                        {trade.priceChangePercentage1h}%
                      </p>
                    </div>
                    <div className="flex w-full gap-2">
                      <span className="w-full">Volume</span>
                      <p className="w-full">${formatter(trade.volume)}</p>
                      <p
                        className={classMovement(
                          trade.volumeChangePercentage1h,
                        )}
                      >
                        {trade.volumeChangePercentage1h}%
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
        className="mt-2 grid w-full grid-flow-col grid-rows-5 gap-3"
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
          <a href="#" className="text-primary-500">
            See all
          </a>
        </div>
      </div>
    </>
  );
};

export const TrendingTopMobile = () => {
  const router = useRouter();
  const formatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'K' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
      : '0';
  };

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
        {trading.slice(trading.length - 3).map((trade, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 rounded-xl bg-white p-5"
          >
            <div className="flex w-full items-center gap-3 border-b border-gray-300 pb-2">
              <img
                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                width={40}
                height={40}
                src={trade.imageUrl}
                alt=""
              />
              <h3 className="w-full">{trade.name}</h3>
              <button className="h-8 w-12 rounded-full bg-primary-500 text-white hover:bg-primary-300">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
            <div className="flex w-full gap-3">
              <div className="flex w-full flex-col gap-3">
                <span>Floor</span>
                <span>${formatter(trade.floor)}</span>
                <span className={classFloor(trade.movement_floor)}>
                  {trade.movement_floor}%
                </span>
              </div>
              <div className="flex w-full flex-col gap-3">
                <span>Volume</span>
                <span>${formatter(trade.volume)}</span>
                <span className={classMovement(trade.movement_volume)}>
                  {trade.movement_volume}%
                </span>
              </div>
            </div>
            <div className="flex gap-3 font-semibold text-gray-700">
              <div>
                <button className="absolute ml-[45px] mt-[5px] rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <div
                  className="flex h-20 w-20 flex-col justify-end bg-cover bg-center text-right"
                  style={{ backgroundImage: 'url(' + trade.imageUrl + ')' }}
                >
                  <button className="ml-1 flex rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                    <Ethereum className="h-4 w-4" /> <span>5 ETH</span>
                  </button>
                </div>
              </div>
              <div>
                <button className="absolute ml-[45px] mt-[5px] rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <div
                  className="flex h-20 w-20 flex-col justify-end bg-cover bg-center text-right"
                  style={{ backgroundImage: 'url(' + trade.imageUrl + ')' }}
                >
                  <button className="ml-1 flex rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                    <Ethereum className="h-4 w-4" /> <span>5 ETH</span>
                  </button>
                </div>
              </div>
              <div>
                <button className="absolute ml-[45px] mt-[5px] rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
                <div
                  className="flex h-20 w-20 flex-col justify-end bg-cover bg-center text-right"
                  style={{ backgroundImage: 'url(' + trade.imageUrl + ')' }}
                >
                  <button className="ml-1 flex rounded-lg bg-white/10 px-2 py-1 text-xs backdrop-blur-md">
                    <Ethereum className="h-4 w-4" /> <span>5 ETH</span>
                  </button>
                </div>
              </div>
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

export default TrendingTop;
