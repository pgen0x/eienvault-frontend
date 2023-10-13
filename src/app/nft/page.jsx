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
import moment from 'moment';
import {
  NftItemDetail,
  NftItemDetailSkeleton,
} from '@/components/nft/itemDetail';
import ModalBid from '@/components/modal/bid';
import ModalBuy from '@/components/modal/buy';
import ModalPutOnSale from '@/components/modal/putOnSale';
import ModalShareSocialMedia from '@/components/modal/shareSocialMedia';
import ModalReportNft from '@/components/modal/reportNft';

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
    options: false,
    status: false,
  });
  const [openFilter, setOpenFilter] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const [chains, setChains] = useState([]);
  const [filterBlockchain, setFilterBlockchain] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [search, setSearch] = useState(
    filterQuery.get('search') === null ? '' : filterQuery.get('search'),
  );
  const [gridList, setGridList] = useState('grid');
  const [auctionData, setAcutionData] = useState({});
  const [buyData, setBuyData] = useState({});
  const [putOnSaleData, setPutonsaleData] = useState({});
  const [shareData, setShareData] = useState({});
  const [reportData, setReportData] = useState({});

  const [isOpenModalBid, setisOpenModalBid] = useState(false);
  const [isOpenModalBuy, setisOpenModalBuy] = useState(false);
  const [isOpenModalPutonsale, setisOpenModalPutonsale] = useState(false);
  const [isOpenModalShare, setisOpenModalShare] = useState(false);
  const [isOpenModalReport, setisOpenModalReport] = useState(false);

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

  useEffect(() => {
    setNftPage(1);
    setNftLast(false);
    setNfts([]);

    getNfts();
  }, [filterBlockchain, filterStatus, filterVerifiedOnly]);

  const getNfts = async () => {
    if (nftLast === true) return;
    setIsLoading(true);
    await axios
      .request({
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/search?query=${search}&page=${nftPage}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          verifiedOnly: filterVerifiedOnly,
          chainId: filterBlockchain,
          status: filterStatus,
        }),
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

  const handleGridList = (event, target) => {
    setGridList(target);
  };

  const handleOpenModalBuy = async (
    marketId,
    price,
    imageUri,
    name,
    tokenId,
    collectionAddress,
    ChainSymbol,
    ChainName,
  ) => {
    setBuyData({
      marketId,
      price,
      imageUri,
      name,
      tokenId,
      collectionAddress,
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

  const handleOpenModalShare = async (tokenId, collectionAddress) => {
    setShareData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalShare(true);
  };

  const handleOpenModalReport = async (tokenId, collectionAddress) => {
    setReportData({
      tokenId,
      collectionAddress,
    });
    setisOpenModalReport(true);
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

  function closeModalShare() {
    setisOpenModalShare(false);
  }

  function closeModalReport() {
    setisOpenModalReport(false);
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
      <div className="container m-auto p-3">
        <section>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 flex flex-col gap-2 md:flex-row">
              <div className="flex w-4/12 gap-1">
                <div className="w-fit">
                  <button
                    className={`flex items-center gap-1 rounded-full px-4 py-2 lg:hover:bg-primary-300 ${
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
              <div className="hidden space-x-1 rounded-full border border-gray-200 bg-white px-1 py-1  dark:border-zinc-500 dark:bg-zinc-700 sm:hidden md:flex lg:flex xl:flex 2xl:flex">
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
                            (filterChain) => filterChain.mode == 'mainnet',
                          )
                          .map((chain, index) => {
                            return (
                              <button
                                key={index}
                                onClick={() =>
                                  filterBlockchain === chain.chainId
                                    ? setFilterBlockchain('')
                                    : setFilterBlockchain(chain.chainId)
                                }
                                className={`col-span-3 flex h-8 w-full min-w-[2rem] cursor-pointer items-center justify-center rounded-lg text-xs font-medium leading-5 text-white shadow ${
                                  filterBlockchain === chain.chainId
                                    ? 'bg-primary-300'
                                    : 'bg-primary-500 lg:hover:bg-primary-300'
                                }`}
                              >
                                {chain.symbol}
                              </button>
                            );
                          })}
                    </div>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('status')}
                    >
                      <span>Status</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`flex-wrap items-start gap-1 pb-5 ${
                        filterCollapse.status ? 'flex' : 'hidden'
                      }`}
                    >
                      <button
                        onClick={() =>
                          filterStatus === 'onauction'
                            ? setFilterStatus('')
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
                            ? setFilterStatus('')
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
                    </div>
                  </li>
                  <li>
                    <button
                      className="action flex w-full cursor-pointer items-center justify-between py-3"
                      onClick={(event) => handleFilterCollapse('options')}
                    >
                      <span>Options</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div
                      className={`flex-wrap items-start gap-1 pb-5 ${
                        filterCollapse.options ? 'flex' : 'hidden'
                      }`}
                    >
                      <div className="relative flex w-full gap-x-3">
                        <div className="flex h-6 items-center">
                          <input
                            onChange={() =>
                              filterVerifiedOnly
                                ? setFilterVerifiedOnly(false)
                                : setFilterVerifiedOnly(true)
                            }
                            checked={filterVerifiedOnly}
                            id="filterVerifiedOnly"
                            name="filterVerifiedOnly"
                            type="checkbox"
                            className={`h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 ${
                              filterVerifiedOnly ? 'ring-primary-500' : ''
                            }`}
                          />
                        </div>
                        <div className="text-sm leading-6">
                          <label
                            htmlFor="filterVerifiedOnly"
                            className="font-medium"
                          >
                            Verified only
                          </label>
                        </div>
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
                        gridList={gridList}
                        openFilter={openFilter}
                        collection={nft.Collection}
                        itemDetails={nft.itemDetails}
                        nft={nft}
                        isNotExpired={isNotExpired}
                        isNotRelease={isNotRelease}
                        handleOpenModalBuy={handleOpenModalBuy}
                        handleOpenModalBid={handleOpenModalBid}
                        handleOpenModalPutonsale={handleOpenModalPutonsale}
                        handleOpenModalShare={handleOpenModalShare}
                        handleOpenModalReport={handleOpenModalReport}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
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
      <ModalShareSocialMedia
        isOpenModal={isOpenModalShare}
        onClose={closeModalShare}
        onModalClose={closeModalShare}
        shareData={shareData}
      />
      <ModalReportNft
        isOpenModal={isOpenModalReport}
        onClose={closeModalReport}
        onModalClose={closeModalReport}
        reportData={reportData}
      />
      <Footer />
    </>
  );
}
