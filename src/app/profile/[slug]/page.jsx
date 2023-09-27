'use client';

import { useState } from 'react';
import Footer from '@/components/footer/main';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faCircleCheck,
  faEllipsis,
  faGrip,
  faGripVertical,
  faPenToSquare,
  faSearch,
  faShare,
  faSliders,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import { useEffect } from 'react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import { useAccount, useNetwork } from 'wagmi';
import { useSearchParams } from 'next/navigation';
import { formatEther, isAddress } from 'viem';
import { ImageWithFallback } from '@/components/imagewithfallback';
import ModalCreateCollection from '@/components/modal/createCollections';
import Image from 'next/image';
import moment from 'moment';
import {
  NftItemDetail,
  NftItemDetailSkeleton,
} from '@/components/nft/itemDetail';
import NotFound from '@/app/not-found';
import ModalBid from '@/components/modal/bid';
import ModalBuy from '@/components/modal/buy';
import ModalPutOnSale from '@/components/modal/putOnSale';

const servers = [
  'All Mainnet',
  'Testnet',
  'Durward Reynolds',
  'Kenton Towne',
  'Therese Wunsch',
  'Benedict Kessler',
  'Katelyn Rohan',
];

const blockchains = [
  'Arbitrum',
  'Expeliomus',
  'Crucio',
  'Expecto',
  'Patronom',
  'Obliviate',
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

export default function ProfilePage({ params }) {
  const { address } = useAccount();
  const router = useRouter();
  const { token } = useAuth();
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [limitCollection, setLimitCollection] = useState(5);
  const [activePage, setActivePage] = useState('Collections');
  const [renderPage, setRenderPage] = useState();
  const [profile, setProfile] = useState({});
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);

  const handleResize = () => {
    const screen = window.innerWidth;
    if (screen < 640) {
      setLimitCollection(2);
    } else {
      setLimitCollection(5);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile(token);
    }
  }, [token]);

  const getProfile = async (token) => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/${params.slug}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        toast.error(JSON.stringify(error));
      });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChangePage = (collection) => {
    setActivePage(collection.name);
    router.push(`?${collection.slug.toLowerCase()}`);
  };

  if (params?.slug === undefined && address === undefined) {
    return <NotFound />;
  }

  const handleOpenModalBuy = async (
    marketId,
    price,
    imageUri,
    name,
    tokenId,
    ChainSymbol,
    ChainName,
  ) => {
    setBuyData({
      marketId,
      price,
      imageUri,
      name,
      tokenId,
      ChainSymbol,
      ChainName,
    });
    setisOpenModalBuy(true);
  };

  const handleOpenModalBid = async (
    marketId,
    listingPrice,
    imageUri,
    tokenId,
    price,
    name,
    collectionData,
    highestBid,
    lowestBid,
  ) => {
    setAcutionData({
      marketId,
      listingPrice,
      imageUri,
      tokenId,
      price,
      name,
      collectionData,
      highestBid,
      lowestBid,
    });
    setisOpenModalBid(true);
  };

  const handleOpenModalPutonsale = async (tokenId, collectionAddress) => {
    setPutonsaleData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalPutonsale(true);
  };

  function closeModalBid() {
    setisOpenModalBid(false);
  }

  function closeModalBuy() {
    setisOpenModalBuy(false);
  }

  function closeModalPutonsale() {
    setisOpenModalPutonsale(false);
  }

  const placeBid = async (marketId, price) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'makeAnOfferNative',
        args: [marketId, price],
        account: address,
        value: price,
      });
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  const buyAction = async (marketId, price) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'makeAnOfferNative',
        args: [marketId, price],
        account: address,
        value: price,
      });
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  const listCollections = [
    {
      name: 'Owned',
      slug: 'Owned',
      badge: 0,
      page: (
        <Owned
          userAccount={params?.slug ? params.slug : address}
          handleOpenModalBuy={handleOpenModalBuy}
          handleOpenModalBid={handleOpenModalBid}
          handleOpenModalPutonsale={handleOpenModalPutonsale}
        />
      ),
    },
    {
      name: 'Collections',
      slug: 'Collections',
      badge: 0,
      page: <Collection userAccount={params?.slug ? params.slug : address} />,
    },
    {
      name: 'On sale',
      slug: 'Onsale',
      badge: 0,
      page: <Onsale userAccount={params?.slug ? params.slug : address} />,
    },
    {
      name: 'Sold',
      slug: 'Sold',
      badge: 0,
      page: <Sold userAccount={params?.slug ? params.slug : address} />,
    },
    {
      name: 'Liked',
      slug: 'Liked',
      badge: 0,
      page: <Liked userAccount={params?.slug ? params.slug : address} />,
    },
  ];

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    listCollections.map((collection) => {
      if (urlParams.get(collection.slug.toLowerCase()) === '') {
        setActivePage(collection.name);
      }
    });
  }, []);

  useEffect(() => {
    listCollections.map((collection) => {
      if (collection.name === activePage) {
        setRenderPage(collection.page);
      }
    });
  }, [activePage]);

  return (
    <>
      <section>
        <div className="w-full">
          <img
            src="https://fakeimg.pl/1920x266"
            className="h-[266px] object-cover"
          />
        </div>
      </section>
      <div className="container m-auto p-3">
        <section>
          <div className="mt-5 flex justify-between">
            <div className="flex w-full flex-col">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="relative -mt-[5rem]">
                    <img
                      className="w-36 rounded-full border-4 border-white shadow dark:border-zinc-700"
                      src="https://fakeimg.pl/100x100"
                    />
                  </div>
                  <div className="mt-3 flex w-full text-xl font-semibold text-gray-900">
                    {profile.username ? (
                      <span>{profile.username}</span>
                    ) : (
                      <span>
                        {profile.walletAddress
                          ? truncateAddress(profile.walletAddress)
                          : ''}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 line-clamp-2 text-lg  text-gray-900">
                    {profile.bio}
                  </div>
                </div>
                <div className="col-span-12 flex justify-end sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="flex w-full flex-col gap-5 rounded-xl bg-white sm:w-full sm:bg-white md:w-56 md:bg-transparent lg:w-56 lg:bg-transparent xl:w-56 xl:bg-transparent 2xl:w-56 2xl:bg-transparent">
                    <div className="flex w-full divide-x divide-gray-200 rounded-xl bg-white p-5 text-gray-900 dark:divide-zinc-600 dark:bg-zinc-700 dark:text-white">
                      <div className="w-full text-center">
                        <h2>2</h2>
                        <p>Followers</p>
                      </div>
                      <div className="w-full text-center">
                        <h2>129</h2>
                        <p>Following</p>
                      </div>
                    </div>
                    <div className="w-full justify-between rounded-xl bg-white p-5 text-gray-900 dark:bg-zinc-700 dark:text-white">
                      <p>Address</p>
                      <div>
                        <Listbox
                          value={selectedServer}
                          onChange={setSelectedServer}
                        >
                          <div className="relative z-30">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-zinc-600 dark:bg-zinc-700 sm:text-sm">
                              <span className="block truncate text-gray-600 dark:text-white">
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
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700 sm:text-sm">
                              {servers.map((server, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900 dark:text-white'
                                    }`
                                  }
                                  value={server}
                                >
                                  {({ selectedServer }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedServer
                                            ? 'font-medium'
                                            : 'font-normal'
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
                  </div>
                </div>
                {address === params.slug && (
                  <div className="col-span-12 flex gap-1 font-semibold text-white">
                    <button
                      className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300"
                      onClick={() => router.push(`/profile/setting`)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                    </button>
                    <button
                      className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300"
                      href="#"
                    >
                      Sell
                    </button>
                    <button
                      className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300"
                      href="#"
                    >
                      <FontAwesomeIcon icon={faShare} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="inline">
          <ul className="my-5 flex w-full gap-10 border-b border-gray-200 text-primary-500">
            {listCollections
              .slice(0, limitCollection)
              .map((collection, index) => {
                if (collection.active) {
                  setActivePage(collection.name);
                }
                return (
                  <li
                    key={index}
                    onClick={() => handleChangePage(collection)}
                    className={`flex cursor-pointer gap-2 pb-3 ${
                      activePage === collection.name
                        ? 'border-b-4 border-primary-500'
                        : ''
                    }`}
                  >
                    <span className="line-clamp-1">{collection.name}</span>
                    {collection.badge > 0 && (
                      <span className="h-4 w-4 rounded-full bg-red-400 text-center text-xs font-semibold text-white">
                        {collection.badge}
                      </span>
                    )}
                  </li>
                );
              })}
            {limitCollection != listCollections.length ? (
              <li className="group cursor-pointer">
                <span className="pb-3">More</span>{' '}
                <FontAwesomeIcon icon={faChevronDown} />
                <ul className="absolute z-30 mt-3 hidden flex-col gap-3 rounded-b-xl border-b border-gray-200 bg-white py-3 text-primary-500 group-hover:flex">
                  {listCollections
                    .slice(limitCollection)
                    .map((collection, index) => (
                      <li
                        key={index}
                        onClick={() => handleChangePage(collection)}
                        className={`flex cursor-pointer gap-2 px-5 ${
                          activePage === collection.name
                            ? 'border-b-4 border-primary-500'
                            : ''
                        }`}
                      >
                        <span>{collection.name}</span>
                        {collection.badge > 0 && (
                          <span className="h-4 w-4 rounded-full bg-red-400 text-center text-xs font-semibold text-white">
                            {collection.badge}
                          </span>
                        )}
                      </li>
                    ))}
                </ul>
              </li>
            ) : (
              ''
            )}
          </ul>
        </section>
        {renderPage}
      </div>
      <ModalBid
        isOpenModal={isOpenModalBid}
        onClose={closeModalBid}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModalBid}
      />
      <ModalBuy
        isOpenModal={isOpenModalBuy}
        onClose={closeModalBuy}
        dataBuy={buyData}
        buyAction={buyAction}
        onModalClose={closeModalBuy}
      />
      <ModalPutOnSale
        isOpenModal={isOpenModalPutonsale}
        onClose={closeModalPutonsale}
        onModalClose={closeModalPutonsale}
        putonsaledata={putOnSaleData}
      />
      <Footer />
    </>
  );
}

const Collection = ({ userAddress }) => {
  const router = useRouter();
  const { chain } = useNetwork();
  const filterQuery = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionPage, setCollectionPage] = useState(1);
  const [collectionLast, setCollectionLast] = useState(false);
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [gridList, setGridList] = useState('grid');
  const [stepCreate, setStepCreate] = useState(1);
  const [modalCreate, setModalCreate] = useState(false);
  const { address } = useAccount();
  const { token } = useAuth();
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [chains, setChains] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain?.id || 666888,
    symbol: chain?.nativeCurrency.symbol || 'HLUSD',
  });

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

    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/getbyuseraddress/${address}?query=${search}&page=${collectionPage}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${collectionPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setCollections((oldCollections) => [
            ...oldCollections,
            ...response.data.data,
          ]);
        } else {
          setCollectionLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleModalCreate = () => {
    if (!token) {
      open();
    } else {
      setIsCreateCollection(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
          {
            cache: 'force-cache',
          },
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const dataChain = await res.json();
        setChains(dataChain);
        // Continue with your code
      } catch (error) {
        console.error('Fetch failed:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [isCreateCollection]);

  const closeModal = () => {
    setIsCreateCollection(false);
  };

  const handleStepCreate = (Create) => {
    setStepCreate(Create);
  };

  return (
    <>
      <section>
        <div className="my-5 grid grid-cols-12 gap-1">
          <div className="col-span-12 flex gap-2 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
            >
              <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-gray-800">
                <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-600">
                      {selectedFilter}
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
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900'
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
            </form>
            <div className="hidden space-x-1 rounded-full border border-gray-200 bg-white px-1 py-1 sm:hidden md:flex lg:flex xl:flex 2xl:flex">
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionGrid"
                  onChange={(event) => handleGridList(event, 'grid')}
                />
                <label
                  className={classRadio(gridList, 'grid')}
                  htmlFor="optionGrid"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionList"
                  onChange={(event) => handleGridList(event, 'list')}
                />
                <label
                  className={classRadio(gridList, 'list')}
                  htmlFor="optionList"
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
            <div className="grid w-full grid-cols-12 gap-6 text-gray-900">
              {address === userAddress && (
                <div className="col-span-12 mb-4 h-[280px] w-full sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-gray-200">
                    <button
                      className="w-fit rounded-full bg-primary-500 px-4 py-1 text-white hover:bg-primary-300"
                      onClick={handleModalCreate}
                    >
                      Create a new collection
                    </button>
                    {/* <button className="w-fit px-4 py-1 font-semibold text-primary-500 hover:text-primary-300">
                      Import existing collection
                    </button> */}
                  </div>
                </div>
              )}
              {collections.length == 0 && !isLoading && (
                <div
                  className={`w-full text-center font-semibold text-black ${
                    address === userAddress
                      ? 'sm:col-span-6 md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                      : 'col-span-12'
                  }`}
                >
                  Collection not found
                </div>
              )}
              {collections.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <ItemCollectionSkeleton key={index} gridList={gridList} />
                  ))}
                </>
              )}
              {collections.length > 0 &&
                collections.map((collection, index) => (
                  <ItemCollection
                    key={index}
                    collection={collection}
                    gridList={gridList}
                  />
                ))}
            </div>
          </div>
        </div>
        {modalCreate && (
          <div
            className="relative z-[100]"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="text-gray-900">
                    {stepCreate == 1 && (
                      <section className="step-1 flex flex-col gap-3 overflow-y-auto bg-gray-100 p-5">
                        <div className="flex w-full justify-between">
                          <h3 className="font-semibold">Create collection</h3>
                          <button
                            onClick={handleModalCreate}
                            className="text-primary-500"
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                        <div className="w-full">
                          Deploying your own contract requires uploading your
                          metadata outside of OpenSea.
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Upload your item
                          </label>
                          <div className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-5 text-center">
                            <FontAwesomeIcon
                              icon={faImage}
                              className="text-6xl"
                            />
                            <div className="">
                              400 x 400 pixel is recommended
                            </div>
                            <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white">
                              Choose file
                              <input type="file" className="hidden" />
                            </label>
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Name
                          </label>
                          <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                            <input
                              type="text"
                              className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                              placeholder="Name of your collection"
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-bold leading-6 text-gray-900">
                            Token symbol
                          </label>
                          <span>
                            The token symbol is shown on the block explorer when
                            others view your smart contract. e:g : Bitcoin shown
                            as BTC
                          </span>
                          <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                            <input
                              type="number"
                              className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                              placeholder="AAA"
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <label className="block text-sm leading-6 text-gray-900">
                            Blockchain
                          </label>
                          <Listbox
                            disabled={stepCreate == 3 ? true : false}
                            value={selectedBlockchain}
                            onChange={setSelectedBlockchain}
                          >
                            <div className="relative z-20">
                              <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  <Ethereum />
                                </span>
                                <span className="block truncate pl-5 text-gray-600">
                                  {selectedBlockchain}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                                {blockchains.map((blockchain, index) => (
                                  <Listbox.Option
                                    key={index}
                                    className={({ active }) =>
                                      `relative cursor-default select-none px-4 py-2 ${
                                        active
                                          ? 'bg-primary-500 text-white'
                                          : 'text-gray-900'
                                      }`
                                    }
                                    value={blockchain}
                                  >
                                    {({ selectedBlockchain }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selectedBlockchain
                                              ? 'font-medium'
                                              : 'font-normal'
                                          }`}
                                        >
                                          {blockchain}
                                        </span>
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </div>
                          </Listbox>
                        </div>
                        <button
                          className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white disabled:bg-primary-200"
                          onClick={() => handleStepCreate(stepCreate + 1)}
                        >
                          Create an offer
                        </button>
                      </section>
                    )}
                    {stepCreate == 2 && (
                      <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Deploying your contract
                            </h3>
                            <span>
                              Check your wallet and do an approvement to
                              continue deploying your contract
                            </span>
                          </div>
                          <button
                            className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                            onClick={() => handleStepCreate(stepCreate - 1)}
                          >
                            Cancel
                          </button>
                          <button
                            className="font-bold text-primary-500 hover:text-primary-400"
                            onClick={() => handleStepCreate(stepCreate + 1)}
                          >
                            Next
                          </button>
                        </div>
                      </section>
                    )}
                    {stepCreate == 3 && (
                      <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Your contract has been deploying
                            </h3>
                            <span>Wait a moment, deploying on progress.</span>
                          </div>
                          <button
                            className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                            onClick={() => handleStepCreate(stepCreate + 1)}
                          >
                            View on etherscan
                          </button>
                          <button
                            className="font-bold text-primary-500 hover:text-primary-400"
                            onClick={() => handleStepCreate(stepCreate - 1)}
                          >
                            Cancel
                          </button>
                        </div>
                      </section>
                    )}
                    {stepCreate == 4 && (
                      <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <img
                            src="https://fakeimg.pl/84x84"
                            className="h-20 w-20 rounded-lg"
                          />
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Your collections is now created!
                            </h3>
                            <span>
                              Clik the customize button to adjust your
                              collections setting.
                            </span>
                          </div>
                          <div className="justiry-between flex w-full gap-2">
                            <button
                              className="w-full rounded-full bg-primary-500 py-2 font-bold text-white hover:text-primary-400"
                              onClick={handleModalCreate}
                            >
                              Customize
                            </button>
                            <button
                              className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                              onClick={handleModalCreate}
                            >
                              Later
                            </button>
                          </div>
                        </div>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <ModalCreateCollection
        chains={chains}
        isOpenModal={isCreateCollection}
        selectedChain={selectedBlockchain}
        setSelectedChain={setSelectedBlockchain}
        onClose={closeModal}
        onModalClose={closeModal}
      />
    </>
  );
};

const ItemCollection = ({ collection, gridList }) => {
  return (
    <div
      className={`group col-span-6 h-[320px] w-full sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] ${
        gridList == 'grid'
          ? 'sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3'
          : 'sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <img
        className="relative z-10 h-[200px] w-full rounded-2xl object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all"
        src="https://fakeimg.pl/325x175"
      />
      <div className="grid grid-cols-12 p-3">
        <div className="relative -top-[60px] z-10 col-span-12 flex gap-1 rounded-tl-2xl rounded-tr-2xl bg-white bg-opacity-50 p-2 sm:col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          <div className="w-fit">
            <ImageWithFallback
              src={`/uploads/collections/${collection?.logo}`}
              alt={collection?.name}
              width={36}
              height={36}
              diameter={36}
              address={collection?.tokenAddress}
              className="w-full rounded-lg border-4 border-white shadow"
            />
          </div>
          <div className="w-full text-right">
            <h3 className="line-clamp-1 h-[10px] text-xs leading-[10px]">
              {collection.name
                ? collection.name
                : collection.tokenAddress
                ? truncateAddress(collection.tokenAddress)
                : ''}
            </h3>
            <h3 className="text-sm font-semibold">1 Owner</h3>
          </div>
        </div>
      </div>
      <div className="relative -top-[85px] inline-flex w-full flex-col items-center justify-center lg:items-start">
        <div className="relative flex w-full flex-row px-3">
          <div className="inline-flex w-full flex-col items-start justify-start rounded-bl-2xl rounded-br-2xl bg-gray-50 p-3 backdrop-blur-xl">
            <div className="flex w-full flex-col justify-between rounded-md bg-gray-100 px-2 py-2 sm:flex-col md:flex-row">
              <div className="flex shrink-0 flex-col truncate text-sm leading-5 sm:items-start">
                <p>Total Volume</p>
                <p className="font-bold">
                  {collection.volume
                    ? Number(formatEther(Number(collection.volume))).toFixed(2)
                    : '0.00'}{' '}
                  ETH
                </p>
              </div>
              <div className="flex shrink-0 flex-col truncate text-sm leading-5 sm:items-start">
                <p>Floor</p>
                <p className="font-bold">
                  {collection.floorPrice
                    ? Number(
                        formatEther(Number(collection.floorPrice)),
                      ).toFixed(2)
                    : '0.00'}{' '}
                  ETH
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                router.push(
                  `/collection/${
                    collection?.slug
                      ? collection.slug
                      : collection?.tokenAddress
                  }`,
                )
              }
              className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all"
            >
              View Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemCollectionSkeleton = ({ collection, gridList }) => {
  return (
    <div
      className={`col-span-6 h-[320px] w-full sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] ${
        gridList == 'grid'
          ? 'sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3'
          : 'sm:col-span-4 md:col-span-3 lg:col-span-2 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <div
        className="relative z-10 h-[200px] w-full animate-pulse rounded-2xl bg-gray-300 object-cover"
        src="https://fakeimg.pl/325x175"
      />
      <div className="grid grid-cols-12 p-3">
        <div className="relative -top-[60px] z-10 col-span-12 flex gap-1 rounded-tl-2xl rounded-tr-2xl bg-white bg-opacity-50 p-2 sm:col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
          <div className="w-fit">
            <div className="h-9 w-9 rounded-full bg-gray-300" />
          </div>
          <div className="flex w-full flex-col items-end gap-1 text-right">
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-300 text-xs" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
      <div className="relative -top-[85px] inline-flex w-full flex-col items-center justify-center lg:items-start">
        <div className="relative flex w-full flex-row px-3">
          <div className="inline-flex w-full flex-col items-start justify-start rounded-bl-2xl rounded-br-2xl bg-gray-50 p-3 backdrop-blur-xl">
            <div className="flex w-full flex-col justify-between rounded-md bg-gray-100 px-2 py-2 sm:flex-col md:flex-row">
              <div className="flex shrink-0 flex-col gap-2 truncate text-sm leading-5 sm:items-start">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
              </div>
              <div className="flex shrink-0 flex-col gap-2 truncate text-sm leading-5 sm:items-start">
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
                <div className="h-4 w-20 animate-pulse rounded-full bg-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Owned = ({ userAccount, handleOpenModalBid, handleOpenModalBuy, handleOpenModalPutonsale }) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [gridList, setGridList] = useState('grid');
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;
    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbyowner/${userAccount}?query=${search}&page=${nftPage}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${nftPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.nfts.length > 0) {
          setNfts((oldNfts) => [...oldNfts, ...response.data.nfts]);
        } else {
          setNftLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
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
      if (nftLast === false) {
        setNftPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setNftPage(1);
    setNftLast(false);
    if (search === '') {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`);
    getNfts();
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex flex-col gap-2 md:flex-row">
            <div className="flex w-4/12 gap-1">
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
            </div>
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
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
                  defaultValue={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
                    <span className="block truncate text-gray-600 dark:text-white">
                      {selectedFilter}
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
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700 sm:text-sm">
                    {servers.map((server, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none px-4 py-2 ${
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900 dark:text-white'
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
            </form>
            <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionGrid"
                  onChange={(event) => handleGridList(event, 'grid')}
                />
                <label
                  className={classRadio(gridList, 'grid')}
                  htmlFor="optionGrid"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionList"
                  onChange={(event) => handleGridList(event, 'list')}
                />
                <label
                  className={classRadio(gridList, 'list')}
                  htmlFor="optionList"
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          {openFilter && (
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-zinc-700 dark:text-white">
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('blockchain')}
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
            className={`col-span-12 sm:col-span-12 ${
              openFilter
                ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
            }`}
          >
            <div className="grid w-full grid-cols-12 gap-7 text-gray-900">
              {nfts.length == 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
              {nfts.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <NftItemDetailSkeleton
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                    />
                  ))}
                </>
              )}
              {nfts.length > 0 &&
                nfts.map((nft, index) => {
                  const currentDate = moment();
                  console.log(nft.itemDetails);
                  const endDate = moment.unix(nft.itemDetails?.endDate);
                  const releaseDate = moment.unix(nft.itemDetails?.releaseDate);
                  const isNotExpired = endDate.isAfter(currentDate);
                  const isNotRelease = currentDate.isBefore(releaseDate);

                  return (
                    <NftItemDetail
                      key={index}
                      nft={nft}
                      collection={nft.Collection}
                      itemDetails={nft.itemDetails}
                      gridList={gridList}
                      openFilter={openFilter}
                      isNotExpired={isNotExpired}
                      isNotRelease={isNotRelease}
                      handleOpenModalBid={handleOpenModalBid}
                      handleOpenModalBuy={handleOpenModalBuy}
                      handleOpenModalPutonsale={handleOpenModalPutonsale}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Onsale = ({ userAccount }) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [gridList, setGridList] = useState('grid');
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;

    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/market/itemsbyuseraddress/${userAccount}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${nftPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.length > 0) {
          setNfts((oldNfts) => [...oldNfts, ...response.data]);
          setNftLast(true);
        } else {
          setNftLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
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
      if (nftLast === false) {
        setNftPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setNftPage(1);
    setNftLast(false);
    if (search === '') {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`);
    getNfts();
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex flex-col gap-2 md:flex-row">
            <div className="flex w-4/12 gap-1">
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
            </div>
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
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
                  defaultValue={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
                    <span className="block truncate text-gray-600 dark:text-white">
                      {selectedFilter}
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
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700 sm:text-sm">
                    {servers.map((server, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none px-4 py-2 ${
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900 dark:text-white'
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
            </form>
            <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionGrid"
                  onChange={(event) => handleGridList(event, 'grid')}
                />
                <label
                  className={classRadio(gridList, 'grid')}
                  htmlFor="optionGrid"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionList"
                  onChange={(event) => handleGridList(event, 'list')}
                />
                <label
                  className={classRadio(gridList, 'list')}
                  htmlFor="optionList"
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          {openFilter && (
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-zinc-700 dark:text-white">
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('blockchain')}
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
            className={`col-span-12 sm:col-span-12 ${
              openFilter
                ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
            }`}
          >
            <div className="grid w-full grid-cols-12 gap-7 text-gray-900">
              {nfts.length == 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
              {nfts.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <NftItemDetailSkeleton
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                    />
                  ))}
                </>
              )}
              {nfts.length > 0 &&
                nfts.map((nft, index) => {
                  const currentDate = moment();
                  const endDate = moment.unix(nft?.endDate);
                  const releaseDate = moment.unix(nft?.releaseDate);
                  const isNotExpired = endDate.isAfter(currentDate);
                  const isNotRelease = currentDate.isBefore(releaseDate);
                  return (
                    <NftItemDetail
                      key={index}
                      nft={nft.nftDetails}
                      itemDetails={nft}
                      collection={nft.collectionData}
                      gridList={gridList}
                      openFilter={openFilter}
                      isNotExpired={isNotExpired}
                      isNotRelease={isNotRelease}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Sold = ({ userAccount }) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [gridList, setGridList] = useState('grid');
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };
  const [countNfts, setCountNfts] = useState();

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;
    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/market/itemsoldbyuseraddress/${userAccount}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${nftPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.length > 0) {
          setNfts((oldNfts) => [...oldNfts, ...response.data]);
          setNftLast(true);
        } else {
          setNftLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
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
      if (nftLast === false) {
        setNftPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setNftPage(1);
    setNftLast(false);
    if (search === '') {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`);
    getNfts();
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex flex-col gap-2 md:flex-row">
            <div className="flex w-4/12 gap-1">
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
            </div>
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
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
                  defaultValue={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
                    <span className="block truncate text-gray-600 dark:text-white">
                      {selectedFilter}
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
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700 sm:text-sm">
                    {servers.map((server, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none px-4 py-2 ${
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900 dark:text-white'
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
            </form>
            <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionGrid"
                  onChange={(event) => handleGridList(event, 'grid')}
                />
                <label
                  className={classRadio(gridList, 'grid')}
                  htmlFor="optionGrid"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionList"
                  onChange={(event) => handleGridList(event, 'list')}
                />
                <label
                  className={classRadio(gridList, 'list')}
                  htmlFor="optionList"
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          {openFilter && (
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-zinc-700 dark:text-white">
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('blockchain')}
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
            className={`col-span-12 sm:col-span-12 ${
              openFilter
                ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
            }`}
          >
            <div className="grid w-full grid-cols-12 gap-7 text-gray-900">
              {nfts.length == 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
              {nfts.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <NftItemDetailSkeleton
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                    />
                  ))}
                </>
              )}
              {nfts.length > 0 &&
                nfts.map((nft, index) => {
                    const currentDate = moment();
                    const endDate = moment.unix(nft?.endDate);
                    const releaseDate = moment.unix(
                      nft?.releaseDate,
                    );
                    const isNotExpired = endDate.isAfter(currentDate);
                    const isNotRelease = currentDate.isBefore(releaseDate);
                    return (
                      <NftItemDetail
                        key={index}
                        nft={nft.nftDetails}
                        collection={nft.collectionData}
                        itemDetails={nft}
                        gridList={gridList}
                        openFilter={openFilter}
                        isNotExpired={isNotExpired}
                        isNotRelease={isNotRelease}
                      />
                    );
                })}
              {nfts.length > 0 && countNfts > 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Liked = ({ userAccount, handleOpenModalBuy, handleOpenModalBid, handleOpenModalPutonsale }) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [gridList, setGridList] = useState('grid');
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };

  const classRadio = (params, value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (params === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;
    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getlikes/${userAccount}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${nftPage}`,
      })
      .then((response) => {
        setIsLoading(false);
        if (response.data.likes.length > 0) {
          setNfts((oldNfts) => [...oldNfts, ...response.data.likes]);
          setNftLast(true);
        } else {
          setNftLast(true);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
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
      if (nftLast === false) {
        setNftPage((oldPage) => oldPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setNftPage(1);
    setNftLast(false);
    if (search === '') {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`);
    getNfts();
  };

  return (
    <>
      <section>
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 flex flex-col gap-2 md:flex-row">
            <div className="flex w-4/12 gap-1">
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
            </div>
            <form
              onSubmit={(event) => handleSearch(event)}
              className="flex w-full gap-4"
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
                  defaultValue={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox
                value={selectedFilter}
                onChange={setSelectedFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
                    <span className="block truncate text-gray-600 dark:text-white">
                      {selectedFilter}
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
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-700 sm:text-sm">
                    {servers.map((server, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none px-4 py-2 ${
                            active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900 dark:text-white'
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
            </form>
            <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionGrid"
                  onChange={(event) => handleGridList(event, 'grid')}
                />
                <label
                  className={classRadio(gridList, 'grid')}
                  htmlFor="optionGrid"
                >
                  <FontAwesomeIcon icon={faGrip} />
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  type="radio"
                  name="rangeOptions"
                  id="optionList"
                  onChange={(event) => handleGridList(event, 'list')}
                />
                <label
                  className={classRadio(gridList, 'list')}
                  htmlFor="optionList"
                >
                  <FontAwesomeIcon icon={faGripVertical} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 grid grid-cols-12 gap-6">
          {openFilter && (
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-zinc-700 dark:text-white">
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('blockchain')}
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
            className={`col-span-12 sm:col-span-12 ${
              openFilter
                ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
            }`}
          >
            <div className="grid w-full grid-cols-12 gap-7 text-gray-900">
              {nfts.length == 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
              {nfts.length == 0 && isLoading && (
                <>
                  {[...Array(12)].map((nft, index) => (
                    <NftItemDetailSkeleton
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                    />
                  ))}
                </>
              )}
              {nfts.length > 0 &&
                nfts.map((nft, index) => {
                  const currentDate = moment();
                  const endDate = moment.unix(nft?.endDate);
                  const releaseDate = moment.unix(nft?.releaseDate);
                  const isNotExpired = endDate.isAfter(currentDate);
                  const isNotRelease = currentDate.isBefore(releaseDate);

                  return (
                    <NftItemDetail
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                      nft={nft.nftDetails}
                      collection={nft.collectionData}
                      itemDetails={nft}
                      handleOpenModalBuy={handleOpenModalBuy}
                      handleOpenModalBid={handleOpenModalBid}
                      handleOpenModalPutonsale={handleOpenModalPutonsale}
                      isNotExpired={isNotExpired}
                      isNotRelease={isNotRelease}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
