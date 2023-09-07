'use client';
import { useIsMounted } from '@/hooks/use-is-mounted';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Footer from '../../components/footer/main';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar,
  faCartPlus,
  faChevronDown,
  faCircleCheck,
  faEllipsis,
  faGrip,
  faGripVertical,
  faPenToSquare,
  faSearch,
  faShare,
  faSliders,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Trykker } from 'next/font/google';
import Search from '../../components/navbar/search';
import Ethereum from '@/assets/icon/ethereum';
import { filter } from '@metamask/jazzicon/colors';
import { useEffect } from 'react';
import DatePicker from 'tailwind-datepicker-react';
import { faImage } from '@fortawesome/free-regular-svg-icons';
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

const blockchains = [
  'Arbitrum',
  'Expeliomus',
  'Crucio',
  'Expecto',
  'Patronom',
  'Obliviate',
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
  'Cute ninja',
  'Kokoakoci',
];

const listCollections = [
  { name: 'Owned', badge: 0, active: false },
  { name: 'Collections', badge: 2, active: true },
  { name: 'Bid received', badge: 0, active: false },
  { name: 'Collateral', badge: 0, active: false },
  { name: 'Created', badge: 0, active: false },
  { name: 'On sale', badge: 1, active: false },
  { name: 'Sold', badge: 0, active: false },
  { name: 'Liked', badge: 0, active: false }
]
export default function ProfilePage() {
  const router = useRouter();
  const [selectedServer, setSelectedServer] = useState(servers[0]);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const inputRef = useRef(null);
  const [gridList, setGridList] = useState('grid');
  const [stepCreate, setStepCreate] = useState(1);
  const [modalCreate, setModalCreate] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState(blockchains[0]);
  const [limitCollection, setLimitCollection] = useState(listCollections.length)

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

  const handleModalCreate = () => {
    if (modalCreate) {
      handleStepCreate(1);
    }
    setModalCreate(!modalCreate);
  };

  const handleStepCreate = (Create) => {
    setStepCreate(Create);
  };

  const handleResize = () => {
    const screen = window.innerWidth
    if (screen < 640) {
      setLimitCollection(2)
    } else if (screen > 768 && screen < 1280) {
      setLimitCollection(5)
    } else if (screen > 1280 && screen < 1440) {
      setLimitCollection(listCollections.length)
    } else {
      setLimitCollection(listCollections.length)
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section>
        <div className="w-full">
          <img src="https://fakeimg.pl/1920x266" className="h-[266px] object-cover" />
        </div>
      </section>
      <div className="container m-auto p-3">
        <section>
          <div className="mt-5 flex justify-between">
            <div className="flex w-full flex-col">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
                  <div className="relative -mt-[5rem]">
                    <img className="w-36 rounded-full border-4 border-white shadow" src="https://fakeimg.pl/100x100" />
                  </div>
                  <div className="mt-3 text-xl font-semibold text-gray-900">
                    John Doe
                  </div>
                  <div className="mt-3 block h-[34px] overflow-hidden text-ellipsis text-lg  text-gray-900">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry`&lsquo;`s standard
                    dummy text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen book. It
                    has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was
                    popularised in the 1960s with the release of Letraset sheets
                    containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of
                    Lorem Ipsum.
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 2xl:col-span-6 flex justify-end">
                  <div className="flex flex-col gap-5 w-full sm:w-full md:w-56 lg:w-56 xl:w-56 2xl:w-56 rounded-xl bg-white sm:bg-white md:bg-transparent lg:bg-transparent xl:bg-transparent 2xl:bg-transparent">
                    <div className="flex w-full divide-x divide-gray-200 rounded-xl bg-white p-5 text-gray-900">
                      <div className="w-full text-center">
                        <h2>2</h2>
                        <p>Followers</p>
                      </div>
                      <div className="w-full text-center">
                        <h2>129</h2>
                        <p>Following</p>
                      </div>
                    </div>
                    <div className="w-full justify-between rounded-xl bg-white p-5 text-gray-900">
                      <p>Address</p>
                      <div>
                        <Listbox value={selectedServer} onChange={setSelectedServer}>
                          <div className="relative z-30">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate text-gray-600">
                                {selectedServer}
                              </span>
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
                                        className={`block truncate ${selectedServer
                                          ? 'font-medium'
                                          : 'font-normal'
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
                <div className="col-span-12 flex gap-1 font-semibold text-white">
                  <a className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300" href="/profile/setting">
                    <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                  </a>
                  <a className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300" href="#">
                    Sell
                  </a>
                  <a className="rounded-full bg-primary-500 px-4 py-2 hover:bg-primary-300" href="#">
                    <FontAwesomeIcon icon={faShare} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="inline">
          <ul className="w-full my-5 flex border-b border-gray-200 text-primary-500 gap-10">
            {listCollections.slice(0, limitCollection).map((collection, index) => (
              <li className={`cursor-pointer pb-3 flex gap-2 ${collection.active === true ? "border-b-4 border-primary-500" : ""}`}>
                <span>{collection.name}</span>
                {collection.badge > 0 && (<span className="rounded-full bg-red-400 h-4 w-4 text-center text-xs font-semibold text-white">{collection.badge}</span>)}
              </li>
            ))}
            {(limitCollection != listCollections.length) ? (
              <li className="cursor-pointer group">
                <span className="pb-3">More</span> <FontAwesomeIcon icon={faChevronDown} />
                <ul className="border-b border-gray-200 text-primary-500 hidden group-hover:flex flex-col absolute gap-3 py-3 mt-3 z-30 bg-white rounded-b-xl">
                  {listCollections.slice(limitCollection).map((collection, index) => (
                    <li className={`cursor-pointer px-5 flex gap-2 ${collection.active === true ? "border-b-4 border-primary-500" : ""}`}>
                      <span>{collection.name}</span>
                      {collection.badge > 0 && (<span className="rounded-full bg-red-400 h-4 w-4 text-center text-xs font-semibold text-white">{collection.badge}</span>)}
                    </li>
                  ))}
                </ul>
              </li>
            ) : ''}
          </ul>
        </section>
        <section>
          <div className="my-5 grid grid-cols-12 gap-1">
            <div className="col-span-12 flex gap-2 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
              <div className="inline-flex h-10 w-2/4 w-full items-center justify-start gap-2 rounded-full border border-0 border-gray-200 bg-white px-4 dark:bg-gray-800">
                <div className="text-xl font-black text-zinc-500 dark:text-zinc-200">
                  <FontAwesomeIcon icon={faSearch} />
                </div>
                <input ref={inputRef} className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" type="text" placeholder="Search ..." aria-label="Search" />
                <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
                  <div className="text-base font-light leading-normal text-zinc-500">
                    /
                  </div>
                </div>
              </div>
              <Listbox value={selectedFilter} onChange={setSelectedFilter} className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                <div className="relative z-20  w-2/4">
                  <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-100 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate text-gray-600">
                      {selectedFilter}
                    </span>
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
            <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12 2xl:col-span-12">
              <div className="grid w-full grid-cols-12 gap-6 text-gray-900">
                <div className="col-span-12 mb-4 w-full h-[280px] sm:col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-gray-200">
                    <button className="w-fit rounded-full bg-primary-500 px-4 py-1 text-white hover:bg-primary-300" onClick={handleModalCreate}>
                      Create a new collection
                    </button>
                    <button className="w-fit px-4 py-1 font-semibold text-primary-500 hover:text-primary-300">
                      Import existing collection
                    </button>
                  </div>
                </div>
                {collections.map((collection, index) => (
                  <div key={index} className="group col-span-6 h-[320px] sm:h-[320px] md:h-[300px] lg:h-[300px] xl:h-[300px] 2xl:h-[300px] w-full sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-3 2xl:col-span-3">
                    <img className="relative z-10 h-[200px] w-full rounded-2xl object-cover duration-300 ease-in-out group-hover:h-[160px] group-hover:transition-all" src="https://fakeimg.pl/325x175" />
                    <div className="grid grid-cols-12 p-3">
                      <div className="col-span-12 sm:col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-8 2xl:col-span-8 relative z-10 -top-[60px] flex gap-1 rounded-tl-2xl rounded-tr-2xl bg-white bg-opacity-50 p-2">
                        <div className="w-fit">
                          <img src="https://fakeimg.pl/48x48" className="rounded-lg" />
                        </div>
                        <div className="w-full text-right">
                          <h3 className="text-xs">Ship collections</h3>
                          <h3 className="text-sm font-semibold">1 Owner</h3>
                        </div>
                      </div>
                    </div>
                    <div className="relative -top-[85px] inline-flex w-full flex-col items-center justify-center lg:items-start">
                      <div className="relative flex w-full flex-row px-3">
                        <div className="inline-flex w-full flex-col items-start justify-start rounded-bl-2xl rounded-br-2xl bg-gray-50 p-3 backdrop-blur-xl">
                          <div className="flex flex-col sm:flex-col md:flex-row w-full justify-between rounded-md bg-gray-100 px-2 py-2">
                            <div className="shrink-0 truncate text-sm leading-5 flex flex-col sm:items-start">
                              <p>Total Volume</p>
                              <p className="font-bold">0.001 ETH</p>
                            </div>
                            <div className="shrink-0 truncate text-sm leading-5 flex flex-col sm:items-start">
                              <p>Floor</p>
                              <p className="font-bold">0.001 ETH</p>
                            </div>
                          </div>
                          <button onClick={() => router.push('/collection')} className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white py-0 text-center text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all">
                            View Detail
                          </button>
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
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {stepCreate == 1 && (
                    <section className="step-1 flex flex-col gap-3 overflow-y-auto bg-gray-100 p-5">
                      <div className="flex w-full justify-between">
                        <h3 className="font-semibold">Create collection</h3>
                        <button
                          onClick={handleModalCreate}
                          className="text-primary-500"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <div className="w-full">
                        Deploying your own contract requires uploading your
                        metadata outside of OpenSea.
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-bold leading-6 text-gray-900">
                          Upload your item
                        </label>
                        <div className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-5 text-center">
                          <FontAwesomeIcon
                            icon={faImage}
                            className="text-6xl"
                          />
                          <div className="">400 x 400 pixel is recommended</div>
                          <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white">
                            Choose file
                            <input type="file" className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-bold leading-6 text-gray-900">
                          Name
                        </label>
                        <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                          <input
                            type="text"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                            placeholder="Name of your collection"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-bold leading-6 text-gray-900">
                          Token symbol
                        </label>
                        <span>
                          The token symbol is shown on the block explorer when
                          others view your smart contract. e:g : Bitcoin shown
                          as BTC
                        </span>
                        <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                          <input
                            type="number"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                            placeholder="AAA"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Blockchain
                        </label>
                        <Listbox
                          disabled={stepCreate == 3 ? true : false}
                          value={selectedBlockchain}
                          onChange={setSelectedBlockchain}
                        >
                          <div className="relative z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Ethereum />
                              </span>
                              <span className="block truncate pl-5 text-gray-600">
                                {selectedBlockchain}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
                              {blockchains.map((blockchain, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${active
                                      ? 'bg-primary-500 text-white'
                                      : 'text-gray-900'
                                    }`
                                  }
                                  value={blockchain}
                                >
                                  {({ selectedBlockchain }) => (
                                    <>
                                      <span
                                        className={`block truncate ${selectedBlockchain
                                          ? 'font-medium'
                                          : 'font-normal'
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
                      <button
                        className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white disabled:bg-primary-200"
                        onClick={() => handleStepCreate(stepCreate + 1)}
                      >
                        Create an offer
                      </button>
                    </section>
                  )}
                  {stepCreate == 2 && (
                    <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">
                            Deploying your contract
                          </h3>
                          <span>
                            Check your wallet and do an approvement to continue
                            deploying your contract
                          </span>
                        </div>
                        <button
                          className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepCreate(stepCreate - 1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepCreate(stepCreate + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  )}
                  {stepCreate == 3 && (
                    <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">
                            Your contract has been deploying
                          </h3>
                          <span>Wait a moment, deploying on progress.</span>
                        </div>
                        <button
                          className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepCreate(stepCreate + 1)}
                        >
                          View on etherscan
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepCreate(stepCreate - 1)}
                        >
                          Cancel
                        </button>
                      </div>
                    </section>
                  )}
                  {stepCreate == 4 && (
                    <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <img
                          src="https://fakeimg.pl/84x84"
                          className="h-20 w-20 rounded-lg"
                        />
                        <div className="text-center">
                          <h3 className="text-lg font-bold">
                            Your collections is now created!
                          </h3>
                          <span>
                            Clik the customize button to adjust your collections
                            setting.
                          </span>
                        </div>
                        <div className="justiry-between flex w-full gap-2">
                          <button
                            className="w-full rounded-full bg-primary-500 py-2 font-bold text-white hover:text-primary-400"
                            onClick={handleModalCreate}
                          >
                            Customize
                          </button>
                          <button
                            className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                            onClick={handleModalCreate}
                          >
                            Later
                          </button>
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
