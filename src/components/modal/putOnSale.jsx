import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faCheck,
  faCheckCircle,
  faCircleXmark,
  faHourglass,
  faMoneyBill,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { formatEther, parseEther, zeroAddress } from 'viem';
import {
  useAccount,
  useBalance,
  useNetwork,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { NftContract } from '@/hooks/eth/Artifacts/NFT_Abi';
import moment from 'moment';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalPutOnSale({
  isOpenModal,
  onClose,
  putonsaledata,
  onModalClose,
  refreshData,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { chain } = useNetwork();
  const [selectedOptionMarket, setSelectedOptionMarket] = useState('fixed');
  const [customValueReleaseDate, setCustomValueReleaseDate] = useState('');
  const [selectedOptionDate, setSelectedOptionDate] = useState('1 Day');
  const [selectedOptionReleaseDate, setSelectedOptionReleaseDate] =
    useState('1 Day');
  const [customValueDate, setCustomValueDate] = useState('');
  const [isLoadingModal, setIsLoadingModal] = useState({
    approve: false,
    putonsale: false,
  });
  const [isErrorApprove, setErrorApprove] = useState({
    isError: false,
    message: '',
  });
  const [isErrorPutonsale, setErrorPutonsale] = useState({
    isError: false,
    message: '',
  });
  const [approveHash, setApproveHash] = useState();
  const [putOnSaleHash, setPutOnSaleHash] = useState();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompletedHash, setIsCompletedHash] = useState(false);

  useEffect(() => {
    // Calculate the date 1 day from now using Moment.js
    const currentDate = moment();
    const nextDay = moment(currentDate).add(1, 'days');

    // Format the calculated date in 'YYYY-MM-DDTHH:mm' format
    const formattedDate = nextDay.format('YYYY-MM-DDTHH:mm');

    // Set the formatted date as the default value
    setCustomValueDate(formattedDate);
  }, []);

  useEffect(() => {
    // Calculate the date 1 day from now using Moment.js
    const currentDate = moment();
    const nextDay = moment(currentDate).add(1, 'days');

    // Format the calculated date in 'YYYY-MM-DDTHH:mm' format
    const formattedDate = nextDay.format('YYYY-MM-DDTHH:mm');

    // Set the formatted date as the default value
    setCustomValueReleaseDate(formattedDate);
  }, []);

  const {
    data: dataApprove,
    isError: isErrorApp,
    isLoading: isLoadingApprove,
  } = useWaitForTransaction({
    hash: approveHash,
  });
  const {
    data: dataPutonsale,
    isError: isErrorPutsale,
    isLoading: isLoadingPutonsale,
  } = useWaitForTransaction({
    hash: putOnSaleHash,
  });

  const { open } = useWeb3Modal();

  function closeModal() {
    onClose(false);
    onModalClose();
  }

  function closeModalProcessing() {
    setErrorApprove({
      isError: false,
      message: '',
    });
    setErrorPutonsale({
      isError: false,
      message: '',
    });
    setIsSubmit(false);
    setIsProcessing(false);
    closeModal();
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const tokenId = putonsaledata.tokenId;
  const collectionAddress = putonsaledata.collectionAddress;

  const getListingPrice = async () => {
    const ListingPrice = await publicClient.readContract({
      ...marketplaceABI,
      functionName: 'listingPrice',
    });
    return ListingPrice;
  };

  const approve = async () => {
    try {
      const hash = await walletClient.writeContract({
        address: collectionAddress,
        abi: NftContract.abi,
        functionName: 'approve',
        args: [marketplaceABI.address, tokenId],
        account: address,
      });

      return hash;
    } catch (error) {
      setIsLoadingModal({
        approve: false,
        putonsale: false,
      });
      setIsProcessing(false);
      if (error.message.includes('User denied transaction signature')) {
        setErrorApprove({
          isError: true,
          message: 'Transaction rejected by the user.',
        });
      } else {
        setErrorApprove({
          isError: true,
          message: error.message,
        });
      }
    }
  };

  const price = watch('price');

  const putOnSale = async () => {
    const listingPrice = await getListingPrice();
    const releaseTime =
      selectedOptionMarket === 'fixed'
        ? moment().unix()
        : moment(customValueReleaseDate).unix();
    const isAuction = selectedOptionMarket === 'fixed' ? false : true;
    const parsePrice = parseEther(price);

    console.log(listingPrice, 'listingPrice');
    console.log(releaseTime, 'releaseTime');
    console.log(isAuction, 'isAuction');
    console.log(moment(customValueDate).unix(), 'customValueDate');
    console.log(parsePrice, 'parsePrice');
    console.log(collectionAddress, 'collectionAddress');
    console.log(address, 'address');

    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'list',
        args: [
          isAuction,
          collectionAddress,
          zeroAddress,
          tokenId,
          parsePrice,
          releaseTime,
          moment(customValueDate).unix(),
        ],
        account: address,
        value: listingPrice,
      });
      setPutOnSaleHash(hash);
      return hash;
    } catch (error) {
      console.error('Error Listing', error);
      setIsProcessing(false);
      setIsLoadingModal({
        approve: false,
        putonsale: false,
      });
      if (error.message.includes('User denied transaction signature')) {
        setErrorPutonsale({
          isError: true,
          message: 'Transaction rejected by the user.',
        });
      } else {
        setErrorPutonsale({
          isError: true,
          message: error.message,
        });
      }
    }
  };

  const onSubmit = async () => {
    if (!isConnected) {
      open();
      return;
    }

    setIsSubmit(true);
    setIsProcessing(true);
    setIsLoadingModal({
      approve: true,
      putonsale: false,
    });
    closeModal();
    try {
      const hash = await approve();
      setApproveHash(hash);
    } catch (error) {
      closeModal();
      setIsSubmit(false);
      setIsProcessing(false);
      console.error('Error onSubmit:', error);
    }
  };

  const handleReleaseDateSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionReleaseDate(selectedValue);

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
      setCustomValueReleaseDate(formattedDate);
    }
  };

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
      if (approveHash) {
        if (isLoadingApprove) {
          setIsLoadingModal({
            approve: true,
            putonsale: false,
          });
        }
        if (isErrorApp) {
          setErrorApprove({
            isError: true,
            message: isErrorApp,
          });
        }

        if (dataApprove) {
          setIsLoadingModal({
            approve: false,
            putonsale: true,
          });
          await putOnSale();
        }
      }
    };

    fetchData();
  }, [approveHash, dataApprove, isLoadingApprove, isErrorApp]);

  useEffect(() => {
    const fetchData = async () => {
      if (putOnSaleHash) {
        if (isLoadingPutonsale) {
          setIsLoadingModal({
            approve: false,
            putonsale: true,
          });
        }
        if (isErrorPutsale) {
          setErrorPutonsale({
            isError: true,
            message: isErrorPutsale,
          });
        }

        if (dataPutonsale) {
          await onSave();
          setIsLoadingModal({
            approve: false,
            putonsale: false,
          });
          setIsCompletedHash(true);
          setIsProcessing(false);
          refreshData();
        }
      }
    };

    fetchData();
  }, [putOnSaleHash, dataPutonsale, isErrorPutsale, isLoadingPutonsale]);

  const onSave = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/market/updatemarketevent`,
        options,
      );

      if (response.ok) {
        // Data was saved successfully
        console.log('Data saved successfully.');
      } else {
        // Handle the error here
        console.error('Data saved failed:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during data save:', error);
    }
  };

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-zinc-800">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Listing Your NFT
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col gap-2 overflow-y-auto">
                          <form>
                            <div className="w-full">
                              <div className="mt-2 w-full">
                                <p>
                                  Select one of the selling method option below
                                </p>
                                <ul className="mt-2 grid w-full gap-6 text-center md:grid-cols-2">
                                  <li>
                                    <input
                                      type="radio"
                                      id="fixed-method"
                                      name="method"
                                      value="fixed"
                                      className="peer hidden"
                                      onChange={(e) =>
                                        setSelectedOptionMarket(e.target.value)
                                      }
                                      checked={selectedOptionMarket === 'fixed'}
                                      required
                                    />
                                    <label
                                      htmlFor="fixed-method"
                                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-neutral-800 dark:border-neutral-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-neutral-900 dark:hover:text-gray-300 ${
                                        selectedOptionMarket === 'fixed'
                                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                                          : ''
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
                                      id="auction-method"
                                      name="method"
                                      value="auction"
                                      className="peer hidden"
                                      onChange={(e) =>
                                        setSelectedOptionMarket(e.target.value)
                                      }
                                      checked={
                                        selectedOptionMarket === 'auction'
                                      }
                                    />
                                    <label
                                      htmlFor="auction-method"
                                      className={`flex w-full cursor-pointer flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-100 hover:text-neutral-800 dark:border-neutral-900 dark:bg-zinc-800 dark:text-gray-400 dark:hover:bg-neutral-900 dark:hover:text-gray-300 ${
                                        selectedOptionMarket === 'auction'
                                          ? 'peer-checked:border-primary-500 peer-checked:text-primary-500'
                                          : ''
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
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Price
                                </label>
                                <p>
                                  Enter price to allow users instantly purchase
                                  your NFT
                                </p>
                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="number"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="0"
                                    min="0"
                                    {...register('price', {
                                      required: 'Price is required.',
                                      validate: (value) =>
                                        parseFloat(value) > 0 ||
                                        'Price must be greater than 0',
                                    })}
                                  />
                                  <span className="pr-3 text-gray-500">
                                    {chain?.id === 8668 ||
                                    chain?.id === 666888 ? (
                                      <HelaIcon className="h-5 w-5" />
                                    ) : (
                                      <Ethereum />
                                    )}
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
                                    {watch('price')}{' '}
                                    {chain?.nativeCurrency.symbol}
                                  </span>
                                </div>
                                <div className="flex w-full justify-between">
                                  <span>You will receive</span>
                                  <span className="font-semibold">
                                    {watch('price')}{' '}
                                    {chain?.nativeCurrency.symbol}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {selectedOptionMarket === 'auction' && (
                              <>
                                <div className="mt-4 flex w-full flex-col rounded-xl bg-white dark:bg-zinc-800">
                                  <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    <span className="text-semantic-red-500">
                                      *
                                    </span>{' '}
                                    Release Date
                                  </label>
                                  <div className="mt-2 flex gap-2">
                                    <input
                                      type="datetime-local"
                                      name="release_date"
                                      id="release_date"
                                      autoComplete="release_date"
                                      className="flex-1 rounded-xl border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:text-sm sm:leading-6"
                                      value={customValueReleaseDate}
                                      disabled={
                                        selectedOptionReleaseDate !== 'Custom'
                                      }
                                      onChange={(e) =>
                                        setCustomValueReleaseDate(
                                          e.target.value,
                                        )
                                      }
                                    />
                                    <select
                                      className="rounded-3xl border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md sm:text-sm sm:leading-6"
                                      onChange={handleReleaseDateSelectChange}
                                      value={selectedOptionReleaseDate}
                                    >
                                      <option>1 Day</option>
                                      <option>1 Week</option>
                                      <option>1 Month</option>
                                      <option>Custom</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  {!customValueReleaseDate &&
                                    'Release date is required'}
                                </div>
                              </>
                            )}
                            <div className="mt-4 flex w-full flex-col rounded-xl bg-white dark:bg-zinc-800">
                              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                <span className="text-semantic-red-500">*</span>{' '}
                                Date of listing expiration
                              </label>
                              <div className="mt-2 flex gap-2">
                                <input
                                  type="datetime-local"
                                  name="duration_date"
                                  id="duration_date"
                                  autoComplete="duration_date"
                                  className="flex-1 rounded-full border-0 bg-gray-50 dark:bg-neutral-900 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-neutral-700 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:text-sm sm:leading-6"
                                  value={customValueDate}
                                  disabled={selectedOptionDate !== 'Custom'}
                                  onChange={(e) =>
                                    setCustomValueDate(e.target.value)
                                  }
                                />
                                <select
                                  className="rounded-full border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md sm:text-sm sm:leading-6"
                                  onChange={handleDateSelectChange}
                                  value={selectedOptionDate}
                                >
                                  <option>1 Day</option>
                                  <option>1 Week</option>
                                  <option>1 Month</option>
                                  <option>Custom</option>
                                </select>
                              </div>
                            </div>
                            <div className="mt-1 text-sm font-semibold text-primary-500">
                              {!customValueDate && 'Duration date is required'}
                            </div>

                            <button
                              onClick={handleSubmit(onSubmit)}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
                              Put On Sale
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isSubmit} as={Fragment}>
        <Dialog as="div" className="relative z-[80]" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Just a few steps left
                  </Dialog.Title>
                  <div className="mx-5 flex flex-col text-sm text-gray-900 dark:text-white">
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.approve ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorApprove.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-green-500"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">Approve</span>
                        <span>
                          Check your wallet and do an approvement to continue
                          listing your nft
                        </span>
                        {isErrorApprove.isError && (
                          <div className="text-primary-500">
                            {isErrorApprove.message}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.putonsale ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorPutonsale.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : isCompletedHash ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-green-400"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-gray-400"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">
                          Put on sale
                        </span>
                        <span>
                          Authorize and sign a message to establish a fixed
                          price for sale
                        </span>
                        {isErrorPutonsale.isError && (
                          <div className="text-primary-500">
                            {isErrorPutonsale.message.error}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 inline-flex ">
                      <ButtonPrimary
                        type="button"
                        onClick={closeModalProcessing}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Please wait ...' : 'Completed'}
                      </ButtonPrimary>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
