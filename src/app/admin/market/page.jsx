'use client';
import Table, { Td } from '@/components/admin/table/table';
import ButtonPrimary from '@/components/button/buttonPrimary';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import {
  faAnglesLeft,
  faAnglesRight,
  faCheck,
  faCopy,
  faXmark,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import { useRouter } from 'next-nprogress-bar';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { useCopyToClipboard } from 'react-use';

const AdminUserPage = () => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(
    Array.from({ length: 500 }, (_, i) => i + 1),
  );
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [copyButtonStatus, setCopyButtonStatus] = useState(['']);
  const [_, copyToClipboard] = useCopyToClipboard();
  const [IsModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdateModal, setDataUpdateModal] = useState({});

  function handleCopyToClipboard(address, key) {
    copyToClipboard(address);
    setCopyButtonStatus((oldCopy) => [...oldCopy, key]);

    setTimeout(() => {
      setCopyButtonStatus((oldCopy) => oldCopy.filter((item) => item != key));
    }, 2500);
  }
  // Sample data for pagination
  // const data = Array.from({ length: 500 }, (_, i) => i + 1);

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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/market/items?page=${page}&limit=${perPage}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setIsLoading(false);
        setTotalPage(response.data.totalPages);
        setData([...response.data.nfts]);
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

  const handleOpenUpdateModal = (collectionAddress, tokenId) => {
    setDataUpdateModal({
      collectionAddress,
      tokenId,
    });
    setIsModalUpdateOpen(true);
  };

  const closeModalUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  return (
    <div>
      {/* Display your paginated data */}
      <div className="flex items-center justify-between py-5">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Market item lists
        </h3>
      </div>
      <Table>
        <thead>
          <tr>
            <th>NFTs</th>
            <th>Name</th>
            <th>Seller</th>
            {/* <th>Is Live Mint</th> */}
            <th>Is Live Auction</th>
            <th>Is Discover</th>
            <th>Is Blacklisted</th>
            <th>Chain</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="text-center" key={index}>
                <Td firstElement={true}>
                  <div className="flex justify-center gap-2">
                    <span>
                      {truncateAddress(item?.collection)} #{item?.tokenId}
                    </span>
                    <ButtonPrimary
                      className="h-6 !w-6 !p-0 text-xs"
                      onClick={() =>
                        handleCopyToClipboard(
                          item?.collection,
                          `token${item?.collection}#${item?.tokenId}`,
                        )
                      }
                    >
                      {copyButtonStatus.includes(
                        `token${item?.collection}#${item?.tokenId}`,
                      ) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </ButtonPrimary>
                  </div>
                </Td>
                <Td>{item?.nftDetails?.name}</Td>
                <Td>
                  <div className="flex justify-center gap-2">
                    <span>{truncateAddress(item?.seller)}</span>
                    <ButtonPrimary
                      className="h-6 !w-6 !p-0 text-xs"
                      onClick={() =>
                        handleCopyToClipboard(
                          item?.seller,
                          `owner${item?.collection}#${item?.tokenId}`,
                        )
                      }
                    >
                      {copyButtonStatus.includes(
                        `owner${item?.collection}#${item?.tokenId}`,
                      ) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </ButtonPrimary>
                  </div>
                </Td>
                {/* <Td>{item?.isLiveMint ? 'Yes' : 'No'}</Td> */}
                <Td>{item?.isAuctioned ? 'Yes' : 'No'}</Td>
                <Td>{item?.nftDetails?.isDiscover ? 'Yes' : 'No'}</Td>
                <Td>{item?.nftDetails?.isBlacklisted ? 'Yes' : 'No'}</Td>
                <Td>{item?.collectionData?.Chain?.symbol}</Td>
                <Td lastElement={true}>
                  <ButtonPrimary
                    className="!w-fit !py-1 text-sm"
                    onClick={() =>
                      handleOpenUpdateModal(item?.collection, item?.tokenId)
                    }
                  >
                    Discover
                  </ButtonPrimary>
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
      const payload = data;

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
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/setnftdiscover`,
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

  useEffect(() => {
    if (isOpenModal === true) {
      reset();
      onSave(dataModal);
    }
  }, [isOpenModal]);
  return (
    <>
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
                              NFTs is successfully discovered
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
