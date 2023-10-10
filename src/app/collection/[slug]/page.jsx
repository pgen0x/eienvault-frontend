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
import Search from '@/components/navbar/search';
import Ethereum from '@/assets/icon/ethereum';
import { useEffect } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { useAuth } from '@/hooks/AuthContext';
import axios from 'axios';
import { truncateAddress } from '@/utils/truncateAddress';
import { formatEther, getAddress, isAddress } from 'viem';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { ImageWithFallback } from '@/components/imagewithfallback';
import moment from 'moment';
import ModalBid from '@/components/modal/bid';
import ModalBuy from '@/components/modal/buy';
import HelaIcon from '@/assets/icon/hela';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';
import ModalPutOnSale from '@/components/modal/putOnSale';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import {
  NftItemDetail,
  NftItemDetailSkeleton,
} from '@/components/nft/itemDetail';
import ModaluploadCover from '@/components/modal/uploadCover';
import ModalUpdateCollection from '@/components/modal/updateCollections';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { JazzIcon } from '@/components/jazzicon';
import {
  ActivityItemDetail,
  ActivityItemDetailSkeleton,
} from '@/components/activity/itemDetail';

const filters = [
  'All',
  'Price low to high',
  'Price high to low',
  'Most favorited',
  'Ending soon',
];

export default function CollectionDetail({ params }) {
  const router = useRouter();
  const { token } = useAuth();
  const { chain } = useNetwork();
  const [collection, setCollection] = useState({});
  const [profile, setProfile] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [activeTab, setActiveTab] = useState('activity');
  const [IsOpenModalCover, setIsOpenModalCover] = useState(false);
  const { address, isConnected } = useAccount();
  const [bannerImage, setBannerImage] = useState(
    'https://placehold.co/1920x266.png',
  );

  const [isUpdateCollection, setIsUpdateCollection] = useState(false);
  const [chains, setChains] = useState([]);
  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain?.id || 666888,
    symbol: chain?.nativeCurrency.symbol || 'HLUSD',
  });

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    if (collection.userAddress) {
      getProfile(collection.userAddress);
    }
  }, [collection.tokenAddress, collection.chainId, collection.userAddress]);

  const getCollection = async () => {
    let url;
    if (isAddress(params.slug)) {
      url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/collection/getbycollection/${getAddress(params.slug)}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/collection/get/${params.slug}`;
    }
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
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

  const renderActiveTab = () => {
    const listTabs = {
      items: <Items params={params} collection={collection} />,
      activity: <Activity collection={collection} />,
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

          {collection.userAddress !== undefined &&
            address === collection.userAddress && (
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
                          {collection.Chain.symbol
                            ? collection.Chain.symbol
                            : '-'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Volumes</span>
                        <span>
                          {collection.volume
                            ? formatEther(Number(collection.volume))
                            : '0.00'}{' '}
                          {collection.Chain.symbol
                            ? collection.Chain.symbol
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
                          {collection.Chain.name ? collection.Chain.name : '-'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 flex gap-1 font-semibold text-white">
                    {address === collection.userAddress && (
                      <button
                        className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300"
                        onClick={() => handleModalUpdate()}
                      >
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
  const { address } = useAccount();
  const [sortFilter, setSortFilter] = useState(filters[0]);
  const [nfts, setNfts] = useState([]);
  const [sortedNFTs, setSortedNFTs] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const filterQuery = useSearchParams();
  const { chain } = useNetwork();
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [filterCollapse, setFilterCollapse] = useState({
    status: false,
    price: false,
    properties: false,
  });
  const [filterProperties, setFilterProperties] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [gridList, setGridList] = useState('grid');
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState(null);
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [priceFilter, setPriceFilter] = useState({ start: '', end: '' });
  const [dataProperties, setDataProperties] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const { data: walletClient } = useWalletClient();

  const handleApplyPriceFilter = (start, end) => {
    setPriceFilter({ start, end });
  };

  const handleFilterCollapse = async (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });

    if (filter === 'properties' && !filterCollapse.properties) {
      const getProper = await getProperties(collection.tokenAddress);
    }
  };

  const handleOpenProperties = async (filter) => {
    setFilterProperties({
      ...filterProperties,
      [filter]: !filterProperties[filter],
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

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;
    let url;
    if (isAddress(params.slug)) {
      url = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/nfts/getbycollection/${getAddress(params.slug)}?page=${nftPage}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbyslug/${params.slug}?page=${nftPage}`;
    }
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: url,
      })
      .then((response) => {
        if (response.data.nfts.length > 0) {
          if (nftPage >= response.data.totalPages) {
            setNftLast(true); // Set nftLast to true if the current page is the last page
          }

          if (nftPage > 1) {
            setNfts((oldNft) => [...oldNft, ...response.data.nfts]);
          } else {
            setNfts([...response.data.nfts]);
          }
        } else {
          setNftLast(true);
        }
        setIsLoading(false);
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

  const getProperties = async (collectionAddress) => {
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getproperties/${collectionAddress}`,
      })
      .then((response) => {
        if (response.data.length > 0) {
          setDataProperties(response.data);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCheckboxChange = (e, traitType) => {
    const { value, checked } = e.target;

    setSelectedValues((prevSelectedValues) => {
      // Find the object with the same key in the existing selectedValues
      const existingObjectIndex = prevSelectedValues.findIndex(
        (selectedValue) => selectedValue.key === traitType,
      );

      if (existingObjectIndex !== -1) {
        // If an object with the same key exists, update its value array
        if (checked) {
          return prevSelectedValues.map((selectedValue, index) => {
            if (index === existingObjectIndex) {
              return {
                key: selectedValue.key,
                value: [...selectedValue.value, value],
              };
            }
            return selectedValue;
          });
        } else {
          // If unchecked, remove the value from the existing value array
          const updatedSelectedValues = prevSelectedValues.map(
            (selectedValue, index) => {
              if (index === existingObjectIndex) {
                return {
                  key: selectedValue.key,
                  value: selectedValue.value.filter((v) => v !== value),
                };
              }
              return selectedValue;
            },
          );

          // Filter out objects with empty value arrays
          return updatedSelectedValues.filter(
            (selectedValue) => selectedValue.value.length > 0,
          );
        }
      } else {
        // If no object with the same key exists, add a new object
        if (checked) {
          return [
            ...prevSelectedValues,
            {
              key: traitType,
              value: [value],
            },
          ];
        }
      }

      return prevSelectedValues;
    });
  };

  const sortNfts = () => {
    if (sortFilter === 'All') {
      return nfts;
    } else if (sortFilter === 'Price low to high') {
      const nftsWithItemDetails = nfts.filter((nft) => {
        return nft.itemDetails !== undefined && nft.itemDetails !== null;
      });
      if (nftsWithItemDetails.length === 0) {
        return []; // No data matches the filter
      }
      // Sort the NFTs by price low to high
      const sortedNfts = [...nftsWithItemDetails].sort((a, b) => {
        // Convert price from wei to integer
        const priceA = formatEther(Number(a.itemDetails?.price)) || 0;
        const priceB = formatEther(Number(b.itemDetails?.price)) || 0;
        return priceA - priceB; // Sort low to high
      });
      return sortedNfts;
    } else if (sortFilter === 'Price high to low') {
      const nftsWithItemDetails = nfts.filter((nft) => {
        return nft.itemDetails !== undefined && nft.itemDetails !== null;
      });
      if (nftsWithItemDetails.length === 0) {
        return []; // No data matches the filter
      }
      const sortedNfts = [...nftsWithItemDetails].sort((a, b) => {
        // Convert price from wei to integer
        const priceA = formatEther(Number(a.itemDetails?.price)) || 0;
        const priceB = formatEther(Number(b.itemDetails?.price)) || 0;
        return priceB - priceA; // Sort high to low
      });
      return sortedNfts;
    } else if (sortFilter === 'Ending soon') {
      // Filter to display NFTs ending soon (based on end date)
      const endingSoonNFTs = nfts.filter((nft) => {
        const endDate = Number(nft.itemDetails?.endDate);

        // Only include NFTs with a valid endDate
        return endDate !== undefined && !isNaN(endDate);
      });
      if (endingSoonNFTs.length === 0) {
        return []; // No data matches the filter
      }

      // Sort the ending soon NFTs by end date (ascending order)
      const sortedNfts = [...endingSoonNFTs].sort((a, b) => {
        const endDateA = Number(a.itemDetails?.endDate) || 0;
        const endDateB = Number(b.itemDetails?.endDate) || 0;
        return endDateA - endDateB;
      });

      return sortedNfts;
    } else if (sortFilter === 'Most favorited') {
      // Filter to display NFTs with valid likeCount
      const favoritedNFTs = nfts.filter((nft) => {
        const likeCount = nft.likeCount;

        // Only include NFTs with a valid likeCount
        return likeCount !== undefined && likeCount !== null;
      });

      if (favoritedNFTs.length === 0) {
        return []; // No data matches the filter
      }

      // Sort the favorited NFTs by likeCount (descending order)
      const sortedNfts = [...favoritedNFTs].sort((a, b) => {
        const likeCountA = Number(a.likeCount) || 0;
        const likeCountB = Number(b.likeCount) || 0;
        return likeCountB - likeCountA; // Sort by most favorited
      });

      return sortedNfts;
    } else {
      return nfts;
    }
  };

  useEffect(() => {
    if (nfts.length > 0) {
      const sortedNfts = sortNfts();
      setSortedNFTs(sortedNfts);
    }
  }, [sortFilter, nfts]);

  const filterNFTStatus = () => {
    if (filterStatus === null) {
      return nfts;
    } else if (filterStatus === 'onauction') {
      const nftsWithItemDetails = nfts.filter((nft) => {
        return (
          nft.itemDetails !== undefined &&
          nft.itemDetails !== null &&
          nft.itemDetails.isAuctioned === true
        );
      });
      if (nftsWithItemDetails.length === 0) {
        return []; // No data matches the filter
      }

      return nftsWithItemDetails;
    } else if (filterStatus === 'listed') {
      const nftsWithItemDetails = nfts.filter((nft) => {
        return (
          nft.itemDetails !== undefined &&
          nft.itemDetails !== null &&
          nft.itemDetails.isAuctioned === false
        );
      });
      if (nftsWithItemDetails.length === 0) {
        return []; // No data matches the filter
      }

      return nftsWithItemDetails;
    } else if (filterStatus === 'notforsale') {
      const nftsWithoutItemDetails = nfts.filter((nft) => {
        return nft.itemDetails === undefined || nft.itemDetails === null;
      });
      if (nftsWithoutItemDetails.length === 0) {
        return []; // No data matches the filter
      }

      return nftsWithoutItemDetails;
    }
  };

  useEffect(() => {
    if (nfts.length > 0) {
      const filteredNFTs = filterNFTStatus();
      setSortedNFTs(filteredNFTs);
    }
  }, [filterStatus, nfts]);

  console.log(filterStatus, 'filterStatus');

  const priceFilterNFTs = () => {
    if (priceFilter.start !== '' || priceFilter.end !== '') {
      const filteredNFTs = nfts.filter((nft) => {
        const price = formatEther(Number(nft.itemDetails?.price) || 0);
        const start = priceFilter.start !== '' ? Number(priceFilter.start) : 0;
        const end = priceFilter.end !== '' ? Number(priceFilter.end) : Infinity;

        return price >= start && price <= end;
      });

      if (filteredNFTs.length === 0) {
        return []; // No data matches the filter
      }

      return filteredNFTs;
    }
  };

  useEffect(() => {
    if (priceFilter.start !== '' || priceFilter.end !== '') {
      const pricefilteredNFTs = priceFilterNFTs();
      setSortedNFTs(pricefilteredNFTs);
    } else {
      setSortedNFTs(nfts);
    }
  }, [priceFilter]);

  const filterNFTProperties = () => {
    if (selectedValues.length > 0) {
      const filteredNFTs = nfts.filter((nft) => {
        return selectedValues.some((selectedValue) => {
          const { key, value } = selectedValue;
          const matchingProperty = nft.properties.find((property) => {
            return (
              property.trait_type === key &&
              value.some((selectedVal) =>
                property.value.toString().includes(selectedVal),
              )
            );
          });
          return !!matchingProperty;
        });
      });

      return filteredNFTs;
    }
  };

  useEffect(() => {
    if (selectedValues.length > 0) {
      const pricefilteredNFTs = filterNFTProperties();
      setSortedNFTs(pricefilteredNFTs);
    } else {
      setSortedNFTs(nfts);
    }
  }, [selectedValues]);

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
                value={sortFilter}
                onChange={setSortFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-[200px] cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-500 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
                    <span className="block truncate text-gray-600 dark:text-white">
                      {sortFilter}
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
                    {filters.map((server, index) => (
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
        <div className="my-5 grid min-h-[53px] grid-cols-12 gap-6">
          {openFilter && (
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900 dark:bg-zinc-700 dark:text-white">
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('status')}
                  >
                    <span>Status</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <div
                    className={`target flex flex-wrap gap-2 pb-4 ${
                      filterCollapse.status ? 'block' : 'hidden'
                    }`}
                  >
                    <button
                      onClick={() =>
                        filterStatus === 'onauction'
                          ? setFilterStatus(null)
                          : setFilterStatus('onauction')
                      }
                      className={`col-span-3 flex h-8 w-fit min-w-[2rem] cursor-pointer items-center justify-center rounded-lg px-3 text-xs font-medium leading-5 text-white shadow ${
                        filterStatus === 'onauction'
                          ? 'bg-primary-300'
                          : 'bg-primary-500 lg:hover:bg-primary-300'
                      }`}
                    >
                      On Auction
                    </button>
                    <button
                      onClick={() =>
                        filterStatus === 'listed'
                          ? setFilterStatus(null)
                          : setFilterStatus('listed')
                      }
                      className={`col-span-3 flex h-8 w-fit min-w-[2rem] cursor-pointer items-center justify-center rounded-lg px-3 text-xs font-medium leading-5 text-white shadow ${
                        filterStatus === 'listed'
                          ? 'bg-primary-300'
                          : 'bg-primary-500 lg:hover:bg-primary-300'
                      }`}
                    >
                      Listed
                    </button>
                    <button
                      onClick={() =>
                        filterStatus === 'notforsale'
                          ? setFilterStatus(null)
                          : setFilterStatus('notforsale')
                      }
                      className={`col-span-3 flex h-8 w-fit min-w-[2rem] cursor-pointer items-center justify-center rounded-lg px-3 text-xs font-medium leading-5 text-white shadow ${
                        filterStatus === 'notforsale'
                          ? 'bg-primary-300'
                          : 'bg-primary-500 lg:hover:bg-primary-300'
                      }`}
                    >
                      Not For Sale
                    </button>
                  </div>
                </li>
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('price')}
                  >
                    <span>Price</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <div
                    className={`target flex flex-col gap-3 pb-2  ${
                      filterCollapse.price ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="flex flex-row gap-2">
                      <input
                        type="number"
                        placeholder="Start Price"
                        value={startPrice}
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => setStartPrice(e.target.value)}
                        className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      />
                      <div className="flex items-center justify-center">-</div>
                      <input
                        type="number"
                        placeholder="End Price"
                        value={endPrice}
                        min={0}
                        onWheel={(e) => e.target.blur()}
                        onChange={(e) => setEndPrice(e.target.value)}
                        className="block h-8 w-1/2 rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-0 dark:border-zinc-600 dark:bg-zinc-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      />
                    </div>
                    <button
                      className="mb-2 inline-flex w-full justify-center rounded-full bg-primary-500 px-4 py-2 text-sm text-white hover:bg-primary-300"
                      onClick={() =>
                        handleApplyPriceFilter(startPrice, endPrice)
                      }
                    >
                      Apply
                    </button>
                  </div>
                </li>
                <li>
                  <button
                    className="action flex w-full cursor-pointer items-center justify-between py-3"
                    onClick={(event) => handleFilterCollapse('properties')}
                  >
                    <span>Properties</span>
                    <FontAwesomeIcon icon={faChevronDown} />
                  </button>
                  <div
                    className={`target pb-5 ${
                      filterCollapse.properties ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="flex flex-col ">
                      {dataProperties.map((data, index) => (
                        <div
                          key={index}
                          className="flex cursor-pointer flex-col justify-between gap-2"
                        >
                          <div
                            className="flex justify-between gap-2"
                            onClick={(event) =>
                              handleOpenProperties(data?.key?.trait_type)
                            }
                          >
                            <span className="capitalize">
                              {data.key.trait_type}
                            </span>
                            <div>
                              <span className="mr-2">{data.key.count}</span>
                              <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                          </div>
                          <div
                            className={`pb-3 ${
                              filterProperties[data.key.trait_type]
                                ? 'block'
                                : 'hidden'
                            }`}
                          >
                            {data.values.map((val, index) => (
                              <div
                                className="flex justify-between gap-2"
                                key={index}
                              >
                                <div className="inline-flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    className="mr-2 h-4 w-4 rounded border-gray-300 text-primary-500 ring-primary-500 focus:ring-primary-500"
                                    value={val.value}
                                    checked={selectedValues.some(
                                      (item) =>
                                        item.key === data?.key?.trait_type &&
                                        item.value.includes(val.value),
                                    )}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        data?.key?.trait_type,
                                      )
                                    }
                                  />
                                  <span className="capitalize">
                                    {val.value}
                                  </span>
                                </div>
                                <div>
                                  <span className="mr-2">{val.count}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
              {sortedNFTs.length === 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  No results found
                </div>
              )}
              {sortedNFTs.length === 0 && isLoading && (
                <>
                  {[...Array(4)].map((nft, index) => (
                    <NftItemDetailSkeleton
                      key={index}
                      gridList={gridList}
                      openFilter={openFilter}
                    />
                  ))}
                </>
              )}
              {sortedNFTs.length > 0 &&
                sortedNFTs.map((nft, index) => {
                  const currentDate = moment();
                  const endDate = moment.unix(nft?.itemDetails?.endDate);
                  const releaseDate = moment.unix(nft?.itemDetails?.releaseDate);
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

const Activity = ({ collection }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getActivity = async () => {
      setIsLoading(true);
      await axios
        .request({
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/collection/activity/${collection.tokenAddress}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          setEvents(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoading(false);
        });
    };

    if (collection) {
      getActivity();
    }
  }, [collection]);

  return (
    <>
      {events.length == 0 && !isLoading && (
        <div className="w-full items-center justify-center gap-5 self-stretch rounded-xl bg-white p-2 text-black lg:inline-flex">
          No Activities
        </div>
      )}
      {events.length == 0 && isLoading && (
        <div className="flex flex-col gap-5 text-sm text-black dark:text-white">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3">
            {[...Array(5)].map((nft, index) => (
              <ActivityItemDetailSkeleton key={index} />
            ))}
          </div>
        </div>
      )}
      {events.length > 0 && !isLoading && (
        <div className="flex flex-col gap-5 text-sm text-black dark:text-white">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-300 bg-gray-50 p-3">
            <ActivityItemDetail events={events} collection={collection} />
          </div>
        </div>
      )}
    </>
  );
};
