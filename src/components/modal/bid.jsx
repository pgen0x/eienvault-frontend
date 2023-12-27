import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faCheck,
  faCheckCircle,
  faCircleXmark,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import {
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  zeroAddress,
} from 'viem';
import {
  erc20ABI,
  useAccount,
  useBalance,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import { useRouter } from 'next-nprogress-bar';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { useAuth } from '@/hooks/AuthContext';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalBid({
  isOpenModal,
  onClose,
  auction,
  placeBid,
  onModalClose,
  refreshData,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();
  const [isErrorBid, setErrorBid] = useState({
    isError: false,
    message: '',
  });
  const { hasSigned, handleSign } = useAuth();

  const [bidHash, setBidHash] = useState();
  const [approveHash, setApproveHash] = useState();
  const [selectedAddress, setSelectedAddress] = useState(zeroAddress);

  const { data } = useBalance({
    address: address,
    token: selectedAddress,
    watch: true,
  });
  const { data: walletClient } = useWalletClient({
    onError(error) {},
  });
  const { open } = useWeb3Modal();
  const {
    data: dataBid,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: bidHash,
  });

  const {
    data: dataApprove,
    isError: isErrorTokenApprove,
    isLoading: isLoadingApprove,
  } = useWaitForTransaction({
    hash: approveHash,
  });

  const [isLoadingModal, setIsLoadingModal] = useState({
    approve: false,
    buy: false,
  });
  const [isErrorApprove, setErrorApprove] = useState({
    isError: false,
    message: '',
  });

  useEffect(() => {
    console.log(auction);
    setSelectedAddress(auction?.paidWith);
  }, [auction]);

  function closeModal() {
    // reset();
    // setIsSubmit(false);
    // setIsCompleted(false);
    // onClose(false);
    // onModalClose();
    if (
      isErrorBid.isError ||
      isErrorApprove.isError ||
      isCompleted ||
      !isSubmit
    ) {
      if (isErrorBid.isError || isErrorApprove.isError) {
        setIsSubmit(false);
        setErrorBid({
          isError: false,
          message: '',
        });
        setErrorApprove({
          isError: false,
          message: '',
        });
      } else if (isCompleted) {
        refreshData();
        setIsSubmit(false);
        setIsCompleted(false);
        onClose(true);
        onModalClose();
      } else {
        reset();
        setErrorBid({
          isError: false,
          message: '',
        });
        setIsSubmit(false);
        setIsCompleted(false);
        onClose(false);
        onModalClose();
      }
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const Approve = async () => {
    setErrorApprove({
      isError: false,
      message: '',
    });

    try {
      const hash = await walletClient.writeContract({
        address: auction?.paidWith,
        abi: erc20ABI,
        functionName: 'approve',
        args: [
          marketplaceABI.address,
          parseUnits(watch('amount'), data.decimals),
        ],
        account: address,
      });

      return hash;
    } catch (error) {
      setIsLoadingModal({
        approve: false,
        bid: false,
      });
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

  const Bid = async () => {
    setErrorBid({
      isError: false,
      message: '',
    });

    try {
      let hash;
      if (selectedAddress == zeroAddress) {
        hash = await walletClient.writeContract({
          ...marketplaceABI,
          functionName: 'makeAnOfferNative',
          args: [auction?.marketId, parseEther(watch('amount'))],
          account: address,
          value: parseEther(watch('amount')),
        });
      } else {
        hash = await walletClient.writeContract({
          ...marketplaceABI,
          functionName: 'makeAnOfferERC20',
          args: [auction?.marketId, parseUnits(watch('amount'), data.decimals)],
          account: address,
        });
      }

      setBidHash(hash);
      return hash;
    } catch (error) {
      setIsLoadingModal({
        approve: false,
        bid: false,
      });

      if (error.message.includes('User denied transaction signature')) {
        setErrorBid({
          isError: true,
          message: 'Transaction rejected by the user.',
        });
      } else {
        setErrorBid({
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

    if (isConnected && !hasSigned) {
      handleSign();
      return;
    }

    setIsSubmit(true);
    setErrorBid({
      isError: false,
      message: '',
    });

    if (selectedAddress != zeroAddress) {
      setIsLoadingModal({
        approve: true,
        bid: false,
      });
    }

    try {
      if (selectedAddress == zeroAddress) {
        await Bid();
      } else {
        const hash = await Approve();
        setApproveHash(hash);
      }
    } catch (error) {
      closeModal();
      console.error('Error onSubmit:', error);
    }
  };

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
      } else {
        // Handle the error here
      }
    } catch (error) {
      // Handle any unexpected errors
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (approveHash) {
        if (isLoadingApprove) {
          setIsLoadingModal({
            approve: true,
            buy: false,
          });
        }
        if (isErrorTokenApprove) {
          setErrorApprove({
            isError: true,
            message: isErrorTokenApprove,
          });
        }

        if (dataApprove) {
          setIsLoadingModal({
            approve: false,
            buy: true,
          });

          await Bid();
        }
      }
    };

    fetchData();
  }, [approveHash, dataApprove, isLoadingApprove, isErrorTokenApprove]);

  useEffect(() => {
    const fetchData = async () => {
      if (bidHash) {
        if (isLoading) {
          setIsSubmit(true);
        }
        if (isError) {
          setErrorBid({
            isError: true,
            message: isError,
          });
          setIsSubmit(false);
        }

        if (dataBid) {
          await onSave();
          setIsSubmit(false);
          setIsCompleted(true);
          refreshData();
        }
      }
    };

    fetchData();
  }, [bidHash, dataBid, isLoading, isError]);

  return (
    Object.keys(auction).length > 0 && (
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950">
                    <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800 dark:text-white">
                      <div className="flex w-full justify-start">Bid</div>
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500 dark:text-white"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-1 flex flex-col gap-3 pt-5 text-neutral-800 dark:text-white">
                      <div className="flex w-full items-center justify-center gap-3">
                        {auction?.imageUri !== null ? (
                          <Image
                            className="h-full w-full rounded-2xl object-cover"
                            width={192}
                            height={100}
                            placeholder="blur"
                            blurDataURL={auction?.imageUri}
                            src={auction?.imageUri}
                            alt=""
                          />
                        ) : (
                          <div className="h-96 w-[192px] animate-pulse rounded-2xl bg-gray-300" />
                        )}
                        <div className="font w-full text-2xl text-gray-400">
                          #{auction?.tokenId}
                          <br />
                          {auction?.name}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg  p-1 text-white">
                              {(auction.collectionData?.chainId === 666888 ||
                                auction.collectionData?.chainId === 8668) && (
                                <HelaIcon className="h-6 w-6" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl">
                                {auction.collectionData?.Chain?.symbol}
                              </span>
                              <span className="text-xs">
                                {auction.collectionData?.Chain.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">
                              {address
                                ? truncateAddress(address)
                                : 'Please Login'}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Your wallet balance</span>
                          <span>
                            {data?.formatted} {data?.symbol}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3 dark:bg-neutral-900">
                        <div className="flex justify-between">
                          <span>
                            {auction.lowestBid !== '0'
                              ? 'Lowest Bid'
                              : 'Floor price'}
                          </span>
                          <span className="font-semibold">
                            {auction.lowestBid !== '0'
                              ? selectedAddress === zeroAddress
                                ? formatEther(auction.lowestBid)
                                : formatUnits(auction.price, data.decimals)
                              : selectedAddress === zeroAddress
                              ? formatEther(auction.price)
                              : formatUnits(auction.price, data.decimals)}{' '}
                            {data?.symbol}
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Highest bid</span>
                          <span className="flex flex-col items-end font-semibold">
                            <span>
                              {selectedAddress === zeroAddress
                                ? formatEther(auction?.highestBid?.highestBid)
                                : formatUnits(
                                    auction?.highestBid?.highestBid,
                                    data.decimals,
                                  )}{' '}
                              {data?.symbol}
                            </span>
                            {auction?.highestBid?.highestBidder && (
                              <span className="flex w-full items-center gap-1">
                                by{' '}
                                {truncateAddress4char(
                                  auction?.highestBid?.highestBidder,
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      <form>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400">
                            Enter amount of your bid
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-full bg-white text-gray-900 shadow-sm ring-0 ring-inset focus-within:ring-0 dark:bg-neutral-900 dark:text-white">
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                autoComplete="amount"
                                className="flex-1 border-0 bg-transparent p-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="0"
                                {...register('amount', {
                                  required: 'Amount is required.',
                                  validate: (value) => {
                                    if (
                                      auction?.highestBid?.highestBid !== '0'
                                    ) {
                                      const price =
                                        selectedAddress === zeroAddress
                                          ? formatEther(
                                              auction?.highestBid?.highestBid,
                                            )
                                          : formatUnits(
                                              auction?.highestBid?.highestBid,
                                              data.decimals,
                                            );
                                      if (parseFloat(value) <= price) {
                                        return 'Price must be greater than highest bid';
                                      }
                                    } else {
                                      const price =
                                        selectedAddress === zeroAddress
                                          ? formatEther(auction.price)
                                          : formatUnits(
                                              auction.price,
                                              data.decimals,
                                            );
                                      if (parseFloat(value) <= price) {
                                        return 'Price must be greater than floor price';
                                      }
                                    }
                                    return true; // Validation passed
                                  },
                                })}
                              />
                              <span className="flex select-none items-center pr-3 font-semibold">
                                {data?.symbol}
                              </span>
                            </div>
                          </div>
                          <div className="mt-1 text-sm text-primary-500">
                            <ErrorMessage errors={errors} name="amount" />
                          </div>
                        </div>
                      </form>

                      <ButtonPrimary onClick={handleSubmit(onSubmit)}>
                        Place a bid
                      </ButtonPrimary>
                    </section>
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

            <div className="fixed inset-0 overflow-y-auto text-neutral-800">
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                    {(isError.isError || isErrorApprove.isError) && (
                      <Dialog.Title className="flex justify-end text-xl font-bold text-neutral-800 dark:text-white">
                        <div className="flex w-full justify-end">
                          <button
                            className="text-primary-500 dark:text-white"
                            onClick={closeModal}
                          >
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                        </div>
                      </Dialog.Title>
                    )}
                    {/* <Dialog.Title className="flex justify-between text-xl font-bold">
                      <div className="flex w-full justify-start">
                        Loading Your Bid
                      </div>
                    </Dialog.Title> */}

                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        {selectedAddress == zeroAddress ? (
                          <>
                            {isErrorBid.isError ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className="h-8 w-8 text-primary-500"
                                />
                                <h3 className="text-center text-lg font-bold">
                                  Error
                                </h3>
                                <span className="text-primary-500">
                                  {isErrorBid.message}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                                <h3 className="text-center text-lg font-bold">
                                  Loading Your Bid
                                </h3>
                                <span>
                                  Sign your wallet to continue the transaction
                                </span>
                              </>
                            )}
                          </>
                        ) : (
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
                                <span className="text-lg font-semibold">
                                  Approve
                                </span>
                                <span>
                                  Check your wallet and do an approvement to
                                  continue listing your nft
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
                                {isLoadingModal.buy ? (
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
                                ) : isErrorBid.isError ? (
                                  <FontAwesomeIcon
                                    icon={faCircleXmark}
                                    className="h-7 w-7 text-primary-500"
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
                                  Bid
                                </span>
                                <span>
                                  Authorize and sign a message to establish a
                                  fixed price for bidding
                                </span>
                                {isErrorBid.isError && (
                                  <div className="text-primary-500">
                                    {isErrorBid.message}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </section>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isCompleted} as={Fragment}>
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

            <div className="fixed inset-0 overflow-y-auto text-neutral-800">
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all">
                    <section className="step-2 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100 p-5">
                      <div className="mt-5 flex flex-col items-center gap-5">
                        <span className="absolute -mt-4 ml-4 h-32 w-32 rounded-full border bg-green-200"></span>
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border-[10px] border-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-6xl font-bold text-green-400"
                          />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-xl font-bold">Congratulations</h3>
                          <span>
                            Your bid has successfully placed!, check your
                            bidding history by clicking the link below
                          </span>
                        </div>
                        <button
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500 hover:border-primary-400 hover:text-primary-400"
                          onClick={() => router.push('/orders?page=bidmade')}
                        >
                          View Bid
                        </button>
                      </div>
                    </section>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  );
}
