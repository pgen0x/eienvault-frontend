import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { parseEther, parseUnits, zeroAddress } from 'viem';

import ButtonSecondary from '@/components/button/buttonSecondary';
import { vaultABI } from '@/hooks/eth/Artifacts/Vault_ABI';
import { roles } from '@/utils/listRoles';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '@hookform/error-message';
import { useWeb3Modal } from '@web3modal/react';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { erc20ABI, useAccount, usePublicClient, useWalletClient } from 'wagmi';

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
  const [whitelistedTokens, setWhitelistedTokens] = useState([
    {
      address: zeroAddress,
      symbol: 'HLUSD',
    },
  ]);
  const [selectedToken, setSelectedToken] = useState(zeroAddress);

  const { open } = useWeb3Modal();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

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
        let amount;

        if (selectedToken === zeroAddress) {
          amount = parseEther(data.amount);
        } else {
          const decimal = await getDecimals(selectedToken);
          amount = parseUnits(data.amount, decimal);
        }
        await walletClient.writeContract({
          abi: vaultABI.abi,
          address: vaultABI.address,
          functionName: 'withdrawFeeCommission',
          args: [amount, selectedToken],
          account: address,
        });
      } else {
        toast.error("You don't have permission to perform this action");
        throw new Error("You don't have permission to perform this action");
      }
    } catch (error) {
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

  const getDecimals = async (tokenAddress) => {
    try {
      const decimal = await publicClient.readContract({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: 'decimals',
        args: [],
        account: address,
      });
      return decimal;
    } catch (error) {}
  };

  const getSymbol = async (tokenAddress) => {
    try {
      const decimal = await publicClient.readContract({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: 'symbol',
        args: [],
        account: address,
      });
      return decimal;
    } catch (error) {}
  };

  const getWhitelistToken = async () => {
    try {
      const whitelistTokens = await publicClient.readContract({
        ...vaultABI,
        functionName: 'getWhitelistedTokens',
      });

      const tokensWithSymbols = await Promise.all(
        whitelistTokens.map(async (tokenAddress) => {
          const symbol = await getSymbol(tokenAddress);
          return { address: tokenAddress, symbol };
        }),
      );

      setWhitelistedTokens((prevTokens) => [
        ...prevTokens,
        ...tokensWithSymbols,
      ]);
    } catch (error) {
      // Handle error
      console.error('Error fetching whitelisted tokens:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getWhitelistToken();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isOpenModal) {
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
                    Are you sure to withdraw all fee commision?
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="flex flex-col  gap-2 overflow-y-auto">
                          <form>
                            <div className="w-full">
                              <div className="mt-2 w-full">
                                <p className="pt-2">
                                  Plase input amount and select token ERC-20 or
                                  HLUSD
                                </p>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Amount
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <input
                                    type="number"
                                    className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                    placeholder="0"
                                    {...register('amount', {
                                      required: 'Amount is required.',
                                    })}
                                  />
                                </div>
                                <div className="mt-1 text-sm font-semibold text-primary-500">
                                  <ErrorMessage errors={errors} name="amount" />
                                </div>
                              </div>
                              <div className="mt-4 w-full">
                                <label className="mt-2 font-semibold">
                                  <span className="text-semantic-red-500">
                                    *
                                  </span>{' '}
                                  Token Address
                                </label>

                                <div className="mt-2 flex w-full items-center rounded-full border border-gray-200 bg-white dark:text-gray-900">
                                  <select
                                    className="relative w-full rounded-full border-0 bg-white py-2 pl-3 pr-10 text-left text-gray-900 focus:outline-none focus:ring-0 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 dark:hover:text-gray-300 sm:text-sm"
                                    onChange={(event) =>
                                      setSelectedToken(event.target.value)
                                    }
                                    value={selectedToken}
                                  >
                                    {whitelistedTokens.map((token, key) => (
                                      <option
                                        key={key}
                                        value={token.address} // Assuming 'address' is a unique identifier for each token
                                        className="rounded-md"
                                      >
                                        {token.symbol}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={handleSubmit(onSubmit)}
                              disabled={isSubmit}
                              className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200"
                            >
                              {isSubmit
                                ? 'Loading...'
                                : 'Withdraw Fee Commision'}
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
