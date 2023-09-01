'use client';
import Ethereum from '@/assets/icon/ethereum';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faCartPlus,
  faChevronDown,
  faClose,
  faCoins,
  faEllipsis,
  faHourglass,
  faImage,
  faMoneyBill,
  faPercent,
  faPiggyBank,
  faPlusCircle,
  faUser,
  faUsers,
  faXmark,
  faZ,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Switch } from '@headlessui/react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount } from 'wagmi';
import moment from 'moment';
import { ErrorMessage } from '@hookform/error-message';

export default function Create({ chains }) {
  const [selectedAccount, setSelectedAccount] = useState(666888);
  const [stepCreate, setStepCreate] = useState(1);
  const [modalCreate, setModalCreate] = useState(false);
  const [selectedBlockchain, setSelectedBlockchain] = useState(666888);
  const [enableMinting, setEnableMinting] = useState(true);
  const [enableUnlockable, setEnableUnlockable] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('Untitled');
  const [selectedOptionMarket, setSelectedOptionMarket] = useState('fixed');
  const [selectedOptionEdition, setSelectedOptionEdition] = useState('single');
  const [selectedOptionCollection, setSelectedOptionCollection] =
    useState('snap');

  const { address } = useAccount();
  const [selectedOptionDate, setSelectedOptionDate] = useState('1 Day');
  const [customValueDate, setCustomValueDate] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDateSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionDate(selectedValue);

    if (selectedValue === 'Custom') {
      // Open modal or show date picker for custom date selection
      // You can implement your modal or date picker logic here
    } else {
      const currentDate = moment(); // Get the current local time using Moment.js
      let calculatedDate = moment(currentDate);

      if (selectedValue === '1 Day') {
        calculatedDate.add(1, 'days');
      } else if (selectedValue === '7 Day' || selectedValue === '1 Week') {
        calculatedDate.add(7, 'days');
      } else if (selectedValue === '1 Month') {
        calculatedDate.add(1, 'months');
      }

      // Format the calculated date in 'YYYY-MM-DDTHH:mm' format
      const formattedDate = calculatedDate.format('YYYY-MM-DDTHH:mm');

      // Set the formatted date as custom value
      setCustomValueDate(formattedDate);
    }
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

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };
  
  return (
    <>
      <div className="my-5 flex flex-row justify-center gap-5 text-gray-900">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold">Create New NFT</h2>
          <p>
            <span className="text-semantic-red-500">*</span> requires to be
            filled
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full">
                <label className="font-semibold">Blockchain</label>
                <Listbox
                  value={selectedAccount}
                  onChange={setSelectedAccount}
                  className="mt-2"
                >
                  <div className="relative z-20">
                    <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {selectedAccount === 1 ||
                        selectedAccount === 11155111 ? (
                          <Ethereum />
                        ) : (
                          ''
                        )}
                      </span>
                      <span className="block truncate pl-5 text-gray-600">
                        {
                          chains.find(
                            (chain) => chain.chainId === selectedAccount,
                          )?.name
                        }
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="text-gray-600"
                        />
                      </span>
                    </Listbox.Button>
                    <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {chains.map((chain) => (
                        <Listbox.Option
                          key={chain.chainId}
                          className={({ active }) =>
                            `relative cursor-default select-none px-4 py-2 ${
                              active
                                ? 'bg-primary-500 text-white'
                                : 'text-gray-900'
                            }`
                          }
                          value={chain.chainId}
                          disabled={
                            chain.chainId === 666888 || chain.chainId === 8668
                              ? false
                              : true
                          }
                        >
                          {({ selectedAccount }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedAccount
                                    ? 'font-medium'
                                    : 'font-normal'
                                } ${
                                  chain.chainId === 666888 ||
                                  chain.chainId === 8668
                                    ? ''
                                    : 'text-gray-400'
                                }`}
                              >
                                {chain.name}{' '}
                                <span className="text-sm ">
                                  {chain.chainId === 666888 ||
                                  chain.chainId === 8668
                                    ? ''
                                    : '[currently not supported]'}
                                </span>
                              </span>
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
              <div className="mt-2 w-full">
                <label className="mt-2 font-semibold">Edition</label>
                <ul className="mt-2 grid w-full gap-6 text-center md:grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      id="single-edition"
                      name="edition"
                      value="single"
                      className="peer hidden"
                      onChange={(e) => setSelectedOptionEdition(e.target.value)}
                      checked={selectedOptionEdition === 'single'}
                    />
                    <label
                      htmlFor="single-edition"
                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 ${
                        selectedOptionEdition === 'single'
                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                          : 'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-primary-500'
                      }`}
                    >
                      <FontAwesomeIcon icon={faUsers} className="text-5xl" />
                      <span>
                        Single
                        <br />
                        Edition
                      </span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="community-edition"
                      name="edition"
                      value="community"
                      className="peer hidden"
                      onChange={(e) => setSelectedOptionEdition(e.target.value)}
                      checked={selectedOptionEdition === 'community'}
                    />
                    <label
                      htmlFor="community-edition"
                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 ${
                        selectedOptionEdition === 'community'
                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                          : 'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-primary-500'
                      }`}
                    >
                      <FontAwesomeIcon icon={faUser} className="text-5xl" />
                      <span>
                        Community
                        <br />
                        Edition
                      </span>
                    </label>
                  </li>
                </ul>
              </div>

              <div className="mt-4 w-full">
                <label className="mt-2 font-semibold">Upload your item</label>
                <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-5 text-center">
                  {selectedImage ? (
                    <>
                      <button
                        className="absolute right-1.5 top-1.5 h-10 w-10 rounded-full text-rose-500 hover:bg-primary-50"
                        onClick={() => setSelectedImage(null)}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                      <Image
                        src={selectedImage}
                        alt="Selected Preview"
                        width={413}
                        height={288}
                        className="rounded-lg"
                        objectFit="contain"
                      />
                    </>
                  ) : (
                    <>
                      <div className="">
                        PNG, WEBP, MP4, MP3, Max size 100MB
                      </div>
                      <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white">
                        Choose file
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) =>
                            setSelectedImage(
                              URL.createObjectURL(e.target.files[0]),
                            )
                          }
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 w-full ">
                <label className="mt-2 font-semibold">
                  <span className="text-semantic-red-500">*</span> Name of your
                  item
                </label>
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-full border-0 bg-white focus:ring-primary-500"
                  placeholder="E.g, Mickey mouse riding a car"
                  {...register('name', { required: 'Name is required.' })}
                />
                <div className="text-sm text-primary-500 mt-1">
                  <ErrorMessage errors={errors} name="name" />
                </div>
              </div>
              <div className="mt-4 w-full">
                <label className="mt-2 font-semibold">
                  Description (optional)
                </label>
                <textarea
                  className="mt-2 w-full rounded-2xl border-0 bg-white focus:ring-primary-500"
                  placeholder="e. g. This art is created by handraw without any help from ai"
                />
              </div>
              <div className="mt-2 w-full">
                <label className="mt-2 font-semibold">Put on marketplace</label>
                <p>Select one of the selling method option below</p>
                <ul class="mt-2 grid w-full gap-6 text-center md:grid-cols-2">
                  <li>
                    <input
                      type="radio"
                      id="fixed-method"
                      name="method"
                      value="fixed"
                      className="peer hidden"
                      onChange={(e) => setSelectedOptionMarket(e.target.value)}
                      checked={selectedOptionMarket === 'fixed'}
                      required
                    />
                    <label
                      htmlFor="fixed-method"
                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 ${
                        selectedOptionMarket === 'fixed'
                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                          : 'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-5xl"
                      />
                      <span>
                        Fixed
                        <br />
                        Price
                      </span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="time-method"
                      name="method"
                      value="time"
                      className="peer hidden"
                      onChange={(e) => setSelectedOptionMarket(e.target.value)}
                      checked={selectedOptionMarket === 'time'}
                    />
                    <label
                      htmlFor="time-method"
                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 ${
                        selectedOptionMarket === 'time'
                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                          : 'dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={faHourglass}
                        className="text-5xl"
                      />
                      <span>
                        Time
                        <br />
                        Auction
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
              <div className="mt-4 w-full">
                <label className="mt-2 font-semibold">
                  <span className="text-semantic-red-500">*</span> Price
                </label>
                <p>Enter price to allow users instantly purchase your NFT</p>
                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white">
                  <input
                    type="number"
                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                    placeholder="0"
                    min="0"
                  />
                  <span className="pr-3 text-gray-500">
                    <Ethereum />
                  </span>
                </div>
              </div>
              <div className="mt-2 w-full px-2">
                <div className="flex w-full justify-between">
                  <span>Price</span>
                  <span className="font-semibold">- ETH</span>
                </div>
                <div className="mb-2 flex w-full justify-between border-b-2 pb-2">
                  <span>Snap charge fee</span>
                  <span className="font-semibold">0%</span>
                </div>
                <div className="flex w-full justify-between">
                  <span>You will receive</span>
                  <span className="font-semibold">- ETH</span>
                </div>
              </div>
              <div className="mt-4 flex w-full flex-col rounded-xl bg-white p-5">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  <span className="text-semantic-red-500">*</span> Date of
                  listing expiration
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    type="datetime-local"
                    name="duration_date"
                    id="duration_date"
                    autocomplete="duration_date"
                    className="flex-1 rounded-xl border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:text-sm sm:leading-6"
                    value={customValueDate}
                    disabled={selectedOptionDate !== 'Custom'}
                    onChange={(e) => setCustomValueDate(e.target.value)}
                  />
                  <select
                    className="rounded-3xl border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md sm:text-sm sm:leading-6"
                    onChange={handleDateSelectChange}
                    value={selectedOptionDate}
                  >
                    <option>1 Day</option>
                    <option>7 Day</option>
                    <option>1 Week</option>
                    <option>1 Month</option>
                    <option>Custom</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 w-full">
                <label className="font-semibold">Choose collection</label>
                <ul class="mt-2 grid w-full gap-6 text-center md:grid-cols-3">
                  <li>
                    <button
                      onClick={handleModalCreate}
                      class="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:border-primary-500 focus:text-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:text-primary-500"
                    >
                      <FontAwesomeIcon
                        icon={faPlusCircle}
                        className="text-5xl"
                      />
                      <span>
                        Create
                        <br />
                        Collection
                      </span>
                    </button>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="piggy-collection"
                      name="collection"
                      value="piggy"
                      class="peer hidden"
                      onChange={(e) =>
                        setSelectedOptionCollection(e.target.value)
                      }
                      checked={selectedOptionCollection === 'piggy'}
                    />
                    <label
                      for="piggy-collection"
                      class="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-primary-500 peer-checked:text-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-primary-500"
                    >
                      <FontAwesomeIcon
                        icon={faPiggyBank}
                        className="text-5xl"
                      />
                      <span>
                        Piggy
                        <br />
                        Collection
                      </span>
                    </label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="snap-collection"
                      name="collection"
                      value="snap"
                      class="peer hidden"
                      onChange={(e) =>
                        setSelectedOptionCollection(e.target.value)
                      }
                      checked={selectedOptionCollection === 'snap'}
                    />
                    <label
                      for="snap-collection"
                      class="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-primary-500 peer-checked:text-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-primary-500"
                    >
                      <FontAwesomeIcon icon={faZ} className="text-5xl" />
                      <span>
                        Snap
                        <br />
                        Collection
                      </span>
                    </label>
                  </li>
                </ul>
              </div>
              {/* <div className="mt-4 w-full rounded-xl bg-white p-5">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">Enable minting</label>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </div>
                  <Switch
                    checked={enableMinting}
                    onChange={setEnableMinting}
                    className={`${
                      enableMinting ? 'bg-primary-500' : 'bg-primary-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        enableMinting ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                <p>
                  Buyer of your nft will charged gas fee if you unactive this
                  feature
                </p>
              </div> */}
              <div className="mt-4 w-full rounded-xl bg-white p-5">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="font-semibold">Unlockable content</label>
                    <FontAwesomeIcon icon={faCircleQuestion} />
                  </div>
                  <Switch
                    checked={enableUnlockable}
                    onChange={setEnableUnlockable}
                    className={`${
                      enableUnlockable ? 'bg-primary-500' : 'bg-primary-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        enableUnlockable ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                  </Switch>
                </div>
                <p>
                  Include unlockable content that can only be revealed by the
                  owner of the item.
                </p>
              </div>
              <div className="mt-4 w-full">
                <label>
                  <span className="font-semibold">Royalties</span>
                  <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white">
                    <input
                      type="number"
                      className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                      placeholder="0"
                      min={0}
                    />
                    <span className="pr-3 text-gray-500">
                      <FontAwesomeIcon icon={faPercent} />
                    </span>
                  </div>
                </label>
              </div>
              <div className="mt-4 w-full">
                <button
                  className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300"
                  type="submit"
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="sticky top-24 w-[415px] self-start overflow-auto pt-3">
          <h3 className="text-xl font-semibold">Preview</h3>
          <p>
            Input the NFT Data field to see the preview of how your NFT product
            looks like in the marketplace
          </p>
          <div className="flex flex-col gap-3 rounded-xl bg-white p-5">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected Preview"
                width={375}
                height={375}
                className="self-center rounded-lg"
                objectFit="contain"
              />
            ) : (
              <div className="flex h-[375px] w-[375px] items-center justify-center self-center rounded-lg bg-gray-200">
                <FontAwesomeIcon
                  icon={faImage}
                  className="bg-gray-200 text-6xl text-gray-400"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex w-1/3 items-center gap-2 rounded-lg bg-primary-50 p-2">
                <img
                  className="h-4 w-4 rounded-2xl"
                  src="https://fakeimg.pl/16x16"
                />
                <div className="truncate text-xs font-medium leading-none text-neutral-700">
                  {address}
                </div>
              </div>
              <FontAwesomeIcon icon={faEllipsis} className="text-primary-500" />
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">
                {name === '' ? 'Untitled' : name}
              </h4>
              <Ethereum className="text-gray-400" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <div className="font-semibold">Price</div>
                <div className="font-semibold text-primary-500">0.0 ETH</div>
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Highest bid</div>
                <div className="text-gray-500">No bids yet</div>
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
          </div>
        </div>
      </div>
      {modalCreate && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                              {chains.map((chain, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={chain.name}
                                >
                                  {({ selectedBlockchain }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedBlockchain
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {chain.name}
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
    </>
  );
}
