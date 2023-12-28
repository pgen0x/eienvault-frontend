import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { vaultABI } from '@/hooks/eth/Artifacts/Vault_ABI';
import { roles } from '@/utils/listRoles';
import { useWeb3Modal } from '@web3modal/react';
import { toast } from 'react-toastify';
import {
  useAccount,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';

export default function ModalPause({
  isOpenModal,
  onClose,
  onModalClose,
  type,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const [pauseHash, setPauseHash] = useState(false);

  const { open } = useWeb3Modal();

  function closeModal() {
    onClose(false);
    onModalClose();
  }

  // Only DEFAULT_ADMIN_ROLE can run this action
  const onSubmit = async (data) => {
    if (!isConnected) {
      open();
      return;
    }
    setIsSubmit(true);

    try {
      const isAdmin = await checkRoles('DEFAULT_ADMIN_ROLE');
      if (isAdmin) {
        const hash = await walletClient.writeContract({
          abi: type === 'marketplace' ? marketplaceABI.abi : vaultABI.abi,
          address:
            type === 'marketplace' ? marketplaceABI.address : vaultABI.address,
          functionName: 'pause',
          account: address,
        });
        setPauseHash(hash);
      } else {
        toast.error("You don't have permission to perform this action");
        throw new Error("You don't have permission to perform this action");
      }
    } catch (error) {
      console.log(error);
      setIsSubmit(false);
      if (error.message.includes('User denied transaction signature')) {
        toast.error('Transaction rejected by the user.');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  const checkRoles = async (roleName) => {
    try {
      const roleAddress = roles[roleName];
      if (!roleAddress) {
        toast.error('Invalid role name');
        throw new Error('Invalid role name');
      }

      const checkroles = await publicClient.readContract({
        abi: vaultABI.abi,
        address: vaultABI.address,
        functionName: 'hasRole',
        args: [roleAddress, address],
        account: address,
      });
      return checkroles;
    } catch (error) {
      toast.error('Error hasRole');
    }
  };

  const { data: dataPause, isError: isErrorPause } = useWaitForTransaction({
    hash: pauseHash,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (pauseHash) {
        if (isErrorPause) {
          setIsSubmit(false);
          toast.error('Error Pause Contract');
          throw new Error('Error Pause Contract');
        }

        if (dataPause) {
          toast.success('Pause Marketplace Contract Success');
        }
      }
    };

    fetchData();
  }, [dataPause, pauseHash, isErrorPause]);

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
                    Are you sure to pause this contract?
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col gap-2 overflow-y-auto">
                          <div className="mt-2 w-full">
                            <p>
                              If you aggree to pause this contract check your
                              wallet and do an approve to continue
                            </p>
                          </div>
                          <div className="flex justify-between gap-4">
                            <button
                              onClick={() => onSubmit()}
                              disabled={isSubmit}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
                              {isSubmit ? 'Loading...' : 'Yes'}
                            </button>
                            <button
                              onClick={closeModal}
                              disabled={isSubmit}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
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
