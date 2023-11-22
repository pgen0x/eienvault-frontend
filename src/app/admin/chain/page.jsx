'use client';
import Table, { Td } from '@/components/admin/table/table';
import AdminTable from '@/components/admin/table/table';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonSecondary from '@/components/button/buttonSecondary';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faAnglesLeft,
  faAnglesRight,
  faCheck,
  faCopy,
  faSearch,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';
import { formatEther } from 'viem';

const AdminUserPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    Array.from({ length: 500 }, (_, i) => i + 1),
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const { token } = useAuth();
  const [IsModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdateModal, setDataUpdateModal] = useState({});
  const [IsModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [dataDeleteModal, setDataDeleteModal] = useState({});
  // Number of items per page
  const perPage = 10;

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const loadData = async () => {
    setIsLoading(true);
    await axios
      .request({
        method: 'get',
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall?query=${search}&page=${page}&limit=${perPage}`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setTotalPage(response.data.totalPages);
        setData([...response.data]);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status == 404) {
          setData([]);
        } else {
          toast.error(error.message);
        }
      });
  };

  const handleOpenCreateModal = () => {
    setDataUpdateModal({});
    setIsModalUpdateOpen(true);
  };

  const handleOpenUpdateModal = (
    chainId,
    name,
    symbol,
    mode,
    rpcUrl,
    explorerUrl,
  ) => {
    setDataUpdateModal({
      chainId,
      name,
      symbol,
      mode,
      rpcUrl,
      explorerUrl,
    });
    setIsModalUpdateOpen(true);
  };

  const handleOpenDeleteModal = (chainId, name, symbol, mode) => {
    setDataDeleteModal({
      chainId,
      name,
      symbol,
      mode,
    });
    setIsModalDeleteOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const closeModalDelete = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <div>
      {/* Display your paginated data */}
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Chain lists
        </h3>
        <ButtonPrimary
          className="!w-fit !py-1 text-sm"
          onClick={() => handleOpenCreateModal()}
        >
          Create
        </ButtonPrimary>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Chain ID</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Mode</th>
            <th>RPC Url</th>
            <th>Explorer Url</th>
            <th>Latest Block</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="text-center" key={index}>
                <Td firstElement={true}>{item.chainId}</Td>
                <Td>{item.name}</Td>
                <Td>{item.symbol}</Td>
                <Td>{item.mode}</Td>
                <Td>{item.rpcUrl}</Td>
                <Td>{item.explorerUrl}</Td>
                <Td>{item.latestBlock}</Td>
                <Td lastElement={true} className="pl-8">
                  <div className="flex gap-2">
                    <ButtonPrimary
                      className="!w-fit !py-1 text-sm"
                      onClick={() =>
                        handleOpenUpdateModal(
                          item.chainId,
                          item.name,
                          item.symbol,
                          item.mode,
                          item.rpcUrl,
                          item.explorerUrl,
                        )
                      }
                    >
                      Update
                    </ButtonPrimary>
                    <ButtonPrimary
                      className="!w-fit !py-1 text-sm"
                      onClick={() =>
                        handleOpenDeleteModal(
                          item.chainId,
                          item.name,
                          item.symbol,
                          item.mode,
                        )
                      }
                    >
                      Delete
                    </ButtonPrimary>
                  </div>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="mt-8 flex w-full justify-center">
        <div className="flex w-fit justify-center rounded-lg bg-white/60 p-3 text-primary-500 dark:bg-neutral-900 dark:text-white">
          <ReactPaginate
            previousLabel={<FontAwesomeIcon icon={faAnglesLeft} />}
            previousLinkClassName="px-3 font-semibold py-1 rounded-xl text-sm dark:hover:bg-neutral-700 hover:dark:text-white hover:bg-primary-500 hover:text-white"
            nextLabel={<FontAwesomeIcon icon={faAnglesRight} />}
            nextLinkClassName="px-3 font-semibold py-1 rounded-xl text-sm dark:hover:bg-neutral-700 hover:dark:text-white hover:bg-primary-500 hover:text-white"
            breakLabel={'...'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'flex gap-2'}
            pageLinkClassName={
              'px-3 font-semibold py-1 rounded-xl text-sm dark:hover:bg-neutral-700 hover:dark:text-white hover:bg-primary-500 hover:text-white'
            }
            activeLinkClassName={
              'rounded-xl text-white bg-primary-500 dark:bg-neutral-100 dark:text-gray-900'
            }
          />
        </div>
      </div>
      <ModalUpdate
        isOpenModal={IsModalUpdateOpen}
        onClose={closeModalUpdate}
        dataModal={dataUpdateModal}
        refresh={loadData}
      />
      <ModalDelete
        isOpenModal={IsModalDeleteOpen}
        onClose={closeModalDelete}
        dataModal={dataDeleteModal}
        refresh={loadData}
      />
    </div>
  );
};

const ModalUpdate = ({ isOpenModal, onClose, dataModal, refresh }) => {
  const { token } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorVerify, setErrorVerify] = useState({
    isError: false,
    message: '',
  });
  const [hash, setHash] = useState();
  const [formStatus, setFormStatus] = useState(dataModal.status);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm();
  const router = useRouter();

  const onSave = async (data) => {
    setIsSubmit(true);
    setErrorVerify({
      isError: false,
      message: '',
    });

    try {
      let submitUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/createchain`;
      const payload = data;

      const options = {
        method: dataModal?.chainId ? 'PUT' : 'POST',
        body: JSON.stringify(payload), // Convert the payload to JSON
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      if (dataModal?.chainId) {
        submitUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/updatechain/${payload?.chainId}`;
      }

      const response = await fetch(submitUrl, options);

      if (response.ok) {
        // Data was saved successfully
        refresh();
        setIsSubmit(false);
        setIsCompleted(true);
        return response.json();
      } else {
        // Handle the error here
        setErrorVerify({
          isError: true,
          message: response.statusText,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      setErrorVerify({
        isError: true,
        message: error,
      });
    }
  };

  function closeModal() {
    if (errorVerify.isError || isCompleted || !isSubmit) {
      if (errorVerify.isError) {
        setIsSubmit(false);
        setErrorVerify({
          isError: false,
          message: '',
        });
      } else {
        setErrorVerify({
          isError: false,
          message: '',
        });
        setIsSubmit(false);
        setIsCompleted(false);
        onClose(false);
      }
    }
  }

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title as="h3" className="px-6 pt-6 text-xl font-bold">
                    {dataModal?.chainId ? 'Update' : 'Create'} Chain
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="flex w-full flex-col gap-2 overflow-y-auto p-6">
                        <form className="flex flex-col gap-2">
                          {dataModal?.chainId ? (
                            <input
                              type="hidden"
                              {...register('chainId', {
                                required: false,
                              })}
                              defaultValue={dataModal.chainId}
                            />
                          ) : (
                            <div className="w-full">
                              <label className="block text-sm font-bold leading-6">
                                Chain ID
                              </label>
                              <span className="text-xs"></span>
                              <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                                <input
                                  type="text"
                                  className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                  placeholder="Chain ID"
                                  {...register('chainId', {
                                    required: true,
                                  })}
                                  defaultValue={dataModal.chainId}
                                />
                              </div>
                              <div className="mt-1 text-sm text-primary-500">
                                <ErrorMessage errors={errors} name="chainId" />
                              </div>
                            </div>
                          )}
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              Name
                            </label>
                            <span className="text-xs"></span>
                            <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                placeholder="Name"
                                {...register('name', {
                                  required: true,
                                })}
                                defaultValue={dataModal.name}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="name" />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              Symbol
                            </label>
                            <span className="text-xs"></span>
                            <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                placeholder="Symbol"
                                {...register('symbol', {
                                  required: true,
                                })}
                                defaultValue={dataModal.symbol}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="symbol" />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              Mode
                            </label>
                            <span className="text-xs"></span>
                            <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                placeholder="Mode"
                                {...register('mode', {
                                  required: true,
                                })}
                                defaultValue={dataModal.mode}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="mode" />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              RPC Url
                            </label>
                            <span className="text-xs"></span>
                            <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                placeholder="RPC Url"
                                {...register('rpcUrl', {
                                  required: true,
                                })}
                                defaultValue={dataModal.rpcUrl}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage errors={errors} name="rpcUrl" />
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="block text-sm font-bold leading-6">
                              Explorer Url
                            </label>
                            <span className="text-xs"></span>
                            <div className="flex w-full items-center rounded-full bg-white dark:bg-neutral-900">
                              <input
                                type="text"
                                className="w-full rounded-full border-0 bg-transparent focus:outline-none focus:ring-primary-500"
                                placeholder="Explorer Url"
                                {...register('explorerUrl', {
                                  required: true,
                                })}
                                defaultValue={dataModal.explorerUrl}
                              />
                            </div>
                            <div className="mt-1 text-sm text-primary-500">
                              <ErrorMessage
                                errors={errors}
                                name="explorerUrl"
                              />
                            </div>
                          </div>
                          <ButtonPrimary onClick={handleSubmit(onSave)}>
                            Submit Chain
                          </ButtonPrimary>
                        </form>
                      </section>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950">
                  <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800 dark:text-white">
                    <span>
                      {errorVerify.isError
                        ? 'Error'
                        : 'Submitting your request'}
                    </span>
                    {errorVerify.isError && (
                      <div className="flex w-fit justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    )}
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="step-2 flex flex-col gap-3 p-5">
                          <div className="flex flex-col items-center gap-5">
                            {errorVerify.isError ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className="h-8 w-8 text-primary-500"
                                />
                                <span className="text-primary-500">
                                  {errorVerify.message}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="h-10 w-10 animate-ping rounded-lg bg-primary-100"></div>
                                <div className="text-center text-base leading-6">
                                  <span>
                                    Please wait for the data to be processed, do
                                    not disconnect the network
                                  </span>
                                </div>
                              </>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-3 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="step-2 flex flex-col gap-3 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-green-400">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-6xl font-bold text-green-400"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Chain is successfully processed
                            </h3>
                            <span>
                              Please check the table for latest value.
                            </span>
                          </div>
                          <div className="justiry-between flex w-full gap-2">
                            <ButtonPrimary onClick={closeModal}>
                              Close
                            </ButtonPrimary>
                          </div>
                        </div>
                      </section>
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
};

const ModalDelete = ({ isOpenModal, onClose, dataModal, refresh }) => {
  const { token } = useAuth();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorVerify, setErrorVerify] = useState({
    isError: false,
    message: '',
  });

  const onSave = async (data) => {
    setIsSubmit(true);
    setErrorVerify({
      isError: false,
      message: '',
    });

    try {
      const payload = data;

      const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Set the content type to JSON
        },
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/deletechain/${payload?.chainId}`,
        options,
      );

      if (response.ok) {
        // Data was saved successfully
        refresh();
        setIsSubmit(false);
        setIsCompleted(true);
        return response.json();
      } else {
        // Handle the error here
        const error = await response.json();
        setErrorVerify({
          isError: true,
          message: error.error.message,
        });
      }
    } catch (error) {
      // Handle any unexpected errors
      setErrorVerify({
        isError: true,
        message: error,
      });
    }
  };

  function closeModal() {
    if (errorVerify.isError || isCompleted || !isSubmit) {
      if (errorVerify.isError) {
        setIsSubmit(false);
        setErrorVerify({
          isError: false,
          message: '',
        });
      } else {
        setErrorVerify({
          isError: false,
          message: '',
        });
        setIsSubmit(false);
        setIsCompleted(false);
        onClose(false);
      }
    }
  }
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <Dialog.Title as="h3" className="px-6 pt-6 text-xl font-bold">
                    Delete Chain
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="flex w-full flex-col gap-2 overflow-y-auto p-6">
                        <p>
                          This data will deleted:
                          <br />
                          Symbol: {dataModal?.symbol}
                          <br />
                          Name: {dataModal?.name}
                          <br />
                          Mode: {dataModal?.mode}
                          <br />
                        </p>
                        <div className="flex gap-2">
                          <ButtonSecondary onClick={() => onSave(dataModal)}>
                            Delete
                          </ButtonSecondary>
                          <ButtonPrimary onClick={closeModal}>
                            Cancel
                          </ButtonPrimary>
                        </div>
                      </section>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-950">
                  <Dialog.Title className="flex justify-between text-xl font-bold text-neutral-800 dark:text-white">
                    <span>
                      {errorVerify.isError
                        ? 'Error'
                        : 'Submitting your request'}
                    </span>
                    {errorVerify.isError && (
                      <div className="flex w-fit justify-end">
                        <button
                          className="text-primary-500"
                          onClick={closeModal}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                    )}
                  </Dialog.Title>

                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <div className="text-gray-900 dark:text-white">
                        <section className="step-2 flex flex-col gap-3 p-5">
                          <div className="flex flex-col items-center gap-5">
                            {errorVerify.isError ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className="h-8 w-8 text-primary-500"
                                />
                                <span className="text-primary-500">
                                  {errorVerify.message}
                                </span>
                              </>
                            ) : (
                              <>
                                <div className="h-10 w-10 animate-ping rounded-lg bg-primary-100"></div>
                                <div className="text-center text-base leading-6">
                                  <span>
                                    Please wait for the data to be processed, do
                                    not disconnect the network
                                  </span>
                                </div>
                              </>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-3 text-left align-middle text-gray-900 shadow-xl transition-all dark:bg-neutral-950 dark:text-white">
                  <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                    <div className="relative mt-2 transform overflow-hidden text-left transition-all sm:w-full sm:max-w-lg">
                      <section className="step-2 flex flex-col gap-3 p-5">
                        <div className="flex flex-col items-center gap-5">
                          <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-green-400">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-6xl font-bold text-green-400"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-bold">
                              Chain is successfully deleted
                            </h3>
                            <span>
                              Please check the table for latest value.
                            </span>
                          </div>
                          <div className="justiry-between flex w-full gap-2">
                            <ButtonPrimary onClick={closeModal}>
                              Close
                            </ButtonPrimary>
                          </div>
                        </div>
                      </section>
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
};

export default AdminUserPage;
