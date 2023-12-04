import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import {
  faCheckCircle,
  faCircleXmark,
  faHourglass,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
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

export default function ModalRescueERC721({
  isOpenModal,
  onClose,
  onModalClose,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isError, setError] = useState({
    isError: false,
    message: '',
  });

  const { open } = useWeb3Modal();

  function closeModal() {
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

  const onSubmit = async () => {
    if (!isConnected) {
      open();
      return;
    }

    setIsSubmit(true);
    setIsProcessing(true);
    setIsLoadingModal(true);
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
                    Rescue ERC-721
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col gap-2 overflow-y-auto">
                          <form>
                            <div className="w-full">
                              <div className="mt-2 w-full">
                                <p>
                                  Please input your ERC-721 contract address and
                                  token ID
                                </p>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Contract Address
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="text"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="0x5EF0396ee2EacFD1923a1975da3aFB925fE36814"
                                    {...register('contractAddress', {
                                      required: 'Contract address is required.',
                                    })}
                                  />
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage
                                    errors={errors}
                                    name="contractAddress"
                                  />
                                </div>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Token ID
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="number"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="1"
                                    min="0"
                                    {...register('tokenId', {
                                      required: 'Token ID is required.',
                                    })}
                                  />
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage
                                    errors={errors}
                                    name="tokenId"
                                  />
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={handleSubmit(onSubmit)}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
                              Rescue ERC-721
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
    </>
  );
}
