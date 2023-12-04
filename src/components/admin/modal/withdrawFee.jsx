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
import { useWeb3Modal } from '@web3modal/react';

export default function ModalWithdrawFee({
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
                    Are you sure to withdraw all fee commision?
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex  gap-2 overflow-y-auto">
                          <div className="flex w-full justify-between gap-4">
                            <button className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200">
                              Yes
                            </button>
                            <button className="mt-4 w-full rounded-full bg-white py-2 font-semibold text-neutral-700 hover:bg-neutral-300 disabled:bg-primary-200">
                              No
                            </button>
                          </div>
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
