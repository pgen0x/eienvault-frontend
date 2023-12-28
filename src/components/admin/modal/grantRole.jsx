import { useAuth } from '@/hooks/AuthContext';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';
import { vaultABI } from '@/hooks/eth/Artifacts/Vault_ABI';
import { roles } from '@/utils/listRoles';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  useAccount,
  usePublicClient,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';

export default function ModalGrantRole({
  isOpenModal,
  onClose,
  onModalClose,
  type,
}) {
  const { address, isConnected } = useAccount();
  const [isSubmit, setIsSubmit] = useState(false);
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { open } = useWeb3Modal();
  const [grantRoleHash, setGrantRoleHash] = useState();

  const { token } = useAuth();

  function closeModal() {
    onClose(false);
    onModalClose();
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

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
          functionName: 'grantRole',
          args: [data.role, data.walletaddress],
          account: address,
        });
        setGrantRoleHash(hash);
      } else {
        throw new Error("You don't have permission to perform this action");
      }
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
      if (error.message.includes('User denied transaction signature')) {
        toast.error('Transaction rejected by the user.');
      } else {
        toast.error(error.message);
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
        abi: type === 'marketplace' ? marketplaceABI.abi : vaultABI.abi,
        address:
          type === 'marketplace' ? marketplaceABI.address : vaultABI.address,
        functionName: 'hasRole',
        args: [roleAddress, address],
        account: address,
      });
      return checkroles;
    } catch (error) {
      toast.error('Error hasRole');
    }
  };

  const { data: dataGrantRole, isError: isErrorGrantRole } =
    useWaitForTransaction({
      hash: grantRoleHash,
    });
  const onSave = async () => {
    try {
      let role;
      if (
        watch('role') ===
        '0x0000000000000000000000000000000000000000000000000000000000000000'
      ) {
        role = 'DEFAULT_ADMIN_ROLE';
      } else if (
        watch('role') ===
        '0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a'
      ) {
        role = 'PAUSER_ROLE';
      } else if (
        watch('role') ===
        '0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3'
      ) {
        role = 'UPGRADER_ROLE';
      }

      const options = {
        method: 'POST',
        body: JSON.stringify({
          userAddress: watch('walletaddress'),
          newRole: [role],
        }),
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/updateRole`,
        options,
      );

      if (response.ok) {
        setIsSubmit(false);
        toast.success(`Grant role to ${watch('walletaddress')} success`);
        reset();
      } else {
        setIsSubmit(false);
        toast.error(`Update role in database failed!`);
      }
    } catch (error) {
      setIsSubmit(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (grantRoleHash) {
        if (isErrorGrantRole) {
          setIsSubmit(false);
          toast.error('Error Grant Role');
          throw new Error('Error Grant Role');
        }

        if (dataGrantRole) {
          await onSave();
        }
      }
    };

    fetchData();
  }, [dataGrantRole, grantRoleHash, isErrorGrantRole]);

  useEffect(() => {
    if (isOpenModal === true) {
      reset();
    }
  }, [isOpenModal]);

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
                    Grant a Role
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col gap-2 overflow-y-auto">
                          <form>
                            <div className="w-full">
                              <div className="mt-2 w-full">
                                <p>
                                  Please input your wallet address and the role
                                </p>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Wallet Address
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="text"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="0x5EF0396ee2EacFD1923a1975da3aFB925fE36814"
                                    {...register('walletaddress', {
                                      required: 'Wallet address is required.',
                                    })}
                                  />
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage
                                    errors={errors}
                                    name="walletaddress"
                                  />
                                </div>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Role
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border">
                                  <select
                                    {...register('role', {
                                      required: 'Role is required.',
                                    })}
                                    className="w-full rounded-full border-0 bg-gray-100 text-gray-900 focus:outline-none focus:ring-0 dark:bg-neutral-900 dark:text-white"
                                  >
                                    <option value="0x0000000000000000000000000000000000000000000000000000000000000000">
                                      DEFAULT_ADMIN_ROLE
                                    </option>
                                    <option value="0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a">
                                      PAUSER_ROLE
                                    </option>
                                    <option value="0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3">
                                      UPGRADER_ROLE
                                    </option>
                                  </select>
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage errors={errors} name="role" />
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={handleSubmit(onSubmit)}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                              disabled={isSubmit}
                            >
                              {isSubmit ? 'Loading...' : 'Grant Role'}
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
