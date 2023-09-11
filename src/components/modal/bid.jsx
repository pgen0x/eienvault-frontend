import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import {
  useAccount,
  useBalance,
  useWaitForTransaction,
} from 'wagmi';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';

export default function ModalBid({
  isOpenModal,
  onClose,
  auction,
  placeBid,
  onModalClose,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [bidHash, setBidHash] = useState();

  const { data } = useBalance({
    address: address,
  });
  const { open } = useWeb3Modal();
  const {
    data: dataBid,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: bidHash,
  });

  function closeModal() {
    reset();
    setIsSubmit(false);
    setIsCompleted(false);
    onClose(false);
    onModalClose();
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!isConnected) {
      open();
      return;
    }

    try {
      const hash = await placeBid(auction.marketId, parseEther(data.amount));
      setBidHash(hash);
    } catch (error) {
      closeModal();
      setIsSubmit(false);
      console.error('Error Place a Bid:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bidHash) {
        if (isLoading) {
          setIsSubmit(true);
        }
        if (isError) {
          setIsSubmit(false);
        }

        if (dataBid) {
          setIsSubmit(false);
          setIsCompleted(true);
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800">
                      <div className="flex w-full justify-start">Bid</div>
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-1 flex flex-col gap-3 pt-5 text-neutral-800">
                      <div className="flex w-full items-center justify-center gap-3">
                        {auction?.imageUri !== null ? (
                          <Image
                            className="h-full w-full rounded-2xl object-cover"
                            width={192}
                            height={100}
                            placeholder="blur"
                            blurDataURL={auction?.imageUri}
                            src={auction?.imageUri}
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
                      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3">
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
                                {auction.collectionData?.Chain.symbol}
                              </span>
                              <span className="text-xs">
                                {auction.collectionData?.Chain.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">
                              {truncateAddress(address)}
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
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3">
                        <div className="flex justify-between">
                          <span>Floor price</span>
                          <span className="font-semibold">
                            {auction.lowestBid.offer
                              ? formatEther(Number(auction?.lowestBid.offer))
                              : formatEther(
                                  Number(auction.collectionData?.floorPrice),
                                )}{' '}
                            {auction.collectionData?.Chain.symbol}
                          </span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Highest bid</span>
                          <span className="flex flex-col items-end font-semibold">
                            <span>
                              {formatEther(Number(auction?.highestBid.offer))}{' '}
                              {auction.collectionData?.Chain.symbol}
                            </span>
                            <span className="flex w-full items-center gap-1">
                              by{' '}
                              <Image
                                className="h-full w-full rounded-2xl "
                                width={15}
                                height={15}
                                placeholder="blur"
                                blurDataURL={`/uploads/collections/${auction.collectionData?.logo}`}
                                src={`/uploads/collections/${auction.collectionData?.logo}`}
                              />
                              {auction.collectionData?.User.username
                                ? auction.collectionData?.User.username
                                : truncateAddress4char(
                                    auction.collectionData?.userAddress,
                                  )}
                            </span>
                          </span>
                        </div>
                      </div>
                      <form>
                        <div className="flex flex-col">
                          <label className="block text-sm font-medium leading-6 text-gray-900">
                            Enter amount of your bid
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
                              <input
                                type="number"
                                name="amount"
                                id="amount"
                                autoComplete="amount"
                                className="flex-1 border-0 bg-transparent py-3 pr-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="0"
                                {...register('amount', {
                                  required: 'Amount is required.',
                                  validate: (value) => {
                                    if (
                                      parseFloat(value) <=
                                      formatEther(
                                        Number(auction?.highestBid.offer),
                                      )
                                    ) {
                                      return 'Price must be greater than highest bid';
                                    }
                                    return true; // Validation passed
                                  },
                                })}
                              />
                              <span className="flex select-none items-center pr-3 font-semibold text-gray-900">
                                {auction.collectionData?.Chain.symbol}
                              </span>
                            </div>
                          </div>
                          <div className="mt-1 text-sm text-primary-500">
                            <ErrorMessage errors={errors} name="amount" />
                          </div>
                        </div>
                      </form>

                      <button
                        className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white hover:bg-primary-300"
                        onClick={handleSubmit(onSubmit)}
                      >
                        Place a bid
                      </button>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800">
                      <div className="flex w-full justify-start">
                        Loading Your Bid
                      </div>
                    </Dialog.Title>

                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>

                          <span>
                            Sign your wallet to continue the transaction
                          </span>
                        </div>
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
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
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
                        <button className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500 hover:border-primary-400 hover:text-primary-400">
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
