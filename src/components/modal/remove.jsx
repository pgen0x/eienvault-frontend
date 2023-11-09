import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faCheck,
  faChevronDown,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { formatEther, parseEther } from 'viem';
import {
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

export default function ModalRemove({
  isOpenModal,
  onClose,
  removeData,
  refreshData,
}) {
  const router = useRouter();
  const { data: walletClient } = useWalletClient({
    onError(error) {
      console.log('Error', error);
    },
  });
  const { address, isConnected } = useAccount();

  const [buyNativeHash, setBuyNativeHash] = useState();
  const [isLoadingBuyNativeModal, setIsloadingBuyNativeModal] = useState(false);
  const [isErrorBuyNative, setErrorBuyNative] = useState({
    isError: false,
    message: '',
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const { open } = useWeb3Modal();

  const {
    data: removeDataNative,
    isError: isErrorApp,
    isLoading: isLoadingBuyNative,
  } = useWaitForTransaction({
    hash: buyNativeHash,
  });

  function closeModal() {
    setErrorBuyNative({
      isError: false,
      message: '',
    });
    setIsloadingBuyNativeModal(false);
    setIsCompleted(false);
    onClose(false);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const BuyNative = async (marketId) => {
    if (!isConnected) {
      open();
      return;
    }
    setIsloadingBuyNativeModal(true);
    setErrorBuyNative({
      isError: false,
      message: '',
    });
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'removeListing',
        args: [marketId],
        account: address,
      });
      setBuyNativeHash(hash);
      return hash;
    } catch (error) {
      if (error.message.includes('User denied transaction signature')) {
        setErrorBuyNative({
          isError: true,
          message: 'Transaction rejected by the user.',
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
      if (buyNativeHash) {
        if (isLoadingBuyNative) {
          setIsloadingBuyNativeModal(true);
        }
        if (isErrorApp) {
          setErrorBuyNative({
            isError: true,
            message: isError,
          });
          setIsloadingBuyNativeModal(false);
        }

        if (removeDataNative) {
          await onSave();
          setIsloadingBuyNativeModal(false);
          setIsCompleted(true);
          refreshData();
        }
      }
    };

    fetchData();
  }, [buyNativeHash, removeDataNative, isLoadingBuyNative, isErrorApp]);

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
    removeData && (
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-gray-900 dark:bg-neutral-950 dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-between text-xl font-bold">
                      <div className="flex w-full justify-start">
                        Remove Listing
                      </div>
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-1 flex flex-col gap-3 pt-5">
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 dark:bg-neutral-900 p-3">
                        Check your wallet and do an approvement to continue
                        remove your listing
                      </div>

                      <ButtonPrimary
                        onClick={() => BuyNative(removeData?.marketId)}
                      >
                        Process
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-end text-xl font-bold text-neutral-800">
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
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
                          <span>The asset success to removed from sale listing!</span>
                          <span>check your profile to see the asset</span>
                        </div>
                        <button
                          onClick={() =>
                            router.push(
                              `/nft/${removeData?.collectionAddress}/${removeData?.tokenId}`,
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
