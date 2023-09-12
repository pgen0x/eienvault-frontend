'use client';
import {
  faCheckCircle,
  faCircleXmark,
  faClose,
  faCross,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function ModalUploadDFile({
  isOpenModal,
  onClose,
  isLoadingModal,
  isErrorIPFS,
  isErrorMint,
  isErrorApprove,
  isErrorPutonsale,
  isProcessing,
  onModalClose,
}) {
  function closeModal() {
    onClose(false);
    onModalClose();
  }

  return (
    <>
      <Transition appear show={isOpenModal} as={Fragment}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Just a few steps left
                  </Dialog.Title>
                  <div className="mx-5 flex flex-col text-sm text-gray-900">
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.ipfs ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorIPFS.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-primary-500"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">Upload</span>
                        <span>
                          Uploading all media assets and metadata to IPFS
                          (InterPlanetary File System).
                        </span>
                        {isErrorIPFS.isError && (
                          <div className="text-primary-500">
                            {isErrorIPFS.message.error}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.mint ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorMint.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-primary-500"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">Mint</span>
                        <span>Initiate a transaction to generate your NFT</span>
                        {isErrorMint.isError && (
                          <div className="text-primary-500">
                            {isErrorMint.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.approve ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorApprove.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-primary-500"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">Approve</span>
                        <span>
                          Confirming a transaction, typically performed once per
                          collection
                        </span>
                        {isErrorApprove.isError && (
                          <div className="text-primary-500">
                            {isErrorApprove.message.error}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex max-w-full shrink-0 flex-row items-center gap-4">
                      <div className="flex max-w-full shrink-0 flex-col items-center">
                        {isLoadingModal.putonsale ? (
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="h-8 w-8 animate-spin fill-primary-600 text-gray-200 dark:text-gray-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                        ) : isErrorPutonsale.isError ? (
                          <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="h-7 w-7 text-primary-500"
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="h-7 w-7 text-primary-500"
                          />
                        )}
                      </div>
                      <div className="flex max-w-full flex-1 shrink-0 flex-col items-stretch">
                        <span className="text-lg font-semibold">
                          Put on sale
                        </span>
                        <span>
                          Authorize and sign a message to establish a fixed
                          price for sale
                        </span>
                        {isErrorPutonsale.isError && (
                          <div className="text-primary-500">
                            {isErrorPutonsale.message.error}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 inline-flex ">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-primary-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-primary-50"
                        onClick={closeModal}
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Cancel' : 'Completed'} 
                      </button>
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
