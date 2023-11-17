'use client';
import Table, { Td } from '@/components/admin/table/table';
import AdminTable from '@/components/admin/table/table';
import ButtonPrimary from '@/components/button/buttonPrimary';
import ButtonSecondary from '@/components/button/buttonSecondary';
import { truncateAddress } from '@/utils/truncateAddress';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import {
  faAnglesLeft,
  faAnglesRight,
  faCheck,
  faCopy,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
  const [copyButtonStatus, setCopyButtonStatus] = useState([""]);
  const [_, copyToClipboard] = useCopyToClipboard();

  function handleCopyToClipboard(address, key) {
    copyToClipboard(address);
    setCopyButtonStatus((oldCopy) => [...oldCopy, key]);
    console.log(copyButtonStatus);
    setTimeout(() => {
      setCopyButtonStatus((oldCopy) =>
        oldCopy.filter((item) => item != key),
      );
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
            <th>Owner</th>
            <th>Is Live Mint</th>
            <th>Is Live Auction</th>
            <th>Is Discover</th>
            <th>Is Listed</th>
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
                  <span>{truncateAddress(item?.collection)} #${item?.tokenId}</span>
                  <ButtonSecondary
                    className="h-6 !w-6 !p-0 text-xs"
                    onClick={() => handleCopyToClipboard(item?.collection, `token${item?.collection}#${item?.tokenId}`)}
                  >
                    {copyButtonStatus.includes(`token${item?.collection}#${item?.tokenId}`) ? (
                      <FontAwesomeIcon icon={faCheck} fontSize={16} />
                    ) : (
                      <FontAwesomeIcon icon={faCopy} fontSize={16} />
                    )}
                  </ButtonSecondary>
                </Td>
                <Td>{item?.name}</Td>
                <Td>
                  <span>{truncateAddress(item?.owner)}</span>
                  <ButtonSecondary
                    className="h-6 !w-6 !p-0 text-xs"
                    onClick={() => handleCopyToClipboard(item?.owner, `owner${item?.collection}#${item?.tokenId}`)}
                  >
                    {copyButtonStatus.includes(`owner${item?.collection}#${item?.tokenId}`) ? (
                      <FontAwesomeIcon icon={faCheck} fontSize={16} />
                    ) : (
                      <FontAwesomeIcon icon={faCopy} fontSize={16} />
                    )}
                  </ButtonSecondary>
                </Td>
                <Td>{item?.isLiveMint ? 'Yes' : 'No'}</Td>
                <Td>{item?.isLiveAuction ? 'Yes' : 'No'}</Td>
                <Td>{item?.isDiscover ? 'Yes' : 'No'}</Td>
                <Td>{item?.isListed ? 'Yes' : 'No'}</Td>
                <Td>{item?.isBlacklisted ? 'Yes' : 'No'}</Td>
                <Td>{item?.Collection?.Chain?.symbol}</Td>
                <Td lastElement={true}>
                  <ButtonPrimary className="!w-fit !py-1 text-sm">
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
    </div>
  );
};

export default AdminUserPage;
