'use client';
import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import {
  faCheckCircle,
  faChevronDown,
  faCircleXmark,
  faClose,
  faCross,
  faImage,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function ModalCreateCollection({
  isOpen,
  onClose,
  selectedChain,
  setSelectedChain,
  chains,
  onModalClose,
}) {
  function closeModal() {
    onClose(false);
    onModalClose();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-gray-900"
                  >
                    Create collection
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-4 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900">
                        <section className="flex flex-col gap-3 overflow-y-auto">
                          <div className="w-full">
                            Deploying your own contract requires uploading your
                            metadata outside of OpenSea.
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6 text-gray-900">
                              <span className="text-semantic-red-500">*</span>{' '}
                              Upload your item
                            </label>
                            <div className="flex flex-col items-center gap-3 border-2 border-dashed border-gray-200 bg-white py-5 text-center">
                              <FontAwesomeIcon
                                icon={faImage}
                                className="text-6xl"
                              />
                              <div className="">
                                400 x 400 pixel is recommended
                              </div>
                              <label className="cursor-pointer rounded-full bg-primary-500 px-4 py-1 font-semibold text-white hover:bg-primary-300">
                                Choose file
                                <input type="file" className="hidden" />
                              </label>
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6 text-gray-900">
                              Name
                            </label>
                            <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                              <input
                                type="text"
                                className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                placeholder="Name of your collection"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6 text-gray-900">
                              Token symbol
                            </label>
                            <span>
                              The token symbol is shown on the block explorer
                              when others view your smart contract. e:g :
                              Bitcoin shown as BTC
                            </span>
                            <div className="flex w-full items-center rounded-full border border-gray-200 bg-white">
                              <input
                                type="number"
                                className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                                placeholder="AAA"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm leading-6 text-gray-900">
                              Blockchain
                            </label>
                            <Listbox
                              value={selectedChain}
                              onChange={setSelectedChain}
                              className="mt-2"
                            >
                              <div className="relative z-20">
                                <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
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
                                  <span className="block truncate pl-6 text-gray-600">
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
                                            ? 'bg-primary-500 text-white'
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
                          <button className="mt-4 w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300 disabled:bg-primary-200">
                            Create Collection
                          </button>
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
                            <section className="step-2 flex flex-col gap-3 bg-gray-100 p-5">
                              <div className="flex flex-col items-center gap-5">
                                <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                                <div className="text-center">
                                  <h3 className="text-lg font-bold">
                                    Your contract has been deploying
                                  </h3>
                                  <span>
                                    Wait a moment, deploying on progress.
                                  </span>
                                </div>
                                <button
                                  className="w-full rounded-full bg-white py-2 font-bold text-primary-500 hover:text-primary-400"
                                  onClick={() =>
                                    handleStepCreate(stepCreate + 1)
                                  }
                                >
                                  View on etherscan
                                </button>
                                <button
                                  className="font-bold text-primary-500 hover:text-primary-400"
                                  onClick={() =>
                                    handleStepCreate(stepCreate - 1)
                                  }
                                >
                                  Cancel
                                </button>
                              </div>
                            </section>
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
