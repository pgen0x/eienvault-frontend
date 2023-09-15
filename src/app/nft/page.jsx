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
  const [nfts, setNfts] = useState([]);
  const [nftPage, setNftPage] = useState(1);
  const [nftLast, setNftLast] = useState(false);
  const [search, setSearch] = useState(filterQuery.get('search') === null ? "" : filterQuery.get('search'));
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
    setNftPage(1);
    setNftLast(false);
    if (search === "") {
      setNfts([]);
    } else {
      setNftPage(1);
    }

    router.push(`?search=${search}`)
    getNfts();
    event.preventDefault();
  }

  useEffect(() => {
    getNfts();
  }, [nftPage]);

  const getNfts = async () => {
    if (nftLast === true) return;

    if (search === "") {
      await axios.request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getall?page=${nftPage}`,
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
        method: 'post',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/search?query=${search}&page=${nftPage}`,
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
            if(nftPage > 1){
              setNftLast(true);
            }else{
              setNfts([])
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
            <div className="col-span-12 flex flex-col md:flex-row gap-2">
              <div className="w-4/12 flex gap-1">
                <div className="w-fit">
                  <button className={`flex items-center gap-1 rounded-full px-4 py-2 hover:bg-primary-300 ${openFilter ? 'bg-primary-500' : 'bg-white text-primary-500'}`} onClick={handleOpenFilter}>
                    <FontAwesomeIcon icon={faSliders} /> <span>Filter</span>
                  </button>
                </div>
              </div>
              <form onSubmit={(event) => handleSearch(event)} className="w-full">
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
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={() => handleFilterCollapse('blockchain')}>
                      <span>Blockchain</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div className={`target py-5 ${filterCollapse.blockchain ? 'block' : 'hidden'}`}>
                      <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={(event) => handleFilterCollapse('category')}>
                      <span>Category</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={(event) => handleFilterCollapse('price')}>
                      <span>Floor price</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={(event) => handleFilterCollapse('status')}>
                      <span>Status</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={(event) => handleFilterCollapse('currency')}>
                      <span>Currency</span>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="action flex w-full cursor-pointer items-center justify-between py-3" onClick={(event) => handleFilterCollapse('collection')}>
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
                                      {nft.Collection?.name
                                        ? nft.Collection.name
                                        : nft.collectionAddress
                                          ? nft.collectionAddress
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
