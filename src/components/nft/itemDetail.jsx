import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import {
  faChevronDown,
  faCircleCheck,
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { Fragment, Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';
import { useAccount, useNetwork } from 'wagmi';
import { ImageWithFallback } from '../imagewithfallback';

export const NftItemDetail = ({
  gridList,
  openFilter,
  nft,
  collection,
  itemDetails,
  handleOpenModalBid,
  handleOpenModalBuy,
  handleOpenModalPutonsale,
  handleOpenModalShare,
  isNotExpired,
  isNotRelease,
}) => {
  return (
    <>
      {gridList !== undefined && openFilter !== undefined && (
        <div
          className={`group col-span-12 h-[542px] w-full sm:col-span-6 sm:h-[542px] md:h-[542px] lg:h-[542px] xl:h-[542px] 2xl:h-[542px] ${
            gridList === 'grid'
              ? openFilter
                ? 'md:col-span-6 xl:col-span-4 2xl:col-span-4'
                : 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
              : openFilter
              ? 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
              : 'md:col-span-3 xl:col-span-2 2xl:col-span-2'
          }`}
        >
          <Nft
            nft={nft}
            collection={collection}
            itemDetails={itemDetails}
            handleOpenModalBid={handleOpenModalBid}
            handleOpenModalBuy={handleOpenModalBuy}
            handleOpenModalPutonsale={handleOpenModalPutonsale}
            handleOpenModalShare={handleOpenModalShare}
            isNotExpired={isNotExpired}
            isNotRelease={isNotRelease}
          />
        </div>
      )}
      {gridList === undefined && openFilter === undefined && (
        <Nft
          nft={nft}
          collection={collection}
          itemDetails={itemDetails}
          handleOpenModalBid={handleOpenModalBid}
          handleOpenModalBuy={handleOpenModalBuy}
          handleOpenModalPutonsale={handleOpenModalPutonsale}
          handleOpenModalShare={handleOpenModalShare}
          isNotExpired={isNotExpired}
          isNotRelease={isNotRelease}
        />
      )}
    </>
  );
};

export const NftItemDetailSkeleton = ({ gridList, openFilter }) => {
  return (
    <div
      className={`group col-span-12 h-[542px] w-full sm:col-span-6 sm:h-[542px] md:h-[542px] lg:h-[542px] xl:h-[542px] 2xl:h-[542px] ${
        gridList === 'grid'
          ? openFilter
            ? 'md:col-span-6 xl:col-span-4 2xl:col-span-4'
            : 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : openFilter
          ? 'md:col-span-4 xl:col-span-3 2xl:col-span-3'
          : 'md:col-span-3 xl:col-span-2 2xl:col-span-2'
      }`}
    >
      <div className="group h-[542px] w-full">
        <div className="h-[250px] w-full animate-pulse rounded-2xl bg-gray-300" />
        <div className="inline-flex w-full flex-col items-center justify-center lg:flex-row lg:items-start">
          <div className="relative flex w-full flex-row px-5">
            <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-b-2xl bg-white/60 p-3 backdrop-blur">
              <div className="flex w-full flex-col items-start justify-start">
                <div className="mt-2 inline-flex items-center justify-between self-stretch">
                  <div className="flex items-center justify-center gap-2 rounded-lg p-2">
                    <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                    <div className="flex items-start justify-start gap-2">
                      <div className="h-4 w-16 animate-pulse rounded-lg bg-gray-300" />
                    </div>
                  </div>
                  <div className="items-center">
                    <div className="h-2 w-6 animate-pulse rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="mb-5 mt-3 inline-flex w-full items-center justify-between gap-2 pt-1">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  <div className="h-4 w-4 animate-pulse rounded-2xl bg-gray-300" />
                </div>
                <div className="mb-5 mt-3 flex w-full justify-between py-2">
                  <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                  <div className="hidden shrink-0 truncate text-sm leading-5 sm:flex sm:flex-col sm:items-start">
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                    <div className="mt-2 h-3 w-24 animate-pulse rounded-full bg-gray-300" />
                  </div>
                </div>
                <div className="mt-5 flex w-full items-center">
                  {/* <div className="mr-5 h-12 w-16 animate-pulse rounded-full bg-gray-300 p-3" /> */}
                  <div className="h-12 w-full animate-pulse rounded-full bg-gray-300 p-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Nft = ({
  nft,
  collection,
  itemDetails,
  handleOpenModalBid,
  handleOpenModalBuy,
  handleOpenModalPutonsale,
  handleOpenModalShare,
  isNotExpired,
  isNotRelease,
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const { token } = useAuth();
  const [openEllipsis, setOpenEllipsis] = useState(false);

  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0.00', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
    }

    let highestBid = BigInt(0);
    let highestBidder = null;

    for (const offer of auctionData.listOffers) {
      const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
      if (bidValue > highestBid) {
        highestBid = bidValue;
        highestBidder = offer.address;
      }
    }

    return {
      message: 'Highest bid found',
      highestBid: highestBid.toString(),
      highestBidder,
    };
  }

  function getLowestBid(auctionData) {
    if (auctionData.listOffers.length === 0) {
      return 0; // Return a message if there are no bids
    }

    let lowestBid = Infinity; // Initialize to a large number

    for (const offer of auctionData.listOffers) {
      const bidValue = BigInt(offer.value); // Convert the value to a BigInt for precision
      if (bidValue < lowestBid) {
        lowestBid = bidValue;
      }
    }

    return lowestBid.toString(); // Convert the lowestBid back to a string
  }

  async function refreshMetadata(collectionAddress, tokenId) {
    const bodyData = {
      collectionAddress,
      tokenId,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/refreshmetadata`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify(bodyData),
        },
      );
      if (!res.ok) {
        const errorMessage = await res.json();
        toast.error(errorMessage.error.messages);
      }
      const responseData = await res.json();
      toast.success('Refresh metada successfully');
      window.location.reload();
    } catch (error) {
      console.error('error likes:', error);
    }
  }

  const likes = async (collectionAddress, tokenId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/likes/${collectionAddress}/${tokenId}`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
        },
      );

      if (!res.ok) {
        const errorMessage = await res.json();
        toast.error(errorMessage.error.messages);
      } else {
        const responseData = await res.json();
        toast.success(responseData.success.messages);

        setCountLikes(countLikes + 1);
      }
    } catch (error) {
      console.error('error likes:', error);
    }
  };

  async function refreshMetadata(collectionAddress, tokenId) {
    const bodyData = {
      collectionAddress,
      tokenId,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/refreshmetadata`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: JSON.stringify(bodyData),
        },
      );
      if (!res.ok) {
        console.error('Refresh metadata failed:', res);
        const errorMessage = await res.json();
        toast.error(errorMessage.error.messages);
      }
      const responseData = await res.json();
      toast.success('Refresh metada successfully');
      window.location.reload();
    } catch (error) {
      console.error('error likes:', error);
    }
  }

  const openOriginal = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="group h-[542px] w-full">
      <Suspense
        fallback={
          <div className="h-[290px] w-full animate-pulse rounded-2xl bg-gray-300" />
        }
      >
        {nft?.imageUri !== null ? (
          <Image
            className="z-10 h-[290px] w-full rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all"
            width={600}
            height={600}
            placeholder="blur"
            blurDataURL={`https://fakeimg.pl/600x600`}
            src={nft?.imageUri}
            alt={
              collection?.name
                ? collection?.name
                : nft.collectionAddress
                ? nft.collectionAddress
                : ''
            }
          />
        ) : (
          <div className="z-10 flex h-[290px] w-full items-center justify-center rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all">
            <button
              className="rounded-full border border-primary-500 bg-transparent px-2 py-2 text-sm font-semibold text-primary-500 hover:border-primary-300 hover:text-primary-300"
              onClick={() =>
                refreshMetadata(nft.collectionAddress, nft.tokenId)
              }
            >
              Refresh Metadadata
            </button>
          </div>
        )}
      </Suspense>
      <div className="group/discover inline-flex w-full flex-col items-center justify-center px-3 lg:items-start">
        <div className="relative flex w-full flex-row">
          <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white bg-opacity-50 p-3 backdrop-blur-xl dark:bg-zinc-700">
            <div className="flex w-full flex-col items-start justify-start">
              <div className="inline-flex items-center justify-between self-stretch">
                <div
                  className="flex items-center justify-center gap-2 cursor-pointer rounded-lg bg-white bg-opacity-70 p-2 dark:bg-zinc-500"
                  onClick={() =>
                    router.push(`/collection/${nft.collectionAddress}`)
                  }
                >
                  <ImageWithFallback
                    className="h-full w-full rounded-2xl "
                    width={16}
                    height={16}
                    alt={
                      collection?.name
                        ? collection?.name
                        : nft.collectionAddress
                        ? nft.collectionAddress
                        : ''
                    }
                    diameter={16}
                    address={nft?.collectionAddress}
                    src={`/uploads/collections/${collection?.logo}`}
                  />
                  <div className="flex items-start justify-start gap-2">
                    <div className="text-xs font-medium leading-none text-neutral-700 dark:text-white">
                      {collection?.name
                        ? collection.name
                        : collection?.tokenAddress
                        ? truncateAddress(collection.tokenAddress)
                        : ''}
                    </div>
                    <div className="text-xs font-black leading-none text-primary-500">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex w-full justify-center font-semibold text-gray-900 hover:text-primary-500">
                    <FontAwesomeIcon icon={faEllipsis} aria-hidden="true" className="p-2" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm text-black hover:bg-gray-50 hover:text-primary-500"
                            onClick={() =>
                              refreshMetadata(
                                nft?.collectionAddress,
                                nft?.tokenId,
                              )
                            }
                          >
                            Refresh Metadata
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm text-black hover:bg-gray-50 hover:text-primary-500"
                            onClick={() =>
                              handleOpenModalShare(
                                nft?.tokenId,
                                nft?.collectionAddress,
                              )
                            }
                          >
                            Share
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm text-black hover:bg-gray-50 hover:text-primary-500"
                            onClick={() =>
                              likes(nft?.collectionAddress, nft?.tokenId)
                            }
                          >
                            Like
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm text-black hover:bg-gray-50 hover:text-primary-500"
                            onClick={() => openOriginal(nft?.imageUri)}
                          >
                            Open Original
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button className="block w-full rounded-md px-4 py-2 text-left text-sm text-black hover:bg-gray-50 hover:text-primary-500">
                            Report
                          </button>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="inline-flex w-full items-center justify-between gap-2 pt-1">
                <div
                  className="line-clamp-2 flex h-[40px] items-center font-medium leading-[20px] text-gray-600 dark:text-white"
                  title={`${nft?.name} #${nft?.tokenId}`}
                >
                  {nft?.name} #{nft?.tokenId}
                </div>
                <div className="text-sm font-normal leading-tight text-neutral-700">
                  {(collection?.chainId === 666888 ||
                    collection?.chainId === 8668) && (
                    <HelaIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              <div className="mt-5 flex w-full justify-between rounded-md bg-white px-2 py-2 dark:bg-zinc-500 dark:text-white">
                <div className="flex flex-col items-start truncate text-sm leading-5">
                  <p>Price</p>
                  <p className="font-bold">
                    {itemDetails?.price
                      ? formatEther(Number(itemDetails?.price))
                      : '0.00'}{' '}
                    {collection?.Chain.symbol ? collection.Chain.symbol : '-'}
                  </p>
                </div>
                <div className="flex flex-col items-start truncate text-sm leading-5">
                  {itemDetails?.isAuctioned ? (
                    <>
                      <p>Highest bid</p>
                      <p className="font-bold">
                        {formatEther(
                          Number(getHighestBid(itemDetails).highestBid),
                        )}{' '}
                        {collection?.Chain.symbol
                          ? collection.Chain.symbol
                          : '-'}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Floor Price</p>
                      <p className="font-bold">
                        {collection?.floorPrice
                          ? formatEther(Number(collection.floorPrice))
                          : '0.00'}{' '}
                        {collection?.Chain.symbol
                          ? collection.Chain.symbol
                          : '-'}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-5 flex w-full items-center gap-2">
                {itemDetails ? (
                  itemDetails?.isAuctioned ? (
                    <div className="mt-5 flex w-full items-center gap-4">
                      {address === nft?.owner ? (
                        <button className="w-full rounded-full border border-primary-500 bg-white px-4 py-2 text-center text-base font-bold text-primary-500 hover:bg-primary-300">
                          Owned By You
                        </button>
                      ) : (
                        <button
                          className="w-full rounded-full border border-primary-500 bg-white px-4 py-2 text-center text-base font-bold text-primary-500 hover:bg-primary-300"
                          onClick={() =>
                            handleOpenModalBid(
                              itemDetails?.marketId,
                              itemDetails?.listingPrice,
                              nft?.imageUri,
                              nft?.tokenId,
                              itemDetails?.price,
                              nft?.name,
                              collection,
                              getHighestBid(itemDetails),
                              formatEther(getLowestBid(itemDetails)),
                            )
                          }
                          disabled={
                            isNotRelease ? true : isNotExpired ? false : true
                          }
                        >
                          {isNotRelease
                            ? 'Upcoming'
                            : isNotExpired
                            ? 'Place a Bid'
                            : 'Expired'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="mt-5 flex w-full items-center gap-4">
                      {address === nft?.owner ? (
                        <button className="w-full rounded-full border border-primary-500 bg-white px-4 py-2 text-center text-base font-bold text-primary-500 hover:bg-primary-300">
                          Owned By You
                        </button>
                      ) : (
                        <button
                          className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                          onClick={() =>
                            handleOpenModalBuy(
                              itemDetails?.marketId,
                              itemDetails?.price,
                              nft?.imageUri,
                              nft?.name,
                              nft?.tokenId,
                              collection?.Chain?.symbol,
                              collection?.Chain?.name,
                            )
                          }
                          disabled={!isNotExpired}
                        >
                          {isNotExpired ? 'Buy Now' : 'Expired'}
                        </button>
                      )}
                    </div>
                  )
                ) : (
                  <div className="mt-5 flex w-full items-center gap-4">
                    {address === nft?.owner ? (
                      <button
                        onClick={() =>
                          handleOpenModalPutonsale(
                            nft?.tokenId,
                            nft?.collectionAddress,
                          )
                        }
                        className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                      >
                        Put On Sale
                      </button>
                    ) : (
                      <button className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300">
                        Not For Sale
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={() =>
                  router.push(`/nft/${nft.collectionAddress}/${nft.tokenId}`)
                }
                className="duration-800 mt-2 h-0 w-full overflow-hidden rounded-full bg-white text-center font-bold text-primary-500 opacity-0 ease-in-out hover:bg-primary-50 group-hover:h-auto group-hover:py-2 group-hover:opacity-100 group-hover:transition-all dark:bg-zinc-600 dark:text-white dark:hover:bg-zinc-500"
              >
                View Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
