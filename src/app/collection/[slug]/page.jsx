'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Footer from '@/components/footer/main';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faChevronDown,
  faChevronUp,
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
import Search from '@/components/navbar/search';
import Ethereum from '@/assets/icon/ethereum';
import { filter } from '@metamask/jazzicon/colors';
import { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useAuth } from '@/hooks/AuthContext';
import axios from 'axios';
import { truncateAddress } from '@/utils/truncateAddress';
import { formatEther } from 'viem';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { ImageWithFallback } from '@/components/imagewithfallback';

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

const collections = [
  'Zombie drunk',
  'Shadow fiend',
  'Creepy NFT',
  'Pandamonium',
  'Robotofield',
  'Black dragon',
  'Cute ninja',
  'Kokoakoci',
  'Pyrameed',
];

export default function CollectionDetail({ params }) {
  const router = useRouter();
  const { token } = useAuth();
  const [collection, setCollection] = useState({});
  const [profile, setProfile] = useState({});
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const [search, setSearch] = useState(filterQuery.get('search') === null ? "" : filterQuery.get('search'));
  const [showDescription, setShowDescription] = useState(false);
  const [collectionChain, setCollectionChain] = useState({});
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [filterCollapse, setFilterCollapse] = useState({
    blockchain: false,
    category: false,
    price: false,
    status: false,
    currency: false,
    collection: false,
  });
  const [openFilter, setOpenFilter] = useState(true);
  const inputRef = useRef(null);
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
    getCollection();
  }, []);

  useEffect(() => {
    if (collection.chainId) {
      getChain(collection.chainId);
    }
    if (collection.userAddress) {
      getProfile(collection.userAddress);
    }
  }, [collection.tokenAddress, collection.chainId, collection.userAddress])

  const getCollection = async (collectionToken = false) => {
    let targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/collection/get/${params.slug}`;
    if (collectionToken) {
      targetUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/collection/getbycollection/${params.slug}`
    }
    await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: targetUrl,
    })
      .then((response) => {
        setCollection(response.data);
      })
      .catch((error) => {
        if (collectionToken) {
          toast.error(error.message);
        } else {
          getCollection(true);
        }
      });
  };

  const getProfile = async (userAddress) => {
    await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/user/get/${userAddress}`,
    })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;

    if (search === "") {
      await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbycollection/${params.slug}?page=${nftPage}`,
        // url: `http://192.168.1.8/labs/dummy-data/collections.php?page=${nftPage}`,
      })
        .then((response) => {
          if (response.data.nfts.length > 0) {
            setNfts((oldNfts) => [...oldNfts, ...response.data.nfts]);
          } else {
            setNftLast(true);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else {
      await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbycollection/${params.slug}?query=${search}&page=${nftPage}`,
      })
        .then((response) => {
          if (response.data.nfts.length > 0) {
            if (nftPage > 1) {
              setNfts((oldNft) => [...oldNft, ...response.data.nfts]);
            } else {
              setNfts([...response.data.nfts]);
            }
          } else {
            setNftLast(true);
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            if (nftPage > 1) {
              setNftLast(true);
            } else {
              setNfts([])
            }
          } else {
            toast.error(error.message);
          }
        });
    }
  };

  const getChain = async (chainId) => {
    await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/chain/get/${chainId}`,
    })
      .then((response) => {
        setCollectionChain(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });

  }

  const handleScroll = () => {
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if ((windowBottom >= docHeight)) {
      if (nftLast === false) {
        setNftPage((oldPage) => oldPage + 1);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    setNftPage(1);
    setNftLast(false);
    if (search === "") {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`)
    getNfts();
  }

  return (
    <>
      <section>
        <div className="w-full">
          <Image
            src={collection.banner ? `/uploads/collections/${collection.banner}` : 'https://placehold.co/1920x266.png'}
            alt={collection.name ? collection.name : ''}
            width={1920}
            height={266}
            objectFit="cover"
            className="h-[266px] object-cover"
          />
        </div>
      </section>
      <div className="container m-auto p-3">
        <section>
          <div className="mt-5 flex justify-between">
            <div className="flex w-full flex-col">
              <div className="grid grid-cols-12 gap-4">
                <div className="flex flex-col gap-3 col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="relative -mt-[5rem]">
                    <Image
                      className="w-36 rounded-lg border-4 border-white shadow"
                      src={collection.logo ? `/uploads/collections/${collection.logo}` : 'https://placehold.co/100x100.png'}
                      alt={collection.name ? collection.name : ''}
                      width={100}
                      height={100}
                      objectFit="cover"
                    />
                  </div>
                  <div className="text-xl font-semibold text-gray-900">
                    {collection.name ? collection.name : ''}
                  </div>
                  <div className="block flex w-full justify-start gap-4 text-gray-900">
                    <div>
                      Created by{' '}
                      <span className="font-semibold">
                        {profile.username
                          ? profile.username
                          : collection.userAddress
                            ? truncateAddress(collection.userAddress)
                            : ''}
                      </span>
                    </div>
                    <div>
                      Address{' '}
                      <span className="font-semibold">
                        {profile.walletAddress
                          ? truncateAddress(profile.walletAddress)
                          : ''}
                      </span>
                    </div>
                  </div>
                  {collection.description && (
                    <div>
                      <p className={`text-black text-ellipsis block ${showDescription ? '' : 'overflow-hidden whitespace-nowrap'}`}>{collection.description ? collection.description : ''}</p>
                      <button onClick={() => setShowDescription(!showDescription)} className="text-gray-900 text-left">See {showDescription ? 'less' : 'more'} <FontAwesomeIcon icon={showDescription ? faChevronUp : faChevronDown} /></button>
                    </div>
                  )}
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex justify-end h-fit">
                  <div className="flex w-96 flex-col gap-2 rounded-lg border-2 border-gray-200 bg-white p-5 text-sm text-gray-900">
                    <div className="flex justify-between">
                      <span className="font-semibold">Floor</span>
                      <span>{collection.floorPrice ? formatEther(Number(collection.floorPrice)) : '0.00'} {collectionChain.symbol ? collectionChain.symbol : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Volumes</span>
                      <span>{collection.volume ? collection.volume : '0.00'} {collectionChain.symbol ? collectionChain.symbol : '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Items</span>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between border-b-2 pb-2">
                      <span className="font-semibold">Owner</span>
                      <span>0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Blockchain</span>
                      <span>{collectionChain.symbol ? collectionChain.symbol : '-'}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 flex gap-1 font-semibold text-white">
                  <button className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300">
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit Collection
                  </button>
                  <button className="h-[40px] w-[40px] rounded-full bg-primary-500 hover:bg-primary-300">
                    <FontAwesomeIcon icon={faShare} />
                  </button>
                  <button className="h-[40px] w-[40px] rounded-full bg-primary-500 hover:bg-primary-300">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ul className="my-5 flex border-b border-gray-200 text-primary-500">
            <li className="cursor-pointer border-b-4 border-primary-500 px-5 pb-3">
              Items
            </li>
            <li className="cursor-pointer px-5 pb-3">Activity</li>
          </ul>
        </section>
        <section>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col md:flex-row gap-2">
              <div className="w-4/12 flex gap-1">
                <div className="w-fit">
                  <button className={`flex items-center gap-1 rounded-full px-4 py-2 hover:bg-primary-300 ${openFilter ? 'bg-primary-500' : 'bg-white text-primary-500'}`} onClick={handleOpenFilter}>
                    <FontAwesomeIcon icon={faSliders} /> <span>Filter</span>
                  </button>
                </div>
              </div>
              <form onSubmit={(event) => handleSearch(event)} className="w-full flex gap-4">
                <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border border-0 border-gray-200 bg-white px-4 dark:bg-gray-800">
                  <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                    <FontAwesomeIcon icon={faSearch} />
                  </div>
                  <input
                    className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    type="text"
                    placeholder="Search ..."
                    aria-label="Search"
                    defaultValue={search}
                    onChange={(event) => setSearch(event.target.value)} />
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
                            `relative cursor-default select-none px-4 py-2 ${active
                              ? 'bg-primary-500 text-white'
                              : 'text-gray-900'
                            }`
                          }
                          value={server}
                        >
                          {({ selectedServer }) => (
                            <>
                              <span
                                className={`block truncate ${selectedServer ? 'font-medium' : 'font-normal'
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
              <div className="space-x-1 rounded-full border border-gray-200 bg-white px-1 py-1 hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex">
                <div>
                  <input className="hidden" type="radio" name="rangeOptions" id="optionGrid" onChange={(event) => handleGridList(event, 'grid')} />
                  <label className={classRadio(gridList, 'grid')} htmlFor="optionGrid">
                    <FontAwesomeIcon icon={faGrip} />
                  </label>
                </div>
                <div>
                  <input className="hidden" type="radio" name="rangeOptions" id="optionList" onChange={(event) => handleGridList(event, 'list')} />
                  <label className={classRadio(gridList, 'list')} htmlFor="optionList">
                    <FontAwesomeIcon icon={faGripVertical} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="my-5 grid grid-cols-12 gap-6">
            {openFilter && (
              <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900">
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('blockchain')}
                    >
                      <span>Blockchain</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`target py-5 ${filterCollapse.blockchain ? 'block' : 'hidden'
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
              className={`col-span-12 sm:col-span-12 ${openFilter
                ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9'
                : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'
                }`}
            >
              <div className="grid w-full grid-cols-12 gap-7 text-gray-900">
                {nfts.length == 0 && <div className="w-full col-span-12 text-black text-center font-semibold">NFT not found</div>}
                {nfts.length > 0 && nfts.map((nft, index) => (
                  <div key={index} className={`group col-span-12 h-[542px] sm:h-[542px] md:h-[542px] lg:h-[542px] xl:h-[542px] 2xl:h-[542px] w-full sm:col-span-6 ${gridList === 'grid'
                    ? (openFilter ? 'md:col-span-4 xl:col-span-4 2xl:col-span-4' : 'md:col-span-6 xl:col-span-3 2xl:col-span-3')
                    : (openFilter ? 'md:col-span-6 xl:col-span-2 2xl:col-span-3' : 'md:col-span-4 xl:col-span-2 2xl:col-span-2')
                    }`}>
                    <div className="w-full group h-[542px]">
                      <Image
                        className="w-full rounded-2xl z-10 group-hover:h-[250px] h-[290px] group-hover:transition-all ease-in-out duration-300 object-cover"
                        width={600}
                        height={600}
                        placeholder="blur"
                        blurDataURL={`https://via.placeholder.com/600x600`}
                        src={nft?.imageUri}
                      />
                      <div className="w-full px-3 inline-flex flex-col items-center justify-center lg:items-start">
                        <div className="relative w-full flex flex-row">
                          <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white bg-opacity-50 p-3  backdrop-blur-xl">
                            <div className="w-full flex flex-col items-start justify-start">
                              <div
                                className="inline-flex items-center justify-between self-stretch cursor-pointer"
                                onClick={() =>
                                  router.push(
                                    `/collection/${nft.collectionAddress}`,
                                  )
                                }
                              >
                                <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2">
                                  <ImageWithFallback
                                    className="h-full w-full rounded-2xl "
                                    width={16}
                                    height={16}
                                    alt={
                                      nft.Collection?.name
                                        ? nft.Collection?.name
                                        : nft.collectionAddress
                                          ? nft.collectionAddress
                                          : ''
                                    }
                                    diameter={16}
                                    address={nft?.collectionAddress}
                                    src={`/uploads/collections/${nft.Collection?.logo}`}
                                  />
                                  <div className="flex items-start justify-start gap-2">
                                    <div className="text-xs font-medium leading-none text-neutral-700">
                                      {collection?.name
                                        ? collection.name
                                        : collection?.tokenAddress
                                          ? truncateAddress(collection.tokenAddress)
                                          : ''}
                                    </div>
                                    <div className="text-xs font-black leading-none text-primary-500">
                                      <FontAwesomeIcon icon={faCircleCheck} />
                                    </div>
                                  </div>
                                </div>
                                <div className="items-center">
                                  <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                              </div>
                              <div className="w-full inline-flex items-center justify-between gap-2 pt-1">
                                <div className="font-medium leading-tight text-gray-600 leading-[20px] h-[40px] line-clamp-2" title={`${nft?.name} #${nft?.tokenId}`}>
                                  {nft?.name} #{nft?.tokenId}
                                </div>
                                <div className="text-sm font-normal leading-tight text-neutral-700">
                                  <Ethereum className="h-4 w-4" />
                                </div>
                              </div>
                              <div className="flex justify-between w-full mt-5 px-2 py-2 bg-white rounded-md">
                                <div className="flex flex-col items-start truncate text-sm leading-5">
                                  <p>Price</p>
                                  <p className="font-bold">
                                    {nft.price === null ? "0.00" : formatEther(Number(nft?.price))}{' '}
                                    {nft.Collection?.Chain.symbol}
                                  </p>
                                </div>
                                <div className="flex flex-col items-start truncate text-sm leading-5">
                                  <p>Highest bid</p>
                                  <p className="font-bold">No bids yet</p>
                                </div>
                              </div>
                              <div className="flex mt-5 gap-2 w-full items-center">
                                <FontAwesomeIcon className="w-5 h-5 p-3 rounded-full text-primary-500 cursor-pointer hover:bg-primary-50 " icon={faCartPlus} />
                                <button className="w-full text-center text-base font-bold text-white bg-primary-500 rounded-full px-4 py-2 hover:bg-primary-300 text-xs">
                                  Buy Now
                                </button>
                              </div>
                              <button onClick={() => router.push(`/nft/${nft.collectionAddress}/${nft.tokenId}`)} className="bg-white hover:bg-primary-50 text-primary-500 mt-2 w-full py-0 text-center group-hover:py-2 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 rounded-full group-hover:transition-all ease-in-out duration-800">View Detail</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
