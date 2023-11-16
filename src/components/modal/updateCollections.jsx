'use client';
import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import {
  faCheck,
  faChevronDown,
  faClose,
  faImage,
  faXmark,
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
import ButtonPrimary from '../button/buttonPrimary';

export default function ModalUpdateCollection({
  collectionAddress,
  isOpenModal,
  onClose,
  selectedChain,
  setSelectedChain,
  chains,
  onModalClose,
  collection,
  setCollection,
}) {
  const { open } = useWeb3Modal();
  const { token } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorOnUpload, setErrorOnUpload] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const [tmpSave, setTmpSave] = useState(Date.now());

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const selectedImage = watch('file');
  const name = watch('name');
  const tokenSymbol = watch('tokenSymbol');
  const description = watch('description');

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

  const onSave = async (payload) => {
    try {
      setCollection((oldCollection) => {
        for (let key in payload) {
          oldCollection[key] = payload[key];
        }
        return oldCollection;
      });

      const options = {
        method: 'PUT',
        body: JSON.stringify(payload), // Convert the payload to JSON
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/collection/edit/${collectionAddress}`,
        options,
      );

      if (response.ok) {
        setIsSubmit(false);
        setIsCompleted(true);
        setErrorOnUpload(false);
        console.log('Data saved successfully.');
      } else {
        // Handle the error here
        setIsSubmit(false);
        setIsCompleted(true);
        setErrorOnUpload(true);
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

    setIsSubmit(true);
    closeModal();

    const resUpload = await onUpload(selectedImage[0]);

    const onSaveData = await onSave({
      name: name,
      tokenSymbol: tokenSymbol,
      description: description,
      chainId: chain?.id,
    });
  };

  function closeModal() {
    setIsCompleted(false);
    onClose(false);
    onModalClose();
    reset();
    setTmpSave(Date.now());
  }

  const allowedFileTypes = [
    'image/png',
    'image/jpeg',
    'image/webp',
    'video/mp4',
    'audio/mp3',
  ];
  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (value) => {
    if (!value) {
      setValue('file', '');
      return 'File is required.';
    }

    if (!allowedFileTypes.includes(value.type)) {
      setValue('file', '');
      return 'Invalid file type';
    }

    if (value.size > maxFileSize) {
      setValue('file', '');
      return 'File size exceeds the limit';
    }

    return true; // Validation passed
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (collection.logo) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_CDN_URL}/collections/${collection.logo}`,
          );

          const blob = await response.blob();

          // Create a File object from the Blob
          const ext = blob.type.split('/');
          const file = new File([blob], `image.${ext[ext.length - 1]}`, {
            type: blob.type,
          });
          // Set the value of the 'file' field using setValue
          setValue('file', [file]);
        }
      } catch (error) {
        console.error('Error fetching the image:', error);
      }
    };

    const fetchCollection = () => {
      setValue('name', collection.name);
      setValue('tokenSymbol', collection.tokenSymbol);
      setValue('description', collection.description);
      setValue('chainId', collection.chainId);
    };

    fetchImage();
    fetchCollection();
  }, [collection, tmpSave]);

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
                    Update collection
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
                            <div className="relative mt-2 flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white dark:bg-neutral-900 py-3 text-center">
                              {selectedImage && selectedImage.length > 0 ? (
                                <>
                                  <button
                                    className="absolute right-1.5 top-1.5 z-30 h-10 w-10 rounded-full text-primary-500 dark:text-neutral-500 hover:bg-primary-50"
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
                                  <label className="cursor-pointer rounded-full bg-primary-500 dark:bg-neutral-500 px-4 py-1 font-semibold text-white hover:bg-primary-300 dark:hover:bg-neutral-300">
                                    Choose file
                                    <input
                                      type="file"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        console.log(file, '*************');
                                        setValue('file', file); // Set the value of 'file' field using setValue
                                      }}
                                      {...register('file', {
                                        required: 'File is required.',
                                        validate: validateFile,
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
                                <Listbox.Button className="relative w-full cursor-default rounded-full border-0 bg-white dark:bg-neutral-900 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
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
                            Update Collection
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
                    Awaiting Collection Data Update
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900">
                        <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                          <div className="flex flex-col items-center gap-5">
                            <div className="h-10 w-10 animate-ping rounded-lg bg-primary-100"></div>
                            <div className="text-center text-base leading-6">
                              <span>
                                Stay Patient, Exciting Updates on the Way
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
                            {errorOnUpload ? (
                              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-primary-500">
                                <FontAwesomeIcon
                                  icon={faXmark}
                                  className="text-6xl font-bold text-primary-500"
                                />
                              </div>
                            ) : (
                              <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-[8px] border-green-400">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-6xl font-bold text-green-400"
                                />
                              </div>
                            )}

                            <div className="text-center">
                              <h3 className="text-lg font-bold">
                                {errorOnUpload
                                  ? 'Failed to update data'
                                  : 'Your collections is now successfully updated!'}
                              </h3>
                            </div>
                            <div className="justiry-between flex w-full gap-2">
                              <button
                                className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                                onClick={() => closeModal()}
                              >
                                Close
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
