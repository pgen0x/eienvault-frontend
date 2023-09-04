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

export default function AccountPage() {
  const router = useRouter();
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
  {
    /*
  This made for an example
  */
  }
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

  return (
    <>
      <section>
        <div className="w-full">
          <img src="https://via.placeholder.com/1920x266" />
        </div>
      </section>
      <div className="container m-auto">
        <section>
          <div className="mt-5 flex justify-between">
            <div className="flex w-full flex-col">
              <div className="relative -mt-[5rem]">
                <img
                  className="w-36 rounded-lg border-4 border-white shadow"
                  src="https://via.placeholder.com/100x100"
                />
              </div>
              <div className="mt-3 text-xl font-semibold text-gray-900">
                Ship collections
              </div>
              <div className="mt-3 block flex h-[40px] w-full justify-start gap-4 text-gray-900">
                <div>
                  Created by <span className="font-semibold">John doe</span>
                </div>
                <div>
                  Address <span className="font-semibold">0x30756...Fb179</span>
                </div>
              </div>
              <div className="mt-2 flex gap-1 font-semibold text-white">
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
            <div className="flex w-96 flex-col gap-2 rounded-lg border-2 border-gray-200 bg-white p-5 text-sm text-gray-900">
              <div className="flex justify-between">
                <span className="font-semibold">Floor</span>
                <span>0.01 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Volumes</span>
                <span>0.01 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Items</span>
                <span>4</span>
              </div>
              <div className="flex justify-between border-b-2 pb-2">
                <span className="font-semibold">Owner</span>
                <span>4</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Royalties</span>
                <span>10%</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Blockchain</span>
                <span>Ethereum</span>
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
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <button
                className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300"
                onClick={handleOpenFilter}
              >
                <FontAwesomeIcon icon={faSliders} /> Filter
              </button>
            </div>
            <div className="col-span-12 flex gap-2 sm:col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
              <div className="inline-flex h-10 w-2/3 w-full items-center justify-start gap-2 rounded-full border border-0 border-gray-200 bg-white px-4 dark:bg-gray-800">
                <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input
                  ref={inputRef}
                  className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  type="text"
                  placeholder="Search ..."
                  aria-label="Search"
                />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox value={selectedFilter} onChange={setSelectedFilter}>
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
              <div className="flex space-x-1 rounded-full border border-gray-200 bg-white px-1 py-1">
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
              <div className="grid w-full grid-cols-12 gap-6 text-gray-900">
                {collections.map((collection, index) => (
                  <div
                    key={index}
                    className={`group h-[540px] w-full ${
                      openFilter
                        ? 'col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 2xl:col-span-4'
                        : 'col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3'
                    }`}
                  >
                    <img
                      className="relative z-10 h-[300px] w-full rounded-2xl object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all"
                      src="https://via.placeholder.com/325x265"
                    />
                    <div className="relative -top-3 inline-flex w-full flex-col items-center justify-center lg:items-start">
                      <div className="relative flex w-full flex-row px-5">
                        <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
                          <div className="flex w-full flex-col items-start justify-start">
                            <div className="inline-flex items-center justify-between self-stretch pt-2">
                              <div className="font-semibold leading-none text-neutral-700">
                                <div className="flex items-center justify-center gap-2 rounded-md bg-primary-50 p-1">
                                  <img
                                    className="h-4 w-4 rounded-2xl"
                                    src="https://via.placeholder.com/16x16"
                                  />
                                  <div className="flex items-start justify-start gap-2">
                                    <div className="text-xs font-medium leading-none text-neutral-700">
                                      Ryuma
                                    </div>
                                    <div className="text-xs font-black leading-none text-primary-500">
                                      <FontAwesomeIcon icon={faCircleCheck} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="items-center text-primary-500">
                                <FontAwesomeIcon icon={faEllipsis} />
                              </div>
                            </div>
                            <div className="inline-flex w-full items-center justify-between gap-2 pt-1">
                              <div className="text-sm font-medium leading-tight text-gray-600">
                                {collection}
                              </div>
                              <div className="text-sm font-normal leading-tight text-neutral-700">
                                <Ethereum className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="mt-5 flex w-full justify-between rounded-md bg-white px-2 py-2">
                              <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                                <p>Price</p>
                                <p className="font-bold">0.39 ETH</p>
                              </div>
                              <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                                <p>Highest bid</p>
                                <p className="font-bold">No bids yet</p>
                              </div>
                            </div>
                            <div className="mt-5 flex w-full items-center">
                              <FontAwesomeIcon
                                className="mr-5 h-5 w-5 cursor-pointer rounded-full p-3 text-primary-500 hover:bg-primary-50 "
                                icon={faCartPlus}
                              />
                              <button className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                                Buy Now
                              </button>
                            </div>
                            <button
                              onClick={() => router.push('/nft/user')}
                              className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all"
                            >
                              View Detail
                            </button>
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
