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

export default function NftPage() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [gridList, setGridList] = useState('grid');

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
    setNftPage(1);
    setNftLast(false);
    if (search === '') {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`);
    getNfts();
    event.preventDefault();
  };

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;
    setIsLoading(true);
    if (search === '') {
      await axios
        .request({
          method: 'get',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getall?page=${nftPage}`,
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
    } else {
      await axios
        .request({
          method: 'post',
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/search?query=${search}&page=${nftPage}`,
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
    }
  };

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  return (
    <>
      <div className="container m-auto p-3">
        <section>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col gap-2 md:flex-row">
              <div className="flex w-4/12 gap-1">
                <div className="w-fit">
                  <button
                    className={`flex items-center gap-1 rounded-full px-4 py-2 hover:bg-primary-300 ${
                      openFilter
                        ? 'bg-primary-500'
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
                className="w-full"
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
            {openFilter && (
              <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                <ul className="divide-y rounded-xl bg-white p-5 font-bold text-gray-900">
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
                      <ItemsNftSkeleton
                        key={index}
                        gridList={gridList}
                        openFilter={openFilter}
                      />
                    ))}
                  </>
                )}
                {nfts.length > 0 &&
                  nfts.map((nft, index) => {
                    return (
                      <ItemsNft
                        key={index}
                        nft={nft}
                        gridList={gridList}
                        openFilter={openFilter}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

const ItemsNft = ({
  gridList,
  openFilter,
  nft,
  isNotExpired,
  isNotRelease,
}) => {
  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0.00', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
    }

    let highestBid = BigInt(0);
    let highestBidder = null;

    for (const offer of auctionData.listOffers) {
      const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
      if (bidValue > highestBid) {
        highestBid = bidValue;
        highestBidder = offer.address;
      }
    }

    function getLowestBid(auctionData) {
      if (auctionData.listOffers.length === 0) {
        return 0; // Return a message if there are no bids
      }

      let lowestBid = Infinity; // Initialize to a large number

      for (const offer of auctionData.listOffers) {
        const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
        if (bidValue < lowestBid) {
          lowestBid = bidValue;
        }
      }

      return lowestBid.toString(); // Convert the lowestBid back to a string
    }

    return {
      message: 'Highest bid found',
      highestBid: highestBid.toString(),
      highestBidder,
    };
  }

  return (
    <div
      className={`group col-span-12 h-[542px] w-full sm:col-span-6 sm:h-[542px] md:h-[542px] lg:h-[542px] xl:h-[542px] 2xl:h-[542px] ${
        gridList === 'grid'
          ? openFilter
            ? 'md:col-span-6 xl:col-span-4 2xl:col-span-4'
            : 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : openFilter
          ? 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : 'md:col-span-3 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <div className="group h-[542px] w-full">
        <Image
          className="z-10 h-[290px] w-full rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all"
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={`https://via.placeholder.com/600x600`}
          src={nft?.imageUri}
        />
        <div className="inline-flex w-full flex-col items-center justify-center px-3 lg:items-start">
          <div className="relative flex w-full flex-row">
            <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white/60 p-3 backdrop-blur-xl  dark:bg-zinc-700/60">
              <div className="flex w-full flex-col items-start justify-start">
                <div
                  className="inline-flex cursor-pointer items-center justify-between self-stretch"
                  onClick={() =>
                    router.push(`/collection/${nft.collectionAddress}`)
                  }
                >
                  <div className="flex items-center justify-center gap-2 rounded-lg bg-white bg-opacity-70 p-2 dark:bg-zinc-600">
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
                      <div className="text-xs font-medium leading-none text-neutral-700 dark:text-white">
                        {nft.Collection?.name
                          ? nft.Collection?.name
                          : nft.collectionAddress
                          ? truncateAddress(nft.collectionAddress)
                          : ''}
                      </div>
                      <div className="text-xs font-black leading-none text-primary-500">
                        <FontAwesomeIcon icon={faCircleCheck} />
                      </div>
                    </div>
                  </div>
                  <div className="items-center dark:text-white">
                    <FontAwesomeIcon icon={faEllipsis} />
                  </div>
                </div>
                <div className="inline-flex w-full items-center justify-between gap-2 pt-1">
                  <div
                    className="line-clamp-2 h-[40px] font-medium leading-[20px] text-gray-600 dark:text-white"
                    title={`${nft?.name} #${nft?.tokenId}`}
                  >
                    {nft?.name} #{nft?.tokenId}
                  </div>
                  <div className="text-sm font-normal leading-tight text-neutral-700 dark:text-white">
                    <Ethereum className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-5 flex w-full justify-between rounded-md bg-white px-2 py-2 dark:bg-zinc-600 dark:text-white">
                  <div className="flex flex-col items-start truncate text-sm leading-5">
                    <p>Price</p>
                    <p className="font-bold">
                      {nft.itemDetails?.price
                        ? formatEther(Number(nft.itemDetails?.price))
                        : '0.00'}{' '}
                      {nft.Collection.Chain.symbol
                        ? nft.Collection.Chain.symbol
                        : '-'}
                    </p>
                  </div>
                  <div className="flex flex-col items-start truncate text-sm leading-5">
                    {nft.itemDetails?.isAuctioned ? (
                      <>
                        <p>Highest bid</p>
                        <p className="font-bold">
                          {formatEther(Number(getHighestBid(nft).highestBid))}{' '}
                          {nft.Collection.Chain.symbol
                            ? nft.Collection.Chain.symbol
                            : '-'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Floor Price</p>
                        <p className="font-bold">
                          {nft.Collection.floorPrice
                            ? formatEther(Number(nft.Collection.floorPrice))
                            : '0.00'}{' '}
                          {nft.Collection.Chain.symbol
                            ? nft.Collection.Chain.symbol
                            : '-'}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                {nft?.itemDetails ? (
                  !nft.itemDetails?.isAuctioned ? (
                    <div className="mt-5 flex w-full items-center">
                      {/* <FontAwesomeIcon
                              className="mr-5 h-5 w-5 cursor-pointer rounded-full p-3 text-primary-500 hover:bg-primary-50 "
                              icon={faCartPlus}
                            /> */}
                      <button
                        className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                        onClick={() =>
                          handleOpenModalBuy(
                            nft.itemDetails.marketId,
                            nft.itemDetails.price,
                            nft.imageUri,
                            nft.name,
                            nft.tokenId,
                            nft.Collection.Chain.symbol,
                            nft.Collection.Chain.name,
                          )
                        }
                        disabled={!isNotExpired}
                      >
                        {isNotExpired ? 'Buy Now' : 'Expired'}
                      </button>
                    </div>
                  ) : (
                    nft.itemDetails?.isAuctioned && (
                      <div className="mt-5 flex w-full items-center">
                        <button
                          className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                          onClick={() =>
                            handleOpenModalBid(
                              nft.itemDetails.marketId,
                              nft.itemDetails.listingPrice,
                              nft?.imageUri,
                              nft?.tokenId,
                              nft.itemDetails.price,
                              nft?.name,
                              nft.Collection,
                              getHighestBid(nft.itemDetails),
                              formatEther(getLowestBid(nft.itemDetails)),
                            )
                          }
                          disabled={
                            isNotRelease ? true : isNotExpired ? false : true
                          }
                        >
                          {isNotRelease
                            ? 'Upcoming'
                            : isNotExpired
                            ? 'Place Bid'
                            : 'Expired'}
                        </button>
                      </div>
                    )
                  )
                ) : (
                  <div className="mt-5 flex w-full items-center gap-4">
                    <button className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                      Not For Sale
                    </button>
                  </div>
                )}
                <button
                  onClick={() =>
                    router.push(`/nft/${nft.collectionAddress}/${nft.tokenId}`)
                  }
                  className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white text-center font-bold text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500"
                >
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemsNftSkeleton = ({ gridList, openFilter }) => {
  return (
    <div
      className={`group col-span-12 h-[542px] w-full sm:col-span-6 sm:h-[542px] md:h-[542px] lg:h-[542px] xl:h-[542px] 2xl:h-[542px] ${
        gridList === 'grid'
          ? openFilter
            ? 'md:col-span-6 xl:col-span-4 2xl:col-span-4'
            : 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : openFilter
          ? 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : 'md:col-span-3 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <div className="group h-[542px] w-full">
        <div className="h-[250px] w-full animate-pulse rounded-2xl bg-gray-300" />
        <div className="inline-flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
          <div className="relative flex w-full flex-row px-5">
            <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 p-3 backdrop-blur">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="mt-2 inline-flex items-center justify-between self-stretch">
                  <div className="flex items-center justify-center gap-2 rounded-lg p-2">
                    <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                    <div className="flex items-start justify-start gap-2">
                      <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="items-center">
                    <div className="h-2 w-6 animate-pulse rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="mb-5 mt-3 inline-flex w-full items-center justify-between gap-2 pt-1">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="mb-5 mt-3 flex w-full justify-between py-2">
                  <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                  <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="mt-5 flex w-full items-center">
                  {/* <div className="mr-5 h-12 w-16 animate-pulse rounded-full bg-gray-300 p-3" /> */}
                  <div className="h-12 w-full animate-pulse rounded-full bg-gray-300 p-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
