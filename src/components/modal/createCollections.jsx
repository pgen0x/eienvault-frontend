'use client';
import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import {
  faCheck,
  faChevronDown,
  faClose,
  faImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import Image from 'next/legacy/image';
import { Fragment, useEffect, useState } from 'react';
import { NftContract } from '@/hooks/eth/Artifacts/NFT_Abi';
import {
  useAccount,
  useNetwork,
  useWaitForTransaction,
  useWalletClient,
} from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalCreateCollection({
  isOpenModal,
  onClose,
  selectedChain,
  setSelectedChain,
  chains,
  onModalClose,
}) {
  const { open } = useWeb3Modal();
  const { token, hasSigned, handleSign } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isWait, setIsWait] = useState(false);
  const [hash, setHash] = useState();
  const [isErrorDeploy, setIsErrorDeploy] = useState();
  const [deployedContractAddress, setDeployedContractAddress] = useState();
  const [onSaveData, setOnsaveData] = useState();
  const [errorOnUpload, setErrorOnUpload] = useState(false);

  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data, isError, isLoading } = useWaitForTransaction({
    hash,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
    setError,
  } = useForm();
  const selectedImage = watch('file');
  const name = watch('name');
  const tokenSymbol = watch('tokenSymbol');
  const description = watch('description');
  const router = useRouter();

  const onUpload = async (file) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('image', file);
      formData.append('tokenAddress', collectionAddress);
      formData.append('type', 'logo');

      // Use the fetch API to send the FormData to the server
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        return await response.json();
      } else {
        // Handle the error here
        setErrorOnUpload(true);
        toast.error('File upload failed:', response.statusText);
        console.error('File upload failed:', response);
      }
    } catch (error) {
      // Handle any unexpected errors
      setErrorOnUpload(true);
      console.error('Error during file upload:', error);
    }
  };

  const onSave = async (data) => {
    try {
      const payload = {
        name: data.name,
        tokenSymbol: data.tokenSymbol,
        description: data.description,
        chainId: chain?.id,
        logo: data.logo,
        tokenAddress: data.tokenAddress,
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/create`,
        options,
      );

      if (response.ok) {
        // Data was saved successfully
        return response.json();
      } else {
        // Handle the error here
        console.error('Data saved failed:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error during data save:', error);
    }
  };

  const onSubmit = async (dataForm) => {
    if (!isConnected) {
      open();
      return;
    }

    if (isConnected && !hasSigned) {
      handleSign();
      return;
    }

    const file = dataForm.file[0];

    if (file) {
      if (!allowedFileTypes.includes(file.type)) {
        setError(
          'file',
          {
            type: 'manual',
            message: 'Invalid file type',
          },
          true,
        );
        return;
      }

      if (file.size > maxFileSize) {
        setValue('file', '');
        setError(
          'file',
          {
            type: 'manual',
            message: 'File size exceeds the limit',
          },
          true,
        );
        return;
      }
    }

    setIsSubmit(true);
    closeModal();

    try {
      const hash = await walletClient.deployContract({
        ...NftContract,
        address,
        args: [dataForm.name, dataForm.tokenSymbol, ''],
      });
      console.log(hash);
      setHash(hash);
    } catch (error) {
      closeModal();
      setIsSubmit(false);
      console.error('Error deploying NFT contract:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (hash) {
        if (isLoading) {
          setIsSubmit(false);
          setIsWait(true);
        }
        if (isError) {
          setIsErrorDeploy(true);
        }
        if (data) {
          const filenameBase64 = await onUpload(selectedImage[0]);

          const onSaveDataRes = await onSave({
            name: name,
            tokenSymbol: tokenSymbol,
            description: description,
            chainId: chain?.id,
            tokenAddress: data.contractAddress,
          });
          setDeployedContractAddress(data.contractAddress);
          setOnsaveData(onSaveDataRes);
          setIsWait(false);
          setIsCompleted(true);
        }
      }
    };

    fetchData();
  }, [hash, data, isLoading, isError]);

  function closeModal() {
    setIsCompleted(false);
    onClose(false);
    onModalClose();
  }

  const allowedFileTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/gif',
    'image/webp',
  ];

  const maxFileSize = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    if (isOpenModal === true) {
      reset();
    }
  }, [isOpenModal]);

  const handleCustomize = () => {
    closeModal();
    router.push(`/collection/${deployedContractAddress}`);
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title as="h3" className="text-xl font-bold">
                    Create collection
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="flex flex-col gap-2 overflow-y-auto">
                        <div className="w-full">
                          Deploying your own contract requires uploading your
                          metadata outside of EienVault.
                        </div>
                        <form>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              <span className="text-semantic-red-500">*</span>{' '}
                              Upload your item
                            </label>
                            <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-3 text-center dark:bg-neutral-900">
                              {selectedImage && selectedImage.length > 0 ? (
                                <>
                                  <button
                                    className="absolute right-1.5 top-1.5 z-30 h-10 w-10 rounded-full text-primary-500 hover:bg-primary-50 dark:text-neutral-500 dark:hover:text-neutral-50"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setValue('file', null);
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faClose} />
                                  </button>
                                  <Image
                                    src={URL.createObjectURL(
                                      getValues('file')[0],
                                    )}
                                    alt="Selected Preview"
                                    width={200}
                                    height={200}
                                    className="rounded-lg"
                                    objectFit="contain"
                                  />
                                </>
                              ) : (
                                <>
                                  <FontAwesomeIcon
                                    icon={faImage}
                                    className="text-6xl"
                                  />
                                  <div className="text-sm">
                                    400 x 400 pixel is recommended
                                  </div>
                                  <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white hover:bg-primary-300 dark:bg-neutral-500 dark:hover:bg-neutral-300">
                                    Choose file
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        setValue('file', file); // Set the value of 'file' field using setValue
                                      }}
                                      {...register('file', {
                                        required: 'File is required.',
                                      })}
                                    />
                                  </label>
                                </>
                              )}
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="file" />
                            </div>
                          </div>
                          <div className="mt-2 w-full">
                            <label className="block text-sm font-bold leading-6">
                              Blockchain
                            </label>
                            <Listbox
                              value={selectedChain}
                              onChange={setSelectedChain}
                              className="mt-2"
                            >
                              <div className="relative z-20">
                                <Listbox.Button className="relative w-full cursor-default rounded-full border-0 bg-white py-2 pl-3 pr-10 text-left focus:outline-none dark:bg-neutral-900 sm:text-sm">
                                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    {selectedChain.chainId === 1 ||
                                    selectedChain.chainId === 11155111 ? (
                                      <Ethereum />
                                    ) : selectedChain.chainId === 8668 ||
                                      selectedChain.chainId === 666888 ? (
                                      <HelaIcon className="h-5 w-5" />
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                  <span className="block truncate pl-6">
                                    {
                                      chains.find(
                                        (chain) =>
                                          chain.chainId ===
                                          selectedChain.chainId,
                                      )?.name
                                    }
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 ">
                                    <FontAwesomeIcon
                                      icon={faChevronDown}
                                      className="text-gray-600"
                                    />
                                  </span>
                                </Listbox.Button>
                                <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {chains.map((chain) => (
                                    <Listbox.Option
                                      key={chain.chainId}
                                      className={({ active }) =>
                                        `relative cursor-default select-none px-4 py-2 ${
                                          active
                                            ? 'bg-primary-500 text-white dark:bg-neutral-900'
                                            : 'text-gray-900'
                                        }`
                                      }
                                      value={chain}
                                      disabled={
                                        chain.chainId === 666888 ||
                                        chain.chainId === 8668
                                          ? false
                                          : true
                                      }
                                    >
                                      {({ selectedChain }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selectedChain
                                                ? 'font-medium'
                                                : 'font-normal'
                                            } ${
                                              chain.chainId === 666888 ||
                                              chain.chainId === 8668
                                                ? ''
                                                : 'text-gray-400'
                                            }`}
                                          >
                                            {chain.name}{' '}
                                            <span className="text-sm ">
                                              {chain.chainId === 666888 ||
                                              chain.chainId === 8668
                                                ? ''
                                                : '[currently not supported]'}
                                            </span>
                                          </span>
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </div>
                            </Listbox>
                          </div>
                          <div className="mt-2 w-full">
                            <label className="block text-sm font-bold leading-6">
                              <span className="text-semantic-red-500">*</span>{' '}
                              Name
                            </label>
                            <span className="text-xs">
                              Token name cannot be changed in future
                            </span>

                            <div className="flex w-full items-center rounded-full border-0 bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:ring-0"
                                placeholder="Name of your collection"
                                {...register('name', {
                                  required: 'Name is required.',
                                })}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="name" />
                            </div>
                          </div>
                          <div className="mt-2 w-full">
                            <label className="block text-sm font-bold leading-6">
                              <span className="text-semantic-red-500">*</span>{' '}
                              Token Symbol
                            </label>
                            <span className="text-xs">
                              The token symbol is shown on the block explorer
                              when others view your smart contract. e.g Bitcoin
                              shown as BTC
                            </span>
                            <div className="flex w-full items-center rounded-full border-0 bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:ring-0"
                                placeholder="AAA"
                                {...register('tokenSymbol', {
                                  required: 'Token Symbol is required.',
                                })}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage
                                errors={errors}
                                name="tokenSymbol"
                              />
                            </div>
                          </div>
                          <div className="mt-2 w-full">
                            <label className="block text-sm font-bold leading-6">
                              Description
                            </label>
                            <div className="flex w-full items-center rounded-2xl border-0 bg-white dark:bg-neutral-900">
                              <textarea
                                className="w-full rounded-2xl border-0 bg-transparent focus:ring-0"
                                placeholder="Description of your NFT collection"
                                {...register('description', {
                                  maxLength: {
                                    value: 500,
                                    message:
                                      'Description must not exceed 500 characters.',
                                  },
                                })}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage
                                errors={errors}
                                name="description"
                              />
                            </div>
                          </div>

                          <ButtonPrimary
                            onClick={handleSubmit(onSubmit)}
                            className="mt-4"
                          >
                            Create Collection
                          </ButtonPrimary>
                        </form>
                      </section>

                      {/* {stepCreate == 2 && (
                            <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                              <div className="flex flex-col items-center gap-5">
                                <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                                <div className="text-center">
                                  <h3 className="text-lg font-bold">
                                    Deploying your contract
                                  </h3>
                                  <span>
                                    Check your wallet and do an approvement to
                                    continue deploying your contract
                                  </span>
                                </div>
                                <button
                                  className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                                  onClick={() =>
                                    handleStepCreate(stepCreate - 1)
                                  }
                                >
                                  Cancel
                                </button>
                                <button
                                  className="font-bold text-primary-500 hover:text-primary-400"
                                  onClick={() =>
                                    handleStepCreate(stepCreate + 1)
                                  }
                                >
                                  Next
                                </button>
                              </div>
                            </section>
                          )}
                          {stepCreate == 3 && (
                            
                          )}
                          {stepCreate == 4 && (
                            <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                              <div className="flex flex-col items-center gap-5">
                                <img
                                  src="https://fakeimg.pl/84x84"
                                  className="h-20 w-20 rounded-lg"
                                />
                                <div className="text-center">
                                  <h3 className="text-lg font-bold">
                                    Your collections is now created!
                                  </h3>
                                  <span>
                                    Clik the customize button to adjust your
                                    collections setting.
                                  </span>
                                </div>
                                <div className="justiry-between flex w-full gap-2">
                                  <button
                                    className="w-full rounded-full bg-primary-500 py-2 font-bold text-white hover:text-primary-400"
                                    onClick={handleModalCreate}
                                  >
                                    Customize
                                  </button>
                                  <button
                                    className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                                    onClick={handleModalCreate}
                                  >
                                    Later
                                  </button>
                                </div>
                              </div>
                            </section>
                          )} */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={isSubmit} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-xl font-bold text-gray-900"
                  >
                    Deploying your contract
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900">
                        <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                          <div className="flex flex-col items-center gap-5">
                            <div className="h-10 w-10 animate-ping rounded-lg bg-primary-100"></div>
                            <div className="text-center text-base leading-6">
                              <span>
                                Check your wallet and do an approvement to
                                continue deploying your contract
                              </span>
                            </div>
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
      <Transition appear show={isWait} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-3 text-left align-middle shadow-xl transition-all">
                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900">
                        <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                          <div className="flex flex-col items-center gap-5">
                            <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                            <div className="text-center">
                              <h3 className="text-lg font-bold">
                                Your contract is deploying
                              </h3>
                              <span>
                                Wait a moment, Deployment in progress.
                              </span>
                            </div>
                            {hash && (
                              <a
                                target="_blank"
                                className="w-full rounded-full bg-white py-2 text-center font-bold text-primary-500 hover:text-primary-400"
                                href={`https://testnet-blockexplorer.helachain.com/tx/${hash}`}
                                rel="noopener noreferrer"
                              >
                                View on explorer
                              </a>
                            )}
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-3 text-left align-middle shadow-xl transition-all">
                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900">
                        <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                          <div className="flex flex-col items-center gap-5">
                            <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-green-400">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-6xl font-bold text-green-400"
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="text-lg font-bold">
                                Your collections is now created!
                              </h3>
                              <span>
                                Clik the customize button to adjust your
                                collections setting.
                              </span>
                            </div>
                            <div className="justiry-between flex w-full gap-2">
                              <button
                                className="w-full rounded-full bg-primary-500 py-2 font-bold text-white hover:bg-primary-400"
                                onClick={() => handleCustomize()}
                              >
                                Customize
                              </button>
                              <button
                                className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:bg-primary-200"
                                onClick={closeModal}
                              >
                                Later
                              </button>
                            </div>
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
