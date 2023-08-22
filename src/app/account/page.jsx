'use client';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "../components/footer/main";
import { Listbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronDown, faCircleCheck, faEllipsis, faGrip, faGripVertical, faPenToSquare, faSearch, faShare, faSliders } from '@fortawesome/free-solid-svg-icons';
import { Trykker } from 'next/font/google';
import Search from '../components/navbar/search';
import Ethereum from '../assets/icon/ethereum';
import { filter } from '@metamask/jazzicon/colors';
import { useEffect } from 'react';

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
  'Recently received'
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
  'Pyrameed'
];

export default function AccountPage() {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [filterCollapse, setFilterCollapse] = useState({ 'blockchain': false, 'category': false, 'price': false, 'status': false, 'currency': false, 'collection': false });
  const [openFilter, setOpenFilter] = useState(true);
  const inputRef = useRef(null);
  const [gridList, setGridList] = useState("grid");
  {/*
  This made for an example
  */}
  const handleFilterCollapse = (filter) => {
    setFilterCollapse({ ...filterCollapse, [filter]: !filterCollapse[filter] });
  }

  const classRadio = (params, value) => {
    const defaultCssRadio = "cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ";
    return defaultCssRadio + (params === value ? 'text-white bg-sky-500 shadow' : 'text-sky-500 hover:bg-sky-200')
  }

  const handleGridList = (event, target) => {
    setGridList(target);
  }

  const handleOpenFilter = () => {
    setOpenFilter(!openFilter);
  }

  return (
    <>
      <section>
        <div className="w-full">
          <img src="https://via.placeholder.com/1920x266" />
        </div>
      </section>
      <div className="container m-auto">
        <section>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col max-w-xs">
              <div className="relative -mt-[5rem]">
                <img className="w-36 rounded-full shadow border-4 border-white" src="https://via.placeholder.com/100x100" />
              </div>
              <div className="text-xl text-gray-900 font-semibold mt-3">
                John Doe
              </div>
              <div className="text-lg text-gray-900 mt-3 block h-[40px] overflow-hidden text-ellipsis text-sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </div>
              <div className="flex gap-1 text-white font-semibold mt-2">
                <button className="bg-sky-400 rounded-full py-2 px-4"><FontAwesomeIcon icon={faPenToSquare} /> Edit Profile</button>
                <button className="bg-sky-400 rounded-full py-2 px-4">Sell</button>
                <button className="bg-sky-400 rounded-full py-2 px-4"><FontAwesomeIcon icon={faShare} /></button>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex rounded-xl bg-white p-5 text-gray-900 w-56 divide-x divide-gray-200">
                <div className="text-center w-full">
                  <h2>2</h2>
                  <p>Followers</p>
                </div>
                <div className="text-center w-full">
                  <h2>129</h2>
                  <p>Following</p>
                </div>
              </div>
              <div className="mt-5 rounded-xl bg-white p-5 text-gray-900 w-56 justify-between">
                <p>Address</p>
                <div>
                  <Listbox value={selectedServer} onChange={setSelectedServer}>
                    <div className="relative z-30">
                      <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-gray-600">{selectedServer}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                          </svg>
                        </span>
                      </Listbox.Button>
                      <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {servers.map((server, index) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 px-4 ${active ? 'bg-sky-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={server}>
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
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ul className="flex text-sky-400 border-b border-gray-200 my-5">
            <li className="px-5 pb-3 cursor-pointer">Owned</li>
            <li className="px-5 pb-3 border-b-4 border-sky-400 cursor-pointer">Collections <span className="bg-red-400 rounded-full text-white text-xs font-semibold px-1">2</span></li>
            <li className="px-5 pb-3 cursor-pointer">Bid received</li>
            <li className="px-5 pb-3 cursor-pointer">Collateral</li>
            <li className="px-5 pb-3 cursor-pointer">Created</li>
            <li className="px-5 pb-3 cursor-pointer">On sale <span className="bg-red-400 px-1 rounded-full text-white text-xs font-semibold text-center">1</span></li>
            <li className="px-5 pb-3 cursor-pointer">Sold</li>
            <li className="px-5 pb-3 cursor-pointer">Liked</li>
          </ul>
        </section>
        <section>
          <div className="grid grid-cols-12 gap-1 my-5">
            <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
              <button className="bg-sky-400 rounded-full py-2 px-4" onClick={handleOpenFilter}><FontAwesomeIcon icon={faSliders} /> Filter</button>
            </div>
            <div className="flex gap-2 col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9">
              <div className="w-full border border-gray-200 inline-flex h-10 items-center justify-start gap-2 rounded-full border-0 bg-white px-4 dark:bg-gray-800 w-2/3">
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
                  <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-600">{selectedFilter}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                      </svg>
                    </span>
                  </Listbox.Button>
                  <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {servers.map((server, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${active ? 'bg-sky-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={server}>
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
              <div className="flex space-x-1 rounded-full bg-white py-1 px-1 border border-gray-200">
                <div>
                  <input className="hidden" type="radio" name="rangeOptions" id="optionGrid" onChange={(event) => handleGridList(event, 'grid')} />
                  <label class={classRadio(gridList, 'grid')} for="optionGrid"><FontAwesomeIcon icon={faGrip} /></label>
                </div>
                <div>
                  <input className="hidden" type="radio" name="rangeOptions" id="optionList" onChange={(event) => handleGridList(event, 'list')} />
                  <label class={classRadio(gridList, 'list')} for="optionList"><FontAwesomeIcon icon={faGripVertical} /></label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 my-5">
            {openFilter && (
              <div className="col-span-12 sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                <ul class="divide-y text-gray-900 bg-white p-5 rounded-xl font-bold">
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('blockchain')}>
                      <span>Blockchain</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                    <div className={`target py-5 ${filterCollapse.blockchain ? 'block' : 'hidden'}`}>
                      <select id="country" name="country" autocomplete="country-name" class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </li>
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('category')}>
                      <span>Category</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('price')}>
                      <span>Floor price</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('status')}>
                      <span>Status</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('currency')}>
                      <span>Currency</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                  <li>
                    <button className="w-full py-3 cursor-pointer items-center action flex justify-between" onClick={(event) => handleFilterCollapse('collection')}>
                      <span>Collection</span><FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </li>
                </ul>
              </div>
            )}
            <div className={`col-span-12 sm:col-span-12 ${openFilter ? 'md:col-span-8 lg:col-span-9 xl:col-span-9 2xl:col-span-9' : 'md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12'}`}>
              <div className="w-full grid grid-cols-12 gap-6 text-gray-900">
                {collections.map((collection, index) => (
                  <div key={index} className={`w-full ${openFilter ? 'col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 2xl:col-span-4' : 'col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3'}`}>
                    <img className="w-full rounded-2xl relative z-10" src="https://via.placeholder.com/325x265" />
                    <div className="w-full inline-flex flex-col relative -top-3 items-center justify-center lg:items-start">
                      <div className="w-full relative px-5 flex flex-row">
                        <div className="w-full inline-flex flex-col items-start justify-start gap-4 rounded-br-2xl rounded-bl-2xl bg-white bg-opacity-50 p-5 backdrop-blur-xl">
                          <div className="w-full flex flex-col items-start justify-start">
                            <div className="inline-flex items-center justify-between self-stretch pt-2">
                              <div className="font-semibold leading-none text-neutral-700">
                                {collection}
                              </div>
                              <div className="items-center text-sky-400">
                                <FontAwesomeIcon icon={faEllipsis} />
                              </div>
                            </div>
                            <div className="w-full inline-flex items-center justify-between gap-2 pt-1">
                              <div className="text-sm font-medium leading-tight text-gray-600">
                                {collection} Collection
                              </div>
                              <div className="text-sm font-normal leading-tight text-neutral-700">
                                <Ethereum className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="flex justify-between w-full mt-5 px-2 py-2 bg-white rounded-md">
                              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                                <p>Price</p>
                                <p className="font-bold">0.39 ETH</p>
                              </div>
                              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                                <p>Highest bid</p>
                                <p className="font-bold">No bids yet</p>
                              </div>
                            </div>
                            <div className="flex mt-5 w-full gap-3">
                              <button className="w-full text-center text-xs font-bold text-sky-400 bg-white rounded-full px-4 py-2">
                                View detail
                              </button>
                              <button className="w-full text-center text-xs font-bold text-white bg-sky-400 rounded-full px-4 py-2">
                                List item
                              </button>
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
