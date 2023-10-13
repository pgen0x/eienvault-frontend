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
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(true);
  const [collections, setCollections] = useState([]);
  const [collectionPage, setCollectionPage] = useState(1);
  const [TrendingTop, setTrendingTop] = useState('trending');
  const [Range, setRange] = useState('1h');
  const [collectionLast, setCollectionLast] = useState(false);
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
            setCollections((oldCollections) => [
              ...oldCollections,
              ...response.data.collections,
            ]);
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
            if (collectionPage > 1) {
              setCollections((oldCollections) => [
                ...oldCollections,
                ...response.data.collections,
              ]);
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
            toast.error(error.message);
          }
        });
    }
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
                  <button
                    className={`flex items-center gap-1 rounded-full px-4 py-2 hover:bg-primary-300 ${
                      openFilter
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-primary-500'
                    }`}
                    onClick={handleOpenFilter}
                  >
                    <FontAwesomeIcon icon={faSliders} /> <span>Filter</span>
                  </button>
                </div>
                <div className="flex w-fit space-x-1 rounded-full border border-gray-200 bg-white dark:bg-zinc-700 dark:border-zinc-500 px-1 py-1">
                  <label
                    className={`px-3 ${classRadio(TrendingTop, 'trending')}`}
                  >
                    Trending
                    <input
                      className="hidden"
                      type="radio"
                      name="trendingTopOptions"
                      onChange={(event) => handleTrendingTop('trending')}
                    />
                  </label>
                  <label className={`px-3 ${classRadio(TrendingTop, 'top')}`}>
                    Top
                    <input
                      className="hidden"
                      type="radio"
                      name="trendingTopOptions"
                      onChange={(event) => handleTrendingTop('top')}
                    />
                  </label>
                </div>
                <div className="flex w-fit space-x-1 rounded-full border border-gray-200 bg-white dark:bg-zinc-700 dark:border-zinc-500 px-1 py-1">
                  <label className={classRadio(Range, '1h')}>
                    1h
                    <input
                      className="hidden"
                      type="radio"
                      name="rangeOptions"
                      onChange={(event) => handleRange('1h')}
                    />
                  </label>
                  <label className={classRadio(Range, '1d')}>
                    1d
                    <input
                      className="hidden"
                      type="radio"
                      name="rangeOptions"
                      onChange={(event) => handleRange('1d')}
                    />
                  </label>
                  <label className={classRadio(Range, '7d')}>
                    7d
                    <input
                      className="hidden"
                      type="radio"
                      name="rangeOptions"
                      onChange={(event) => handleRange('7d')}
                    />
                  </label>
                </div>
              </div>
              <form
                onSubmit={(event) => handleSearch(event)}
                className="w-full"
              >
                <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-zinc-700">
                  <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    type="text"
                    placeholder="Search ..."
                    aria-label="Search"
                    name="search"
                    defaultValue={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                  <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                    <div className="text-base font-light leading-normal text-zinc-500">
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
                <ul className="divide-y rounded-xl bg-white dark:bg-zinc-700 dark:text-white p-5 font-bold text-gray-900">
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={() => handleFilterCollapse('blockchain')}
                    >
                      <span>Blockchain</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`target py-5 ${
                        filterCollapse.blockchain ? 'block' : 'hidden'
                      }`}
                    >
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('category')}
                    >
                      <span>Category</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('price')}
                    >
                      <span>Floor price</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('status')}
                    >
                      <span>Status</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('currency')}
                    >
                      <span>Currency</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('collection')}
                    >
                      <span>Collection</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div
              className={`col-span-12 overflow-auto sm:col-span-12 ${
                openFilter
                  ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                  : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
              }`}
            >
              <div className="grid w-full min-w-[720px] grid-cols-12 text-gray-900">
                <div className="col-span-12 grid grid-cols-12 gap-4 rounded-2xl px-10 py-4 font-bold text-primary-500">
                  <div className="col-span-1 grid">Rank</div>
                  <div className="col-span-5 grid">Collection</div>
                  <div className="col-span-2 grid">Floor price</div>
                  <div className="col-span-2 grid">Volume</div>
                  <div className="col-span-1 grid">Items</div>
                  <div className="col-span-1 grid">Owner</div>
                </div>
                <div className="border-2 border-gray-200 bg-gray-100 dark:bg-zinc-700 dark:border-zinc-500 grid col-span-12 grid-cols-12 gap-3 rounded-lg p-3">
                  {collections.length == 0 && (
                    <div className="col-span-12 w-full text-center font-semibold text-black">
                      Collection not found
                    </div>
                  )}
                  {collections.length > 0 &&
                    collections.map((collection, index) => (
                      <div
                        key={index}
                        className={`group col-span-12 grid w-full cursor-pointer grid-cols-12 rounded-xl px-5 py-2 dark:bg-zinc-600 hover:dark:bg-zinc-500 dark:text-white bg-gray-50 hover:bg-gray-200 p-3`}
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
                        <div className="col-span-1 flex items-center justify-center font-bold text-primary-500">
                          {index + 1}.
                        </div>
                        <div className="flex-items-center col-span-5 flex gap-3">
                          <div className="w-full flex-1">
                            <div className="h-[48px] w-[48px]">
                              <ImageWithFallback
                                src={`/uploads/collections/${collection.logo}`}
                                alt={collection?.name}
                                width={48}
                                height={48}
                                diameter={48}
                                address={collection?.tokenAddress}
                                className="rounded-full"
                              />
                            </div>
                          </div>
                          <span className="flex w-full items-center">
                            {collection.name
                              ? collection.name
                              : collection?.userAddress}
                          </span>
                        </div>
                        <div className="col-span-2 flex items-center gap-2">
                          {collection.floorPrice
                            ? Number(
                                formatEther(Number(collection.floorPrice)),
                              ).toFixed(2)
                            : '0.00'}
                          <p
                            className={classFloor(
                              priceChangePercentage(collection),
                            )}
                          >
                            {priceChangePercentage(collection)}%
                          </p>
                        </div>
                        <div className="col-span-2 flex items-center">
                          ${formatter(collection.volume)}
                          <p
                            className={classMovement(
                              volumeChangePercentage(collection),
                            )}
                          >
                            {volumeChangePercentage(collection)}%
                          </p>
                        </div>
                        <div className="col-span-1 flex items-center">
                          {collection.totalItems}
                        </div>
                        <div className="col-span-1 flex items-center">
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
