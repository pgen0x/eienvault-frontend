'use client';
import Ethereum from '@/assets/icon/ethereum';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import {
  faCartPlus,
  faChevronDown,
  faClose,
  faEllipsis,
  faHourglass,
  faImage,
  faMoneyBill,
  faPercent,
  faPiggyBank,
  faPlusCircle,
  faUser,
  faUsers,
  faZ,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Switch } from '@headlessui/react';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAccount, useNetwork } from 'wagmi';
import moment from 'moment';
import { ErrorMessage } from '@hookform/error-message';
import HelaIcon from '@/assets/icon/hela';
import ModalUploadDFile from '@/components/modal/uploadFile';
import ModalCreateCollection from '@/components/modal/createCollections';
import { useWeb3Modal } from '@web3modal/react';
import { useAuth } from '@/hooks/AuthContext';
import Loading from './loading';

export default function Create({ chains }) {
  const { token } = useAuth();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const [selectedChain, setSelectedChain] = useState({
    chainId: chain.id || 666888,
    symbol: chain.nativeCurrency.symbol || 'HLUSD',
  });
  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain.id || 666888,
    symbol: chain.nativeCurrency.symbol || 'HLUSD',
  });
  const [enableUnlockable, setEnableUnlockable] = useState(true);
  const [name, setName] = useState('Untitled');
  const [selectedOptionMarket, setSelectedOptionMarket] = useState('fixed');
  const [selectedOptionEdition, setSelectedOptionEdition] = useState('single');
  const [selectedOptionCollection, setSelectedOptionCollection] =
    useState('snap');
  const { address } = useAccount();
  const [selectedOptionDate, setSelectedOptionDate] = useState('1 Day');
  const [customValueDate, setCustomValueDate] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [dataCollections, setDataCollections] = useState([]);
  const [isLoadingCollection, setIsLoadingCollection] = useState(true);
  const [isLoading, setIsLoading] = useState({
    ipfs: false,
    mint: false,
    approve: false,
    putonsale: false,
  });
  const [isErrorIPFS, setErrorIPFS] = useState({
    isError: false,
    message: '',
  });
  const [isErrorMint, setErrorMint] = useState({
    isError: false,
    message: '',
  });
  const [isErrorApprove, setErrorApprove] = useState({
    isError: false,
    message: '',
  });
  const [isErrorPutonsale, setErrorPutonsale] = useState({
    isError: false,
    message: '',
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const selectedImage = watch('file');

  useEffect(() => {
    // Calculate the date 1 day from now using Moment.js
    const currentDate = moment();
    const nextDay = moment(currentDate).add(1, 'days');

    // Format the calculated date in 'YYYY-MM-DDTHH:mm' format
    const formattedDate = nextDay.format('YYYY-MM-DDTHH:mm');

    // Set the formatted date as the default value
    setCustomValueDate(formattedDate);
  }, []);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/collections`,
          {
            cache: 'force-cache',
            headers: {
              'Content-Type': 'application/json',
              'API-Key': process.env.DATA_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!res.ok) {
          console.error('Fetch failed:', res);
          throw new Error('Network response was not ok');
        }

        const responseData = await res.json();
        setDataCollections(responseData);
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsLoadingCollection(false); // Set isLoading to false after fetching data
      }
    };

    fetchData();
  }, [token]);

  const handleModalCreate = () => {
    if (!token) {
      open();
    } else {
      setIsCreateCollection(true);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);
    try {
      setIsLoading({
        ipfs: true,
        mint: false,
        approve: false,
        putonsale: false,
      });
      const form = new FormData();
      // form.append('file', selectedImage);
      form.append('cidVersion', '0');
      form.append('wrapWithDirectory', 'false');
      const pinataMetadata = JSON.stringify({
        name: data.name,
      });
      form.append('pinataMetadata', pinataMetadata);

      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${process.env.NEXT_PUBLIC_JWTPINATA}`,
        },
      };

      options.body = form;

      const res = await fetch(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        options,
      );

      // Handle the error
      if (!res.ok) {
        const errorMessage = await res.text();
        const errorObject = JSON.parse(errorMessage);
        setErrorIPFS({
          isError: true,
          message: errorObject,
        });
        throw new Error(errorMessage);
      } else {
        const response = await res.json();
        setIsLoading({
          ipfs: false,
          mint: true,
          approve: false,
          putonsale: false,
        });
      }
    } catch (e) {
      // Handle errors here
      console.error(e);
      setIsLoading({
        ipfs: false,
        mint: false,
        approve: false,
        putonsale: false,
      });
    }
  };

  const closeModal = () => {
    setIsSubmit(false);
    setIsCreateCollection(false);
    setErrorIPFS({ isError: false, message: '' });
  };

  return (
    <>
      <div className="my-5 flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-center gap-5 p-4 text-gray-900">
        <div className="w-full flex flex-col">
          <h2 className="text-2xl font-semibold">Create New NFT</h2>
          <p>
            <span className="text-semantic-red-500">*</span> requires to be
            filled
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <form>
              <div className="w-full">
                <label className="font-semibold">Blockchain</label>
                <Listbox
                  value={selectedChain}
                  onChange={setSelectedChain}
                  className="mt-2"
                >
                  <div className="relative z-20">
                    <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                        {selectedChain.chainId === 1 ||
                        selectedChain.chainId === 11155111 ? (
                          <Ethereum />
                        ) : selectedChain.chainId === 8668 ||
                          selectedChain.chainId === 666888 ? (
                          <HelaIcon className="h-5 w-5" />
                        ) : (
                          ''
                        )}
                      </span>
                      <span className="block truncate pl-6 text-gray-600">
                        {
                          chains.find(
                            (chain) => chain.chainId === selectedChain.chainId,
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
                          value={chain}
                        >
                          {({ selectedChain }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selectedChain ? 'font-medium' : 'font-normal'
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
                <label className="mt-2 font-semibold">
                  <span className="text-semantic-red-500">*</span> Upload your
                  item
                </label>
                <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-5 text-center">
                  {selectedImage && selectedImage.length > 0 ? (
                    <>
                      <button
                        className="absolute right-1.5 top-1.5 h-10 w-10 rounded-full text-rose-500 hover:bg-primary-50"
                        onClick={(e) => {
                          e.preventDefault();
                          setValue('file', null);
                        }}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </button>
                      <Image
                        src={URL.createObjectURL(getValues('file')[0])}
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
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setValue('file', file); // Set the value of 'file' field using setValue
                          }}
                          {...register('file', {
                            required: 'File is required.',
                          })}
                        />
                      </label>
                      {/* <div
                        className={`${
                          selectedImage !== null ? 'hidden' : 'block'
                        } mt-1 font-semibold text-sm text-primary-500`}
                      >
                        File is required
                      </div> */}
                    </>
                  )}
                </div>
                <div className="mt-1 text-sm font-semibold text-primary-500">
                  <ErrorMessage errors={errors} name="file" />
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
                <div className="mt-1 text-sm font-semibold text-primary-500">
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
                <ul className="mt-2 grid w-full gap-6 text-center md:grid-cols-2">
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
                    {...register('price', {
                      required: 'Price is required.',
                      validate: (value) =>
                        parseFloat(value) > 0 || 'Price must be greater than 0',
                    })}
                  />
                  <span className="pr-3 text-gray-500">
                    <Ethereum />
                  </span>
                </div>
                <div className="mt-1 text-sm font-semibold text-primary-500">
                  <ErrorMessage errors={errors} name="price" />
                </div>
              </div>
              <div className="mt-2 w-full px-2">
                <div className="flex w-full justify-between">
                  <span>Price</span>
                  <span className="font-semibold">
                    {watch('price')} {selectedChain.symbol}
                  </span>
                </div>
                {/* <div className="mb-2 flex w-full justify-between border-b-2 pb-2">
                  <span>Snap charge fee</span>
                  <span className="font-semibold">0%</span>
                </div> */}
                <div className="flex w-full justify-between">
                  <span>You will receive</span>
                  <span className="font-semibold">
                    {watch('price')} {selectedChain.symbol}
                  </span>
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
                    autoComplete="duration_date"
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

              <div className="mt-1 text-sm font-semibold text-primary-500">
                {!customValueDate && 'Duration date is required'}
              </div>

              <div className="mt-4 w-full">
                <label className="font-semibold">
                  <span className="text-semantic-red-500">*</span> Choose
                  collection
                </label>
                <ul className="mt-2 grid w-full gap-x-6 gap-y-2 text-center md:grid-cols-3">
                  <li>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleModalCreate();
                      }}
                      className="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 focus:border-primary-500 focus:text-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:text-primary-500"
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
                  {isLoadingCollection ? (
                    <Loading />
                  ) : (
                    dataCollections.length > 0 &&
                    dataCollections.map((collection) => (
                      <li key={collection.id}>
                        <input
                          type="radio"
                          name={collection.name}
                          value={collection.name}
                          className="peer hidden"
                          onChange={(e) =>
                            setSelectedOptionCollection(e.target.value)
                          }
                          checked={selectedOptionCollection === 'piggy'}
                        />
                        <label
                          htmlFor="piggy-collection"
                          className="flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-primary-500 peer-checked:text-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-primary-500"
                        >
                          <FontAwesomeIcon
                            icon={faPiggyBank}
                            className="text-5xl"
                          />
                          <span>
                            {collection.name}
                            <br />
                            Collection
                          </span>
                        </label>
                      </li>
                    ))
                  )}
                </ul>
                {dataCollections.length <= 0 && (
                  <div className="mt-1 text-sm font-semibold text-primary-500">
                    You need to create collections before you can create nfts
                  </div>
                )}
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
                  onClick={handleSubmit(onSubmit)}
                >
                  Create Item
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="sticky top-24 w-full self-start pt-3">
          <h3 className="text-xl font-semibold">Preview</h3>
          <p className="pb-5 pt-1">
            Input the NFT Data field to see the preview of how your NFT product
            looks like in the marketplace
          </p>
          <div className="flex flex-col gap-3 rounded-xl bg-white p-5">
            {selectedImage && selectedImage.length > 0 ? (
              <Image
                src={URL.createObjectURL(getValues('file')[0])}
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
      <ModalUploadDFile
        isOpenModal={isSubmit}
        onClose={closeModal}
        isLoading={isLoading}
        isErrorIPFS={isErrorIPFS}
        isErrorMint={isErrorMint}
        isErrorApprove={isErrorApprove}
        isErrorPutonsale={isErrorPutonsale}
        onModalClose={closeModal}
      />
      <ModalCreateCollection
        chains={chains}
        isOpenModal={isCreateCollection}
        selectedChain={selectedBlockchain}
        setSelectedChain={setSelectedBlockchain}
        onClose={closeModal}
        onModalClose={closeModal}
      />
    </>
  );
}
