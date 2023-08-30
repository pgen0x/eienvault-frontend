'use client';
import { useIsMounted } from '@/app/lib/hooks/use-is-mounted';
import Image from "next/image";
import { useRef, useState } from "react";
import Footer from "../components/footer/main";
import { Listbox } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCartPlus, faChevronDown, faCircleCheck, faEllipsis, faGrip, faGripVertical, faPenToSquare, faSearch, faShare, faSliders, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Trykker } from 'next/font/google';
import Search from '../components/navbar/search';
import Ethereum from '../assets/icon/ethereum';
import { filter } from '@metamask/jazzicon/colors';
import { useEffect } from 'react';
import DatePicker from 'tailwind-datepicker-react';
import { faImage } from '@fortawesome/free-regular-svg-icons';

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
  'Obliviate'
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
  'Pyrameed',
  'Cute ninja',
  'Kokoakoci'
];

export default function ProfilePage() {
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const inputRef = useRef(null);
  const [gridList, setGridList] = useState("grid");
  const [stepCreate, setStepCreate] = useState(1);
  const [modalCreate, setModalCreate] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState(blockchains[0]);

  const classRadio = (params, value) => {
    const defaultCssRadio = "cursor-pointer flex w-8 h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ";
    return defaultCssRadio + (params === value ? 'text-white bg-primary-500 shadow' : 'text-primary-500 hover:bg-primary-200')
  }

  const handleGridList = (event, target) => {
    setGridList(target);
  }

  const handleModalCreate = () => {
    if (modalCreate) {
      handleStepCreate(1);
    }
    setModalCreate(!modalCreate)
  }

  const handleStepCreate = (Create) => {
    setStepCreate(Create);
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
                <a className="bg-primary-500 hover:bg-primary-300 rounded-full py-2 px-4" href="/profile/setting"><FontAwesomeIcon icon={faPenToSquare} /> Edit Profile</a>
                <a className="bg-primary-500 hover:bg-primary-300 rounded-full py-2 px-4" href="#">Sell</a>
                <a className="bg-primary-500 hover:bg-primary-300 rounded-full py-2 px-4" href="#"><FontAwesomeIcon icon={faShare} /></a>
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
                              `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
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
          <ul className="flex text-primary-500 border-b border-gray-200 my-5">
            <li className="px-5 pb-3 cursor-pointer">Owned</li>
            <li className="px-5 pb-3 border-b-4 border-primary-500 cursor-pointer">Collections <span className="bg-red-400 rounded-full text-white text-xs font-semibold px-1">2</span></li>
            <li className="px-5 pb-3 cursor-pointer">Bid received</li>
            <li className="px-5 pb-3 cursor-pointer">Collateral</li>
            <li className="px-5 pb-3 cursor-pointer">Created</li>
            <li className="px-5 pb-3 cursor-pointer">On sale <span className="bg-red-400 rounded-full text-white text-xs font-semibold px-1">1</span></li>
            <li className="px-5 pb-3 cursor-pointer">Sold</li>
            <li className="px-5 pb-3 cursor-pointer">Liked</li>
          </ul>
        </section>
        <section>
          <div className="grid grid-cols-12 gap-1 my-5">
            <div className="flex gap-2 col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
              <div className="w-full border border-gray-200 inline-flex h-10 items-center justify-start gap-2 rounded-full border-0 bg-white px-4 dark:bg-gray-800 w-2/4">
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
                <div className="relative z-20  w-2/4">
                  <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                          `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
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
                  <label className={classRadio(gridList, 'grid')}>
                    <input className="hidden" type="radio" name="rangeOptions" onChange={(event) => handleGridList(event, 'grid')} />
                    <FontAwesomeIcon icon={faGrip} />
                  </label>
                </div>
                <div>
                  <label className={classRadio(gridList, 'list')}>
                    <input className="hidden" type="radio" name="rangeOptions" onChange={(event) => handleGridList(event, 'list')} />
                    <FontAwesomeIcon icon={faGripVertical} />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 my-5">
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
              <div className="w-full grid grid-cols-12 gap-6 text-gray-900">
                <div className="w-full col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 mb-4">
                  <div className="flex flex-col border-2 border-gray-200 w-full h-full justify-center items-center rounded-2xl">
                    <button className="bg-primary-500 hover:bg-primary-300 w-fit text-white px-4 py-1 rounded-full" onClick={handleModalCreate}>Create a new collection</button>
                    <button className="text-primary-500 hover:text-primary-300 font-semibold w-fit px-4 py-1">Import existing collection</button>
                  </div>
                </div>
                {collections.map((collection, index) => (
                  <div key={index} className="w-full group col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3 2xl:col-span-3 h-[300px]">
                    <img className="w-full object-cover rounded-2xl relative z-10 group-hover:h-[160px] h-[200px] group-hover:transition-all ease-in-out duration-300" src="https://via.placeholder.com/325x175" />
                    <div className="bg-white bg-opacity-50 rounded-tr-2xl rounded-tl-2xl w-fit flex gap-1 p-3 absolute -mt-[72px] ml-[20px] z-10">
                      <div className="w-fit">
                        <img src="https://via.placeholder.com/48x48" className="rounded-lg" />
                      </div>
                      <div>
                        <h3>Ship collections</h3>
                        <h3 className="font-semibold">1 Owner</h3>
                      </div>
                    </div>
                    <div className="w-full inline-flex flex-col relative -top-5 items-center justify-center lg:items-start">
                      <div className="w-full relative px-5 flex flex-row">
                        <div className="w-full inline-flex flex-col items-start justify-start rounded-br-2xl rounded-bl-2xl bg-gray-50 p-3 backdrop-blur-xl">
                          <div className="flex justify-between w-full px-2 py-2 mt-4 bg-gray-100 rounded-md">
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                              <p>Total Volume</p>
                              <p className="font-bold">0.001 ETH</p>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-start truncate text-sm leading-5">
                              <p>Floor</p>
                              <p className="font-bold">0.001 ETH</p>
                            </div>
                          </div>
                          <a href="/collection" className="bg-white hover:bg-primary-50 text-primary-500 w-full mt-2 text-center py-0 group-hover:py-2 overflow-hidden opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 rounded-full group-hover:transition-all ease-in-out duration-800">View Detail</a>
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
      {modalCreate && (
        <div className="relative z-[100]" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepCreate == 1) && (
                    <section className="step-1 flex flex-col gap-3 p-5 bg-gray-100 overflow-y-auto">
                      <div className="w-full flex justify-between">
                        <h3 className="font-semibold">Create collection</h3>
                        <button onClick={handleModalCreate} className="text-primary-500"><FontAwesomeIcon icon={faXmark} /></button>
                      </div>
                      <div className="w-full">
                        Deploying your own contract requires uploading your metadata outside of OpenSea.
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Upload your item</label>
                        <div className="flex flex-col bg-white border-2 border-dashed border-gray-200 text-center items-center py-5 gap-3">
                          <FontAwesomeIcon icon={faImage} className="text-6xl" />
                          <div className="">
                            400 x 400 pixel is recommended
                          </div>
                          <label className="bg-primary-500 text-white font-semibold px-4 py-1 rounded-full cursor-pointer">
                            Choose file
                            <input type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Name</label>
                        <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                          <input type="text" className="border-0 w-full bg-transparent focus:outline-none focus:ring-0" placeholder="Name of your collection" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900 font-bold">Token symbol</label>
                        <span>The token symbol is shown on the block explorer when others view your smart contract. e:g : Bitcoin shown as BTC</span>
                        <div className="w-full flex items-center border border-gray-200 rounded-full bg-white">
                          <input type="number" className="w-full bg-transparent focus:outline-none focus:ring-0 border-0" placeholder="AAA" />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">Blockchain</label>
                        <Listbox disabled={stepCreate == 3 ? true : false} value={selectedBlockchain} onChange={setSelectedBlockchain}>
                          <div className="relative z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-full bg-white py-2 pl-3 pr-10 text-left border border-gray-200 focus:outline-none sm:text-sm">
                              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Ethereum />
                              </span>
                              <span className="block truncate text-gray-600 pl-5">{selectedBlockchain}</span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z" fill="#7D778A" />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {blockchains.map((blockchain, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-500 text-white' : 'text-gray-900'
                                    }`
                                  }
                                  value={blockchain}>
                                  {({ selectedBlockchain }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selectedBlockchain ? 'font-medium' : 'font-normal'
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
                      <button className="disabled:bg-primary-200 bg-primary-500 w-full rounded-full py-3 text-white font-semibold" onClick={() => handleStepCreate(stepCreate + 1)}>Create an offer</button>
                    </section>
                  )}
                  {(stepCreate == 2) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-primary-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Deploying your contract</h3>
                          <span>Check your wallet and do an approvement to continue deploying your contract</span>
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400 bg-white py-2 w-full rounded-full" onClick={() => handleStepCreate(stepCreate - 1)}>Cancel</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepCreate(stepCreate + 1)}>Next</button>
                      </div>
                    </section>
                  )}
                  {(stepCreate == 3) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <div className="rounded-lg bg-primary-100 w-12 h-12 animate-ping"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Your contract has been deploying</h3>
                          <span>Wait a moment, deploying on progress.</span>
                        </div>
                        <button className="text-primary-500 font-bold hover:text-primary-400 bg-white py-2 w-full rounded-full" onClick={() => handleStepCreate(stepCreate + 1)}>View on etherscan</button>
                        <button className="text-primary-500 font-bold hover:text-primary-400" onClick={() => handleStepCreate(stepCreate - 1)}>Cancel</button>
                      </div>
                    </section>
                  )}
                  {(stepCreate == 4) && (
                    <section className="step-2 flex flex-col gap-3 p-5 bg-gray-100">
                      <div className="flex flex-col gap-5 items-center">
                        <img src="https://via.placeholder.com/84x84" className="rounded-lg w-20 h-20" />
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Your collections is now created!</h3>
                          <span>Clik the customize button to adjust your collections setting.</span>
                        </div>
                        <div className="flex gap-2 w-full justiry-between">
                          <button className="w-full text-white font-bold hover:text-primary-400 bg-primary-500 py-2 rounded-full" onClick={handleModalCreate}>Customize</button>
                          <button className="w-full text-primary-500 font-bold hover:text-primary-400 bg-white py-2 rounded-full" onClick={handleModalCreate}>Later</button>
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
      <Footer />
    </>
  );
}
