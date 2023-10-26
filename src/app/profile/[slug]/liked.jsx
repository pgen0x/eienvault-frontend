import ModalRemove from '@/components/modal/remove';
import {
  NftItemDetail,
  NftItemDetailSkeleton,
} from '@/components/nft/itemDetail';
import {
  faChevronDown,
  faGrip,
  faGripVertical,
  faSearch,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox } from '@headlessui/react';
import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next-nprogress-bar';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';

const filters = [
  'All',
  'Price low to high',
  'Price high to low',
  'Most favorited',
  'Ending soon',
];

const Liked = ({
  userAccount,
  handleOpenModalBuy,
  handleOpenModalBid,
  handleOpenModalPutonsale,
  handleOpenModalShare,
  handleOpenModalReport
}) => {
  const router = useRouter();
  const [sortFilter, setSortFilter] = useState(filters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [sortedNFTs, setSortedNFTs] = useState([]);
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

  const [filterStatus, setFilterStatus] = useState(null);
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');
  const [priceFilter, setPriceFilter] = useState({ start: '', end: '' });
  
  const [removeData, setRemoveData] = useState({});
  const [isOpenModalRemove, setisOpenModalRemove] = useState(false);

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

  const sortNfts = () => {
    if (sortFilter === 'All') {
      return nfts;
    } else if (sortFilter === 'Price low to high') {
      const sortedNfts = [...nfts].sort((a, b) => {
        // Convert price from wei to integer
        const priceA = formatEther(Number(a?.price)) || 0;
        const priceB = formatEther(Number(b?.price)) || 0;
        return priceA - priceB; // Sort low to high
      });
      return sortedNfts;
    } else if (sortFilter === 'Price high to low') {
      const sortedNfts = [...nfts].sort((a, b) => {
        // Convert price from wei to integer
        const priceA = formatEther(Number(a?.price)) || 0;
        const priceB = formatEther(Number(b?.price)) || 0;
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

  const priceFilterNFTs = () => {
    if (priceFilter.start !== '' || priceFilter.end !== '') {
      const filteredNFTs = nfts.filter((nft) => {
        const price = formatEther(Number(nft?.price) || 0);
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

  const handleApplyPriceFilter = (start, end) => {
    setPriceFilter({ start, end });
  };

  const handleOpenModalRemove = async (
    marketId,
    tokenId,
    collectionAddress
  ) => {
    setRemoveData({
      marketId,
      tokenId,
      collectionAddress
    });
    setisOpenModalRemove(true);
  };

  function closeModalRemove() {
    setisOpenModalRemove(false);
  }

  const refreshData = async () => {
    console.log('Trigger refreshData');
    setNfts([]);
    setNftPage(1);
    setNftLast(false);
    setIsLoading(true);
    await getNfts();
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
                value={sortFilter}
                onChange={setSortFilter}
                className="hidden sm:hidden md:block lg:block xl:block 2xl:block"
              >
                <div className="relative z-20">
                  <Listbox.Button className="relative w-[200px] cursor-default rounded-full bg-white py-2.5 pl-3 pr-10 text-left focus:outline-none focus-visible:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-500 dark:border-zinc-500 dark:bg-zinc-700 sm:text-sm">
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
            <div className="hidden items-center space-x-1 rounded-full bg-white px-1 dark:border-zinc-500 dark:bg-zinc-700 dark:text-white sm:hidden md:flex lg:flex xl:flex 2xl:flex">
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
              {sortedNFTs.length == 0 && !isLoading && (
                <div className="col-span-12 w-full text-center font-semibold text-black">
                  NFT not found
                </div>
              )}
              {sortedNFTs.length == 0 && isLoading && (
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
              {sortedNFTs.length > 0 &&
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
                      handleOpenModalShare={handleOpenModalShare}
                      handleOpenModalReport={handleOpenModalReport}
                      handleOpenModalRemove={handleOpenModalRemove}
                      isNotExpired={isNotExpired}
                      isNotRelease={isNotRelease}
                      releaseDate={nft?.releaseDate}
                      endDate={nft?.endDate}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </section>
      <ModalRemove
        isOpenModal={isOpenModalRemove}
        onClose={closeModalRemove}
        removeData={removeData}
        refreshData={refreshData}
      />
    </>
  );
};

export default Liked;
