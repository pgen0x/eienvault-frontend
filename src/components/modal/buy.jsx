import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faCheck,
  faCheckCircle,
  faChevronDown,
  faCircleXmark,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { formatEther, formatUnits, parseEther, zeroAddress } from 'viem';
import {
  erc20ABI,
  useAccount,
  useBalance,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import Opensea from '@/assets/icon/opensea';
import LogoIcon from '@/assets/icon/logoicon';
import Logo from '../navbar/logoicon';
import LogoFooter from '@/assets/icon/logofooter';
import LogoIconMobile from '@/assets/icon/logoiconmobile';
import { NftContract } from '@/hooks/eth/Artifacts/NFT_Abi';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { getApprovedAddress } from '@/utils/getApprovedAddress';
import { useRouter } from 'next-nprogress-bar';
import ButtonPrimary from '../button/buttonPrimary';
import { useAuth } from '@/hooks/AuthContext';

export default function ModalBuy({
  isOpenModal,
  onClose,
  dataBuy,
  buyAction,
  onModalClose,
  refreshData,
}) {
  const router = useRouter();
  const { data: walletClient } = useWalletClient({
    onError(error) {
      
    },
  });
  const { address, isConnected } = useAccount();
  const { hasSigned, handleSign } = useAuth();

  const [buyNativeHash, setBuyNativeHash] = useState();
  const [isLoadingBuyNativeModal, setIsloadingBuyNativeModal] = useState(false);
  const [isErrorBuyNative, setErrorBuyNative] = useState({
    isError: false,
    message: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const { open } = useWeb3Modal();
  const [selectedAddress, setSelectedAddress] = useState(zeroAddress);
  const { data: balanceToken } = useBalance({
    address: address,
    token: selectedAddress,
    watch: true,
  });
  const [isLoadingModal, setIsLoadingModal] = useState({
    approve: false,
    buy: false,
  });
  const [isErrorApprove, setErrorApprove] = useState({
    isError: false,
    message: '',
  });
  const [approveHash, setApproveHash] = useState();

  const {
    data: dataBuyNative,
    isError: isErrorApp,
    isLoading: isLoadingBuyNative,
  } = useWaitForTransaction({
    hash: buyNativeHash,
  });

  const {
    data: dataApprove,
    isError: isErrorTokenApprove,
    isLoading: isLoadingApprove,
  } = useWaitForTransaction({
    hash: approveHash,
  });

  useEffect(() => {
    if (dataBuy != null) {
      setSelectedAddress(dataBuy?.paidWith);
    }

  }, [dataBuy]);

  const approve = async () => {
    setErrorApprove({
      isError: false,
      message: '',
    });

    try {
      const hash = await walletClient.writeContract({
        address: dataBuy?.paidWith,
        abi: erc20ABI,
        functionName: 'approve',
        args: [marketplaceABI.address, dataBuy?.price],
        account: address,
      });

      return hash;
    } catch (error) {
      setIsLoadingModal({
        approve: false,
        buy: false,
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

  function closeModal() {
    if (isErrorBuyNative.isError || isErrorApprove.isError || isCompleted || !isLoadingBuyNativeModal) {
      if (isErrorBuyNative.isError || isErrorApprove.isError) {
        setIsloadingBuyNativeModal(false);
        setErrorBuyNative({
          isError: false,
          message: '',
        });
        setErrorApprove({
          isError: false,
          message: '',
        });
      } else if (isCompleted) {
        refreshData();
        setIsloadingBuyNativeModal(false);
        setIsCompleted(false);
        onClose(true);
        onModalClose();
      } else {
        setErrorBuyNative({
          isError: false,
          message: '',
        });
        setIsloadingBuyNativeModal(false);
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

  const BuyNative = async () => {
    setErrorBuyNative({
      isError: false,
      message: '',
    });
    try {
      let hash;
      if(selectedAddress == zeroAddress){
        hash = await walletClient.writeContract({
          ...marketplaceABI,
          functionName: 'buyNative',
          args: [dataBuy?.marketId],
          account: address,
          value: dataBuy?.price,
        });
      }else{
        hash = await walletClient.writeContract({
          ...marketplaceABI,
          functionName: 'buyERC20',
          args: [dataBuy?.marketId],
          account: address,
        });
      }
      setBuyNativeHash(hash);
      return hash;
    } catch (error) {
      setIsLoadingModal({
        approve: false,
        buy: false,
      });
      
      if (error.message.includes('User rejected the request')) {
        setErrorBuyNative({
          isError: true,
          message: 'User rejected the request.',
        });
      } else {
        setErrorBuyNative({
          isError: true,
          message: error.message,
        });
      }
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

          await BuyNative();
        }
      }
    };

    fetchData();
  }, [approveHash, dataApprove, isLoadingApprove, isErrorTokenApprove]);

  useEffect(() => {
    const fetchData = async () => {
      if (buyNativeHash) {
        if (isLoadingBuyNative) {
          setIsloadingBuyNativeModal(true);
        }
        if (isErrorApp) {
          setErrorBuyNative({
            isError: true,
            message: isErrorApp,
          });
          setIsloadingBuyNativeModal(false);
        }

        if (dataBuyNative) {
          await onSave();
          setIsloadingBuyNativeModal(false);
          setIsCompleted(true);
        }
      }
    };

    fetchData();
  }, [buyNativeHash, dataBuyNative, isLoadingBuyNative, isErrorApp]);

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
      console.error('Error during data save:', error);
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

    setIsloadingBuyNativeModal(true);
    if(selectedAddress != zeroAddress){
      setIsLoadingModal({
        approve: true,
        buy: false,
      });
    }

    try {
      if(selectedAddress == zeroAddress){
        await BuyNative();
      }else{
        const hash = await approve();
        setApproveHash(hash);
      }
    } catch (error) {
      closeModal();
      console.error('Error onSubmit:', error);
    }
  };

  return (
    dataBuy && (
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
                      <div className="flex w-full justify-start">Buy</div>
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500 dark:text-white"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-1 text-gray-700dark:text-white flex flex-col gap-3 pt-5 text-gray-900 dark:text-gray-400">
                      <div className="flex w-full items-center justify-center gap-3">
                        {dataBuy.imageUri !== null ? (
                          <Image
                            className="h-full w-full rounded-2xl object-cover"
                            width={192}
                            height={100}
                            placeholder="blur"
                            alt={dataBuy?.name}
                            blurDataURL={dataBuy?.imageUri}
                            src={dataBuy?.imageUri}
                          />
                        ) : (
                          <div className="h-96 w-[192px] animate-pulse rounded-2xl bg-gray-300" />
                        )}
                        <div className="font w-full text-2xl text-gray-900 dark:text-gray-400">
                          #{dataBuy?.tokenId}
                          <br />
                          {dataBuy?.name}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg  p-1 text-white">
                              {(dataBuy?.ChainId === 666888 ||
                                dataBuy?.ChainId === 8668) && (
                                <HelaIcon className="h-6 w-6" />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl">
                                {dataBuy?.ChainSymbol}
                              </span>
                              <span className="text-xs">
                                {dataBuy?.ChainName}
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
                            {balanceToken?.formatted} {balanceToken?.symbol}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3 dark:bg-neutral-900">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span className="font-semibold">
                            {selectedAddress == zeroAddress
                              ? formatEther(dataBuy?.price || 0)
                              : formatUnits(
                                  dataBuy?.price || 0,
                                  balanceToken?.decimals,
                                )}{' '}
                            {selectedAddress == zeroAddress
                              ? dataBuy.ChainSymbol
                              : dataBuy?.TokenSymbol}
                          </span>
                        </div>

                        <hr />
                        <div className="flex justify-between">
                          <span>Total amount</span>
                          <span className="font-semibold">
                            {selectedAddress == zeroAddress
                              ? formatEther(dataBuy?.price || 0)
                              : formatUnits(
                                  dataBuy?.price || 0,
                                  balanceToken?.decimals,
                                )}{' '}
                            {selectedAddress == zeroAddress
                              ? dataBuy?.ChainSymbol
                              : dataBuy?.TokenSymbol}
                          </span>
                        </div>
                      </div>

                      <ButtonPrimary
                        onClick={() =>
                          onSubmit()
                        }
                      >
                        Buy Now
                      </ButtonPrimary>
                    </section>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
        <Transition appear show={isLoadingBuyNativeModal} as={Fragment}>
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950">
                    {(isErrorBuyNative.isError || isErrorApprove.isError) && (
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

                    <section className="step-2 flex flex-col gap-3 p-5 text-neutral-800 dark:text-white">
                      <div className="flex flex-col items-center gap-5">
                        {selectedAddress == zeroAddress ? (
                          <>
                            {isErrorBuyNative.isError ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className="h-8 w-8 text-primary-500"
                                />
                                <h3 className="text-center text-lg font-bold">
                                  Error
                                </h3>
                                <span className="text-primary-500">
                                  {isErrorBuyNative.message}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                                <h3 className="text-center text-lg font-bold">
                                  Loading
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
                                ) : isErrorBuyNative.isError ? (
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
                                 Purchased
                                </span>
                                <span>
                                  Authorize and sign a message to establish a
                                  fixed price for purchase
                                </span>
                                {isErrorBuyNative.isError && (
                                  <div className="text-primary-500">
                                    {isErrorBuyNative.message}
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
                          <span>The asset now is yours!</span>
                          <span>check your profile to see the asset</span>
                        </div>
                        <button
                          onClick={() =>
                            router.push(
                              `/nft/${dataBuy?.collectionAddress}/${dataBuy?.tokenId}`,
                            )
                          }
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500 hover:border-primary-400 hover:text-primary-400"
                        >
                          View asset
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
