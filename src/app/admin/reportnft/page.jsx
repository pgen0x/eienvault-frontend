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
  faShareFromSquare,
  faXmark,
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
  const [copyButtonStatus, setCopyButtonStatus] = useState(['']);
  const [_, copyToClipboard] = useCopyToClipboard();
  const { token } = useAuth();
  const [IsModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdateModal, setDataUpdateModal] = useState({});

  function handleCopyToClipboard(address, key) {
    copyToClipboard(address);
    setCopyButtonStatus((oldCopy) => [...oldCopy, key]);
    console.log(copyButtonStatus);
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
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/allreportnft?query=${search}&page=${page}&limit=${perPage}`,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setTotalPage(response.data.totalPages);
        setData([...response.data.reports]);
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

  const handleSearch = (event) => {
    loadData();
    event.preventDefault();

    return false;
  };

  const handleOpenUpdateModal = (id, status) => {
    setDataUpdateModal({
      id,
      status,
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
          Request verification user lists
        </h3>
        {/* <form onSubmit={(event) => handleSearch(event)}>
          <div className="inline-flex h-10 w-full items-center justify-start gap-2 rounded-full border-0 border-gray-200 bg-white px-4 dark:bg-neutral-900">
            <div className="text-xl font-black text-neutral-700 dark:text-zinc-200">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              className="block h-8 w-full rounded-lg border-0 bg-transparent p-2.5 text-sm text-gray-900 focus:border-0 focus:ring-0  dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              type="text"
              placeholder="Search ..."
              aria-label="Search"
              name="search"
              defaultValue={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <div className="inline-flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-200 px-2">
              <div className="text-base font-light leading-normal text-neutral-700">
                /
              </div>
            </div>
          </div>
        </form> */}
      </div>
      <Table>
        <thead>
          <tr>
            <th>User Address</th>
            <th>Collection Address</th>
            <th>Token ID</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr className="text-center" key={index}>
                <Td firstElement={true}>
                  <div className="flex justify-center gap-2">
                    {truncateAddress(item.userAddress)}
                    <ButtonPrimary
                      className="h-6 !w-6 !p-0 text-xs"
                      onClick={() =>
                        handleCopyToClipboard(
                          item?.userAddress,
                          `${item?.userAddress}#${item?.id}`,
                        )
                      }
                    >
                      {copyButtonStatus.includes(
                        `${item?.userAddress}#${item?.id}`,
                      ) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </ButtonPrimary>
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-center gap-2">
                    {truncateAddress(item.collectionAddress)}
                    <ButtonPrimary
                      className="h-6 !w-6 !p-0 text-xs"
                      onClick={() =>
                        handleCopyToClipboard(
                          item?.collectionAddress,
                          `${item?.collectionAddress}#${item?.id}`,
                        )
                      }
                    >
                      {copyButtonStatus.includes(
                        `${item?.collectionAddress}#${item?.id}`,
                      ) ? (
                        <FontAwesomeIcon icon={faCheck} />
                      ) : (
                        <FontAwesomeIcon icon={faCopy} />
                      )}
                    </ButtonPrimary>
                  </div>
                </Td>
                <Td>
                  <div className="flex justify-center gap-2">
                    {item.tokenId}
                    <ButtonPrimary
                      className="flex h-6 !w-6 items-center justify-center !p-0 text-xs"
                      onClick={() =>
                        window.open(
                          `/nft/${item.collectionAddress}/${item.tokenId}`,
                          'blank',
                        )
                      }
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faShareFromSquare} />
                    </ButtonPrimary>
                  </div>
                </Td>
                <Td>{item.message}</Td>
                <Td lastElement={true}>
                  <ButtonPrimary
                    className="!w-fit !py-1 text-sm"
                    onClick={() => handleOpenUpdateModal(item.id, item.status)}
                  >
                    Update
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

export default AdminUserPage;
