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

export default function ModalBuy({
  isOpenModal,
  onClose,
  dataBuy,
  buyAction,
  onModalClose,
}) {
  const router = useRouter();
  const { data: walletClient } = useWalletClient({
    onError(error) {
      console.log('Error', error);
    },
    onSettled(data, error) {
      console.log('Settled', data, error);
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
    data: dataBuyNative,
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

  const BuyNative = async (marketId, price) => {
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
        functionName: 'buyNative',
        args: [marketId],
        account: address,
        value: price,
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

        if (dataBuyNative) {
          setIsloadingBuyNativeModal(false);
          setIsCompleted(true);
        }
      }
    };

    fetchData();
  }, [buyNativeHash, dataBuyNative, isLoadingBuyNative, isErrorApp]);

  // TODO: Integration buy to API
  const onSave = async () => {
    try {
      const payload = {
        collectionAddress: 'any',
        tokenId: 'any',
        bidAmount: 'any',
        chainId: '',
        marketId: '',
        txHash: '',
      };

      const options = {
        method: 'POST',
        body: JSON.stringify(payload), // Convert the payload to JSON
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/create`,
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

  console.log(dataBuy);

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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800">
                      <div className="flex w-full justify-start">Buy</div>
                      <div className="flex w-full justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    </Dialog.Title>

                    <section className="step-1 flex flex-col gap-3 pt-5 text-gray-700">
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
                        <div className="font w-full text-2xl text-gray-400">
                          #{dataBuy?.tokenId}
                          <br />
                          Worriness
                        </div>
                      </div>
                      <div className="flex justify-between rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                          <LogoIconMobile />
                          <span>EienVault</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">
                            {dataBuy?.price && formatEther(dataBuy?.price)}{' '}
                            {dataBuy?.ChainSymbol}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg p-2 text-white">
                            {(dataBuy?.ChainSymbol === 666888 ||
                              dataBuy?.ChainSymbol === 8668) && (
                              <HelaIcon className="h-6 w-6" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl">
                              {dataBuy.ChainSymbol}
                            </span>
                            <span className="text-xs">{dataBuy.ChainName}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">
                            {address
                              ? truncateAddress(address)
                              : 'Please login'}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span className="font-semibold">
                            {dataBuy?.price && formatEther(dataBuy?.price)}{' '}
                            {dataBuy.ChainSymbol}
                          </span>
                        </div>

                        <hr />
                        <div className="flex justify-between">
                          <span>Total amount</span>
                          <span className="font-semibold">
                            {dataBuy?.price && formatEther(dataBuy?.price)}{' '}
                            {dataBuy.ChainSymbol}
                          </span>
                        </div>
                      </div>

                      <button
                        className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                        onClick={() =>
                          BuyNative(dataBuy.marketId, dataBuy.price)
                        }
                      >
                        Buy Now
                      </button>
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
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
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
                          onClick={() => router.push('/profile?view=owned')}
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
