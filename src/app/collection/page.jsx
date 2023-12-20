'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Footer from '../../components/footer/main';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faChevronDown,
  faCircleCheck,
  faEllipsis,
  faEllipsisVertical,
  faGrip,
  faGripVertical,
  faPenToSquare,
  faSearch,
  faShare,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { Trykker } from 'next/font/google';
import Search from '../../components/navbar/search';
import Ethereum from '@/assets/icon/ethereum';
import { filter } from '@metamask/jazzicon/colors';
import { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useRouter as useNextRouter } from 'next/navigation';
import { formatEther } from 'viem';
import { ImageWithFallback } from '@/components/imagewithfallback';
import formatter from '@/utils/shortNumberFormatter';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { JazzIcon } from '@/components/jazzicon';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonTertiary from '@/components/button/buttonTertiary';
import { SwitchTrenndingTop } from '@/components/switch/trendingTop';
import { SwitchTrenndingTopTime } from '@/components/switch/trendingTopTime';
import ButtonSecondary from '@/components/button/buttonSecondary';
import { truncateAddress } from '@/utils/truncateAddress';

const servers = [
  'All Mainnet',
  'Testnet',
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

const filters = [
  'Price low to high',
  'Price high to low',
  'Recently listed',
  'Best offer',
  'Highest last sale',
  'Recently sold',
  'Recently created',
  'Most viewed',
  'Oldest',
  'Most favorited',
  'Ending soon',
  'Recently received',
];

export default function Collection() {
  const router = useRouter();
  const filterQuery = useSearchParams();
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    floorPrice: false,
    volume: false,
  });
  const [openFilter, setOpenFilter] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionPage, setCollectionPage] = useState(1);
  const [collectionLast, setCollectionLast] = useState(false);

  const [TrendingTop, setTrendingTop] = useState('trending');
  const [Range, setRange] = useState('1h');

  const [sortedCollections, setSortedCollections] = useState([]);
  const [chains, setChains] = useState([]);
  const [filterBlockchain, setFilterBlockchain] = useState('');
  const [filterFloorPrice, setFilterFloorPrice] = useState({
    start: '',
    end: '',
  });
  const [filterVolume, setFilterVolume] = useState({
    start: '',
    end: '',
  });
  const [startFloorPrice, setStartFloorPrice] = useState('');
  const [endFloorPrice, setEndFloorPrice] = useState('');
  const [startVolume, setStartVolume] = useState('');
  const [endVolume, setEndVolume] = useState('');

  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );

  const handleTrendingTop = (target) => {
    setTrendingTop(target);
  };

  const handleRange = (target) => {
    setRange(target);
  };

  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex min-w-[2rem] w-full h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  const classFloor = (value) => {
    return Number(value) < 0
      ? 'w-fit rounded-full font-semibold bg-red-500 text-center text-white px-2 text-xs'
      : 'w-fit rounded-full font-semibold bg-green-500 text-center text-white px-2 text-xs';
  };

  const classMovement = (value) => {
    return Number(value) < 0
      ? 'w-fit text-center font-semibold text-red-500 px-2 text-xs'
      : 'w-fit text-center font-semibold text-green-500 px-2 text-xs';
  };

  const handleScroll = () => {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      if (collectionLast === false) {
        setCollectionPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    const getChains = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
          {
            cache: 'no-store',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!res.ok) {
          console.error('Fetch failed:', res);
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();
        setChains(responseData);
      } catch (error) {
        console.error('Fetch failed:', error);
      }
    };
    getChains();
  }, []);

  const handleSearch = (event) => {
    setCollectionPage(1);
    setCollectionLast(false);
    if (search === '') {
      setCollections([]);
    } else {
      setCollectionPage(1);
    }

    router.push(`?search=${search}`);
    getCollections();
    event.preventDefault();
  };

  useEffect(() => {
    getCollections();
  }, [collectionPage]);

  const getCollections = async () => {
    if (collectionLast === true) return;

    if (search === '') {
      await axios
        .request({
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/get?page=${collectionPage}`,
          // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${collectionPage}`,
        })
        .then((response) => {
          if (response.data.collections.length > 0) {
            if (collectionPage >= response.data.totalPages) {
              setCollectionLast(true); // Set nftLast to true if the current page is the last page
            }
  
            if (collectionPage > 1) {
              setCollections((oldCollections) => [...oldCollections, ...response.data.collections]);
            } else {
              setCollections([...response.data.collections]);
            }
          } else {
            setCollectionLast(true);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      await axios
        .request({
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/search?query=${search}&page=${collectionPage}`,
        })
        .then((response) => {
          if (response.data.collections.length > 0) {
            if (collectionPage >= response.data.totalPages) {
              setCollectionLast(true); // Set nftLast to true if the current page is the last page
            }
  
            if (collectionPage > 1) {
              setCollections((oldCollections) => [...oldCollections, ...response.data.collections]);
            } else {
              setCollections([...response.data.collections]);
            }
          } else {
            setCollectionLast(true);
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            if (collectionPage > 1) {
              setCollectionLast(true);
            } else {
              setCollections([]);
            }
          } else {
            
          }
        });
    }
  };

  useEffect(() => {
    if (collections.length > 0) {
      setSortedCollections(filterCollections());
    }
  }, [collections, filterBlockchain, filterFloorPrice, filterVolume]);

  const filterCollections = () => {
    let result = [];

    for (const collection of collections) {
      if (filterBlockchain !== '') {
        if (collection.chainId !== filterBlockchain) {
          continue;
        }
      }

      if (filterFloorPrice.start !== '' && filterFloorPrice.end !== '') {
        if (
          parseFloat(formatEther(collection.floorPrice)) >=
            parseFloat(filterFloorPrice.start) &&
          parseFloat(formatEther(collection.floorPrice)) <=
            parseFloat(filterFloorPrice.end)
        ) {
        } else {
          continue;
        }
      }

      if (filterVolume.start !== '' && filterVolume.end !== '') {
        if (
          parseFloat(formatEther(collection.volume)) >=
            parseFloat(filterVolume.start) &&
          parseFloat(formatEther(collection.volume)) <=
            parseFloat(filterVolume.end)
        ) {
        } else {
          continue;
        }
      }

      result.push(collection);
    }

    if (TrendingTop == 'trending') {
      var dataSort = result.slice(0);
      dataSort.sort(function (a, b) {
        return (
          Number(b['volumeChangePercentag' + Range]) -
          Number(a['volumeChangePercentag' + Range])
        );
      });
      result = dataSort;
    }

    if (TrendingTop == 'top') {
      var dataSort = result.slice(0);
      dataSort.sort(function (a, b) {
        return b.volume - a.volume;
      });
      result = dataSort;
    }

    return result;
  };

  const handleFilterFloorPrice = (start, end) => {
    setFilterFloorPrice({ start, end });
  };

  const handleFilterVolume = (start, end) => {
    setFilterVolume({ start, end });
  };

  const volumeChangePercentage = (collection) => {
    return collection['volumeChangePercentage' + Range];
  };

  const priceChangePercentage = (collection) => {
    return collection['priceChangePercentage' + Range];
  };

  return (
    <>
      <div className="container m-auto p-3">
        <section>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col gap-2 md:flex-row">
              <div className="flex w-fit gap-1">
                <div className="w-fit">
                  {openFilter ? (
                    <ButtonPrimary
                      onClick={handleOpenFilter}
                      className="flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faSliders} /> <span>Filter</span>
                    </ButtonPrimary>
                  ) : (
                    <ButtonTertiary
                      onClick={handleOpenFilter}
                      className="flex items-center gap-1"
                    >
                      <FontAwesomeIcon icon={faSliders} /> <span>Filter</span>
                    </ButtonTertiary>
                  )}
                </div>
                <SwitchTrenndingTop
                  TrendingTop={TrendingTop}
                  setTrendingTop={setTrendingTop}
                />
                <SwitchTrenndingTopTime Range={Range} setRange={setRange} />
              </div>
              <form
                onSubmit={(event) => handleSearch(event)}
                className="w-full"
              >
                <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-neutral-900">
                  <div className="text-xl font-black text-neutral-300 dark:text-neutral-700">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    type="text"
                    placeholder="Search ..."
                    aria-label="Search"
                    name="search"
                    defaultValue={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-neutral-200 px-2 dark:bg-neutral-700">
                    <div className="text-base font-light leading-normal text-neutral-300 dark:text-neutral-200">
                      /
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="my-5 grid grid-cols-12 gap-6">
            {openFilter && (
              <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-neutral-900 dark:text-white">
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={() => handleFilterCollapse('blockchain')}
                    >
                      <span>Blockchain</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`gap-1 pb-5 ${
                        filterCollapse.blockchain ? 'flex' : 'hidden'
                      }`}
                    >
                      {chains.length == 0 && (
                        <>
                          {[...Array(8)].map((nft, index) => (
                            <div
                              className="col-span-4 h-8 w-full animate-pulse rounded-xl bg-gray-300 px-3 py-1"
                              key={index}
                            />
                          ))}
                        </>
                      )}
                      {chains.length > 0 &&
                        chains
                          .filter(
                            (filterChain) => filterChain.mode == 'testnet',
                          )
                          .map((chain, index) => {
                            return (
                              <>
                                {filterBlockchain === chain.chainId ? (
                                  <ButtonPrimary
                                    key={index}
                                    onClick={() =>
                                      filterBlockchain === chain.chainId
                                        ? setFilterBlockchain('')
                                        : setFilterBlockchain(chain.chainId)
                                    }
                                    className="!w-fit !px-3 text-xs"
                                  >
                                    {chain.symbol}
                                  </ButtonPrimary>
                                ) : (
                                  <ButtonSecondary
                                    key={index}
                                    onClick={() =>
                                      filterBlockchain === chain.chainId
                                        ? setFilterBlockchain('')
                                        : setFilterBlockchain(chain.chainId)
                                    }
                                    className="!w-fit !px-3 text-xs"
                                  >
                                    {chain.symbol}
                                  </ButtonSecondary>
                                )}
                              </>
                            );
                          })}
                    </div>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('floorPrice')}
                    >
                      <span>Floor price</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`target flex flex-col gap-3 pb-2  ${
                        filterCollapse.floorPrice ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="flex flex-row gap-2">
                        <input
                          type="number"
                          placeholder="Start Price"
                          value={startFloorPrice}
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setStartFloorPrice(e.target.value)}
                          className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
                        />
                        <div className="flex items-center justify-center">
                          -
                        </div>
                        <input
                          type="number"
                          placeholder="End Price"
                          value={endFloorPrice}
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setEndFloorPrice(e.target.value)}
                          className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
                        />
                      </div>
                      <ButtonPrimary
                        className="text-sm"
                        onClick={() =>
                          handleFilterFloorPrice(startFloorPrice, endFloorPrice)
                        }
                      >
                        Apply
                      </ButtonPrimary>
                    </div>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('volume')}
                    >
                      <span>Volume</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`target flex flex-col gap-3 pb-2  ${
                        filterCollapse.volume ? 'block' : 'hidden'
                      }`}
                    >
                      <div className="flex flex-row gap-2">
                        <input
                          type="number"
                          placeholder="Start Price"
                          value={startVolume}
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setStartVolume(e.target.value)}
                          className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
                        />
                        <div className="flex items-center justify-center">
                          -
                        </div>
                        <input
                          type="number"
                          placeholder="End Price"
                          value={endVolume}
                          min={0}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setEndVolume(e.target.value)}
                          className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-neutral-500 dark:focus:ring-neutral-500"
                        />
                      </div>
                      <ButtonPrimary
                        className="text-sm"
                        onClick={() =>
                          handleFilterVolume(startVolume, endVolume)
                        }
                      >
                        Apply
                      </ButtonPrimary>
                    </div>
                  </li>
                </ul>
              </div>
            )}
            <div
              className={`col-span-12 overflow-auto rounded-lg bg-white/50 p-3 dark:bg-neutral-900 sm:col-span-12 ${
                openFilter
                  ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                  : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
              }`}
            >
              <div className="grid w-full min-w-[720px] grid-cols-12 text-gray-900">
                <div className="col-span-12 grid grid-cols-12 gap-4 rounded-2xl p-4 font-bold text-primary-500 dark:text-white">
                  <div className="col-span-1 grid text-center">Rank</div>
                  <div className="col-span-5 grid text-center">Collection</div>
                  <div className="col-span-2 grid text-center">Floor price</div>
                  <div className="col-span-2 grid text-center">Volume</div>
                  <div className="col-span-1 grid text-center">Items</div>
                  <div className="col-span-1 grid text-center">Owner</div>
                </div>
                <div className="col-span-12 grid grid-cols-12 gap-2">
                  {sortedCollections.length == 0 && (
                    <div className="col-span-12 w-full text-center font-semibold text-black dark:text-white">
                      Collection not found
                    </div>
                  )}
                  {sortedCollections.length > 0 &&
                    sortedCollections.map((collection, index) => (
                      <div
                        key={index}
                        className={`group col-span-12 grid w-full cursor-pointer grid-cols-12 rounded-xl bg-white p-2 hover:bg-gray-200 dark:bg-neutral-900 dark:text-white hover:dark:bg-neutral-700`}
                        onClick={() =>
                          router.push(
                            `/collection/${
                              collection?.slug
                                ? collection.slug
                                : collection?.tokenAddress
                            }`,
                          )
                        }
                      >
                        <div className="col-span-1 flex items-center justify-center font-bold text-primary-500 dark:text-white">
                          {index + 1}.
                        </div>
                        <div className="flex-items-center col-span-5 flex gap-3">
                          <div className="w-full flex-1">
                            <div className="h-[48px] w-[48px]">
                              {collection?.logo ? (
                                <ImageWithFallback
                                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${collection.logo}`}
                                  alt={collection?.name}
                                  width={48}
                                  height={48}
                                  diameter={48}
                                  address={collection?.tokenAddress}
                                  className="rounded-full"
                                />
                              ) : (
                                <JazzIcon
                                  diameter={48}
                                  seed={collection?.tokenAddress}
                                  useGradientFallback={true}
                                  className="h-[48px] w-[48px] rounded-full"
                                />
                              )}
                            </div>
                          </div>
                          <span className="flex w-full items-center">
                            {collection.name
                              ? collection.name
                              : truncateAddress(collection?.userAddress)}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center justify-center gap-2">
                          {collection.floorPrice
                            ? Number(
                                formatEther(collection.floorPrice),
                              ).toFixed(2)
                            : '0.00'}
                          <p
                            className={classFloor(
                              priceChangePercentage(collection),
                            )}
                          >
                            {Number(priceChangePercentage(collection)).toFixed(
                              2,
                            )}
                            %
                          </p>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                          $
                          {collection.floorPrice
                            ? Number(formatEther(collection.volume)).toFixed(0)
                            : '0'}
                          <p
                            className={classMovement(
                              volumeChangePercentage(collection),
                            )}
                          >
                            {Number(volumeChangePercentage(collection)).toFixed(
                              2,
                            )}
                            %
                          </p>
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          {collection.totalItems}
                        </div>
                        <div className="col-span-1 flex items-center justify-center">
                          {collection.totalOwners}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
