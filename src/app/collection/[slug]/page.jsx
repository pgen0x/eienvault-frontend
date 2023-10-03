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
import { formatEther, isAddress } from 'viem';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { ImageWithFallback } from '@/components/imagewithfallback';
import moment from 'moment';
import ModalBid from '@/components/modal/bid';
import ModalBuy from '@/components/modal/buy';
import HelaIcon from '@/assets/icon/hela';
import { useAccount, useNetwork } from 'wagmi';
import ModalPutOnSale from '@/components/modal/putOnSale';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import {
  NftItemDetail,
  NftItemDetailSkeleton,
} from '@/components/nft/itemDetail';
import ModaluploadCover from '@/components/modal/uploadCover';
import ModalUpdateCollection from '@/components/modal/updateCollections';

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
  const { chain } = useNetwork();
  const [collection, setCollection] = useState({});
  const [profile, setProfile] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [collectionChain, setCollectionChain] = useState({});
  const [activeTab, setActiveTab] = useState('items');
  const [IsOpenModalCover, setIsOpenModalCover] = useState(false);
  const { address, isConnected } = useAccount();

  const [isUpdateCollection, setIsUpdateCollection] = useState(false);
  const [chains, setChains] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain?.id || 666888,
    symbol: chain?.nativeCurrency.symbol || 'HLUSD',
  });

  const [bannerImage, setBannerImage] = useState(
    'https://placehold.co/1920x266.png',
  );
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
  }, [collection.tokenAddress, collection.chainId, collection.userAddress]);

  const getCollection = async () => {
    const address = isAddress(params.slug);

    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/${
          address ? 'getbycollection' : 'get'
        }/${params.slug}`,
      })
      .then((response) => {
        setCollection(response.data);
        if (response.data.bannerImage !== null) {
          setBannerImage(
            `/uploads/collections/banner/${response.data.bannerImage}`,
          );
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const getProfile = async (userAddress) => {
    await axios
      .request({
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

  const getChain = async (chainId) => {
    await axios
      .request({
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
  };

  const renderActiveTab = () => {
    const listTabs = {
      items: <Items params={params} collection={collection} />,
      activity: <Activity />,
    };

    return listTabs[activeTab];
  };

  const editBanner = () => {
    setIsOpenModalCover(true);
  };

  const closeModalCover = () => {
    setIsOpenModalCover(false);
  };

  const handleModalUpdate = () => {
    if (!token) {
      open();
    } else {
      setIsUpdateCollection(true);
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
  }, [isUpdateCollection]);

  const closeModalUpdateCollection = () => {
    setIsUpdateCollection(false);
  };

  const handleStepUpdate = (Create) => {
    setStepUpdate(Create);
  };

  const updateBannerImage = (newImageURL) => {
    setBannerImage(newImageURL);
  };

  return (
    <>
      <section>
        <div className="group relative w-full">
          <Image
            src={bannerImage}
            alt={collection.name ? collection.name : ''}
            width={1920}
            height={266}
            objectFit="cover"
            className="h-[266px] object-cover"
          />

          {address === collection.userAddress && (
            <button
              onClick={editBanner}
              className="absolute right-0 top-0 m-4 rounded-full bg-primary-500 px-4 py-2 opacity-0 hover:bg-primary-300 group-hover:opacity-100"
            >
              <FontAwesomeIcon className="mr-2" icon={faPenToSquare} />
              Edit Cover
            </button>
          )}
        </div>
      </section>
      <div className="container m-auto p-3">
        {Object.keys(collection).length > 0 ? (
          <section>
            <div className="mt-5 flex justify-between">
              <div className="flex w-full flex-col">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 flex flex-col gap-3 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                    <div className="relative -mt-[5rem]">
                      <ImageWithFallback
                        src={`/uploads/collections/${collection.logo}`}
                        alt={collection?.name}
                        width={100}
                        height={100}
                        diameter={100}
                        address={collection?.tokenAddress}
                        className="w-36 rounded-full border-4 border-white shadow"
                      />
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                      <button
                        onClick={() =>
                          router.push(
                            `/profile/${collection.User?.walletAddress}`,
                          )
                        }
                      >
                        {collection.name
                          ? collection.name
                          : collection?.tokenAddress
                          ? truncateAddress(collection.tokenAddress)
                          : ''}
                      </button>
                    </div>
                    <div className="flex w-full justify-start gap-4 text-gray-900 dark:text-white">
                      <div>
                        Created by{' '}
                        <button
                          className="font-bold"
                          onClick={() =>
                            router.push(
                              `/profile/${collection.User?.walletAddress}`,
                            )
                          }
                        >
                          {collection.User?.username ||
                            truncateAddress(collection.User?.walletAddress)}
                        </button>
                      </div>
                      <div>
                        Address{' '}
                        <span className="font-bold">
                          {truncateAddress(collection.tokenAddress)}
                        </span>
                      </div>
                    </div>
                    {collection.description ? (
                      <div>
                        <p
                          className={`block text-ellipsis text-black dark:text-white ${
                            showDescription
                              ? ''
                              : 'overflow-hidden whitespace-nowrap'
                          }`}
                        >
                          {collection.description ? collection.description : ''}
                        </p>
                        <button
                          onClick={() => setShowDescription(!showDescription)}
                          className="text-left text-gray-900 dark:text-white"
                        >
                          See {showDescription ? 'less' : 'more'}{' '}
                          <FontAwesomeIcon
                            icon={showDescription ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p
                          className={`block text-ellipsis text-black dark:text-white ${
                            showDescription
                              ? ''
                              : 'overflow-hidden whitespace-nowrap'
                          }`}
                        >
                          {`Welcome to our ${collection.name} collection! Explore a world of digital art and assets that represent unique and exclusive tokens on the blockchain. You'll find something special in our collection. Each NFT is a one-of-a-kind piece, verified and secured on the blockchain, making it a valuable addition to your digital asset portfolio. Join us on this journey of innovation and creativity in the world of non-fungible tokens. Start collecting, trading, and owning a piece of the digital future with our NFTs!`}
                        </p>
                        <button
                          onClick={() => setShowDescription(!showDescription)}
                          className="text-left text-gray-900 dark:text-white"
                        >
                          See {showDescription ? 'less' : 'more'}{' '}
                          <FontAwesomeIcon
                            icon={showDescription ? faChevronUp : faChevronDown}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="col-span-12 flex h-fit justify-end sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                    <div className="flex w-96 flex-col gap-2 rounded-lg border-2 border-gray-200 bg-white p-5 text-sm text-gray-900 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white">
                      <div className="flex justify-between">
                        <span className="font-semibold">Floor</span>
                        <span>
                          {collection.floorPrice
                            ? formatEther(Number(collection.floorPrice))
                            : '0.00'}{' '}
                          {collectionChain.symbol
                            ? collectionChain.symbol
                            : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Volumes</span>
                        <span>
                          {collection.volume
                            ? formatEther(Number(collection.volume))
                            : '0.00'}{' '}
                          {collectionChain.symbol
                            ? collectionChain.symbol
                            : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Items</span>
                        <span>{collection.totalItems || 0}</span>
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 dark:border-zinc-500">
                        <span className="font-semibold">Owner</span>
                        <span>{collection.totalOwners || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Blockchain</span>
                        <span>
                          {collectionChain.name ? collectionChain.name : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 flex gap-1 font-semibold text-white">
                    {address === collection.userAddress && (
                      <button className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300" onClick={() => handleModalUpdate()}>
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit Collection
                      </button>
                    )}

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
        ) : (
          <section>
            <div className="mt-5 flex justify-between">
              <div className="flex w-full flex-col">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 flex flex-col gap-3 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                    <div className="relative -mt-[5rem]">
                      <div className="h-[100px] w-[100px] rounded-full border-4 border-white bg-gray-300 shadow" />
                    </div>
                    <div className="h-6 w-64 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white"></div>
                    <div className="flex w-full justify-start gap-4 text-gray-900 dark:text-white">
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-96 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-80 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-96 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-64 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 flex h-fit justify-end sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                    <div className="flex w-96 flex-col gap-3 rounded-lg border-2 border-gray-200 bg-white p-5 text-sm text-gray-900 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white">
                      <div className="flex justify-between">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                      <div className="flex justify-between border-b-2 pb-2 dark:border-zinc-500">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-40 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                      <div className="flex justify-between">
                        <div className="h-4 w-20 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                        <div className="h-4 w-32 animate-pulse rounded-lg bg-gray-300 text-xl font-semibold dark:text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <ul className="my-5 flex border-b border-gray-200 text-primary-500">
            <li
              className={`cursor-pointer px-5 pb-3 ${
                activeTab == 'items' ? 'border-b-4 border-primary-500' : ''
              }`}
              onClick={() => setActiveTab('items')}
            >
              Items
            </li>
            <li
              className={`cursor-pointer px-5 pb-3 ${
                activeTab == 'activity' ? 'border-b-4 border-primary-500' : ''
              }`}
              onClick={() => setActiveTab('activity')}
            >
              Activity
            </li>
          </ul>
        </section>
        {renderActiveTab()}
      </div>
      <ModaluploadCover
        isOpenModal={IsOpenModalCover}
        onModalClose={closeModalCover}
        address={collection?.tokenAddress}
        collection={collection}
        setCollection={setCollection}
        updateBannerImage={updateBannerImage}
      />
      <ModalUpdateCollection
        collectionAddress={collection?.tokenAddress}
        chains={chains}
        isOpenModal={isUpdateCollection}
        selectedChain={selectedBlockchain}
        setSelectedChain={setSelectedBlockchain}
        onClose={closeModalUpdateCollection}
        onModalClose={closeModalUpdateCollection}
        collection={collection}
        setCollection={setCollection}
      />
      <Footer />
    </>
  );
}

const Items = ({ params, collection }) => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const { chain } = useNetwork();
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
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  };
  const { address } = useAccount();

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
    const address = isAddress(params.slug);
    setIsLoading(true);

    if (nftLast === true) return;
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/${
          address ? 'getbycollection' : 'getbyslug'
        }/${params.slug}?query=${search}&page=${nftPage}`,
      })
      .then((response) => {
        setIsLoading(false);
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
        setIsLoading(false);
        if (error.response.status == 404) {
          if (nftPage > 1) {
            setNftLast(true);
          } else {
            setNfts([]);
          }
        } else {
          toast.error(error.message);
        }
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
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-500 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
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
                              : 'text-gray-900 dark:text-white '
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
            <div className="hidden items-center space-x-1 rounded-full border border-gray-200 bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 sm:hidden md:flex lg:flex xl:flex 2xl:flex">
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
                  const endDate = moment.unix(nft.itemDetails?.endDate);
                  const releaseDate = moment.unix(nft.itemDetails?.releaseDate);
                  const isNotExpired = endDate.isAfter(currentDate);
                  const isNotRelease = currentDate.isBefore(releaseDate);
                  return (
                    <NftItemDetail
                      key={index}
                      nft={nft}
                      collection={collection}
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
    </>
  );
};

const Activity = () => {
  return <h1 className="text-center text-black">Activity Section</h1>;
};
