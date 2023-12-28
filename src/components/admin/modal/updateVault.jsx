import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { vaultABI } from '@/hooks/eth/Artifacts/Vault_ABI';
import { roles } from '@/utils/listRoles';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import { toast } from 'react-toastify';
import {
  useAccount,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';

export default function ModalUpdateVault({
  isOpenModal,
  onClose,
  onModalClose,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { open } = useWeb3Modal();
  const [updateVaultHash, setUpdateVaultHash] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function closeModal() {
    onClose(false);
    onModalClose();
  }

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
          abi: marketplaceABI.abi,
          address: marketplaceABI.address,
          functionName: 'updateVault',
          args: [data.vaultcontract],
          account: address,
        });
        setUpdateVaultHash(hash);
      } else {
        toast.error("You don't have permission to perform this action");
        throw new Error("You don't have permission to perform this action");
      }
    } catch (error) {
      setIsSubmit(false);
      if (error.message.includes('User denied transaction signature')) {
        toast.error('Transaction rejected by the user.');
      } else {
        console.log(error);
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

  useEffect(() => {
    if (isOpenModal === true) {
      reset();
    }
  }, [isOpenModal]);

  const { data: dataUpdateVault, isError: isErrorUpdateVault } =
    useWaitForTransaction({
      hash: updateVaultHash,
    });

  useEffect(() => {
    const fetchData = async () => {
      if (updateVaultHash) {
        if (isErrorUpdateVault) {
          setIsSubmit(false);
          toast.error('Error Update Vault Contract Address');
          throw new Error('Error Update Vault Contract Address');
        }

        if (dataUpdateVault) {
          toast.success('Update New Contract Success');
        }
      }
    };

    fetchData();
  }, [dataUpdateVault, updateVaultHash, isErrorUpdateVault]);

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
                    Update Vault Contract Address
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col  gap-2 overflow-y-auto">
                          <form>
                            <div className="w-full">
                              <div className="mt-2 w-full">
                                <p>
                                  Please input the new vault contract address
                                </p>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Vault Contract Address
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="text"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="0xe614733b89707fA4c9c1a0a7E4A41AF9745AC806"
                                    {...register('vaultcontract', {
                                      required: 'Vault contract is required.',
                                    })}
                                  />
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage
                                    errors={errors}
                                    name="vaultcontract"
                                  />
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={handleSubmit(onSubmit)}
                              disabled={isSubmit}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
                              {isSubmit ? 'Loading...' : 'Update New Contract'}
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
