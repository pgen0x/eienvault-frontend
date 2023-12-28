import Ethereum from '@/assets/icon/ethereum';
import HelaIcon from '@/assets/icon/hela';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import {
  faBan,
  faChevronDown,
  faCircle,
  faCircleCheck,
  faDotCircle,
  faEllipsis,
  faGavel,
  faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, Transition } from '@headlessui/react';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useEffect } from 'react';
import { Fragment, Suspense, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther, formatUnits, zeroAddress } from 'viem';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { ImageWithFallback } from '../imagewithfallback';
import LiveCountdown from '../slideshow/countdown';
import ButtonPrimary from '../button/buttonPrimary';
import ButtonTertiary from '../button/buttonTertiary';
import ButtonSecondary from '../button/buttonSecondary';
import NftMarker from '../marker/nftMarker';

export const NftItemDetail = ({
  gridList,
  openFilter,
  nft,
  showButton = true,
  collection,
  itemDetails,
  handleOpenModalBid,
  handleOpenModalBuy,
  handleOpenModalPutonsale,
  handleOpenModalShare,
  handleOpenModalReport,
  handleOpenModalRemove,
  isNotExpired,
  isNotRelease,
  releaseDate,
  endDate,
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
            showButton={showButton}
            collection={collection}
            itemDetails={itemDetails}
            handleOpenModalBid={handleOpenModalBid}
            handleOpenModalBuy={handleOpenModalBuy}
            handleOpenModalPutonsale={handleOpenModalPutonsale}
            handleOpenModalShare={handleOpenModalShare}
            handleOpenModalReport={handleOpenModalReport}
            handleOpenModalRemove={handleOpenModalRemove}
            isNotExpired={isNotExpired}
            isNotRelease={isNotRelease}
            releaseDate={releaseDate}
            endDate={endDate}
          />
        </div>
      )}
      {gridList === undefined && openFilter === undefined && (
        <Nft
          nft={nft}
          showButton={showButton}
          collection={collection}
          itemDetails={itemDetails}
          handleOpenModalBid={handleOpenModalBid}
          handleOpenModalBuy={handleOpenModalBuy}
          handleOpenModalPutonsale={handleOpenModalPutonsale}
          handleOpenModalShare={handleOpenModalShare}
          handleOpenModalReport={handleOpenModalReport}
          handleOpenModalRemove={handleOpenModalRemove}
          isNotExpired={isNotExpired}
          isNotRelease={isNotRelease}
          releaseDate={releaseDate}
          endDate={endDate}
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
  showButton,
  collection,
  itemDetails,
  handleOpenModalBid,
  handleOpenModalBuy,
  handleOpenModalPutonsale,
  handleOpenModalShare,
  handleOpenModalReport,
  handleOpenModalRemove,
  isNotExpired,
  isNotRelease,
  releaseDate,
  endDate,
}) => {
  const router = useRouter();
  const { address } = useAccount();
  const { token } = useAuth();
  const [selectedAddress, setSelectedAddress] = useState(
    itemDetails?.paidWith || zeroAddress,
  );
  const { data: balanceToken } = useBalance(
    selectedAddress == zeroAddress
      ? {
          address: address,
          watch: true,
        }
      : {
          address: address,
          token: selectedAddress,
          chainId:
            process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 8668 : 666888,
          watch: true,
        },
  );

  function getHighestBid(auctionData) {
    if (!auctionData.listOffers || auctionData.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
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
        toast.success(responseData.success.message);

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
    } catch (error) {}
  }

  const openOriginal = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {}, [endDate, releaseDate]);

  return (
    <div className="group h-[542px] w-full">
      <Suspense
        fallback={
          <div className="h-[290px] w-full animate-pulse rounded-2xl bg-gray-300" />
        }
      >
        {nft?.imageUri !== null ? (
          <Image
            className="z-10 h-[290px] w-full rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all dark:bg-zinc-900"
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
          <div className="z-10 flex h-[290px] w-full items-center justify-center rounded-2xl bg-white object-cover duration-300 ease-in-out group-hover:h-[250px] group-hover:transition-all dark:bg-zinc-900">
            <ButtonTertiary
              className="!w-fit"
              onClick={() =>
                refreshMetadata(nft.collectionAddress, nft.tokenId)
              }
            >
              Refresh Metadata
            </ButtonTertiary>
          </div>
        )}
      </Suspense>
      <div className="group/discover inline-flex w-full flex-col items-center justify-center px-3 lg:items-start">
        <div className="relative flex w-full flex-row">
          <div className="text-md absolute -top-[80px] z-10 w-full">
            <div className="flex h-[72px] w-full flex-col justify-end gap-2">
              {showButton && (
                <>
                  {itemDetails ? (
                    itemDetails?.isAuctioned ? (
                      <>
                        {address === nft?.owner ? (
                          <>
                            {isNotRelease ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faGavel} />
                                    <span>Auction</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      {isNotExpired ? (
                                        <>
                                          Starts in{' '}
                                          <LiveCountdown
                                            endDate={releaseDate}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          Ends in{' '}
                                          <LiveCountdown endDate={endDate} />
                                        </>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : isNotExpired ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faGavel} />
                                    <span>Auction</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      Ends in{' '}
                                      <LiveCountdown endDate={endDate} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="xs" icon={faGavel} />
                                  <span>Auction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="2xs" icon={faCircle} />
                                  <span>Ended</span>
                                </div>
                              </div>
                            )}
                          </>
                        ) : itemDetails?.listOffers &&
                          itemDetails?.listOffers.some(
                            (offer) => offer.address === address,
                          ) ? (
                          <NftMarker size="small">
                            <div className="flex items-center gap-2">
                              <FontAwesomeIcon size="xs" icon={faGavel} />
                              <span>Offer Already Made</span>
                            </div>
                          </NftMarker>
                        ) : (
                          <>
                            {isNotRelease ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faGavel} />
                                    <span>Auction</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      {isNotExpired ? (
                                        <>
                                          Starts in{' '}
                                          <LiveCountdown
                                            endDate={releaseDate}
                                          />
                                        </>
                                      ) : (
                                        <>
                                          Ends in{' '}
                                          <LiveCountdown endDate={endDate} />
                                        </>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : isNotExpired ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faGavel} />
                                    <span>Auction</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      Ends in{' '}
                                      <LiveCountdown endDate={endDate} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="xs" icon={faGavel} />
                                  <span>Auction</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="2xs" icon={faCircle} />
                                  <span>Ended</span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {address === nft?.owner ? (
                          <>
                            {isNotExpired ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faTags} />
                                    <span>On Sale</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      Ends in{' '}
                                      <LiveCountdown endDate={endDate} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="xs" icon={faTags} />
                                  <span>On Sale</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon size="2xs" icon={faCircle} />
                                  <span>Expired</span>
                                </div>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {isNotExpired ? (
                              <>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon size="xs" icon={faTags} />
                                    <span>On Sale</span>
                                  </div>
                                </div>
                                <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                  <div className="flex items-center gap-2">
                                    <FontAwesomeIcon
                                      size="2xs"
                                      icon={faCircle}
                                    />
                                    <span>
                                      Ends in{' '}
                                      <LiveCountdown endDate={endDate} />
                                    </span>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon
                                    className="w-[14px]"
                                    icon={faTags}
                                  />
                                  <span>On Sale</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FontAwesomeIcon
                                    className="w-[6px]"
                                    icon={faCircle}
                                  />
                                  <span>Expired</span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )
                  ) : (
                    <div className="flex w-fit items-center justify-between gap-2 rounded-lg bg-gray-50 bg-opacity-80 px-3 py-2 text-xs font-bold text-primary-500 backdrop-blur dark:bg-zinc-800 dark:bg-opacity-80 dark:text-white">
                      {address === nft?.owner ? (
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon size="xs" icon={faBan} />
                          <span>Not for sale</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon size="xs" icon={faBan} />
                          <span>Not for sale</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {/* <div className="flex items-center gap-2">
              <FontAwesomeIcon size="xs" icon={faGavel} />
              <span>{address === nft?.owner ? "" : itemDetails?.isAuctioned ? "Auction" : "On Sale"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon size="2xs" icon={faCircle} />
              <span>
                {isNotExpired ? (
                  <LiveCountdown endDate={endDate} />
                ) : (
                  'Expired'
                )}
              </span>
            </div> */}
            </div>
          </div>
          <div className="inline-flex w-full flex-col items-start justify-start gap-4 rounded-bl-2xl rounded-br-2xl bg-white p-3 backdrop-blur-xl dark:bg-neutral-900">
            <div className="flex w-full flex-col items-start justify-start">
              <div className="inline-flex items-center justify-between self-stretch">
                <div
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary-50 bg-opacity-70 p-2 dark:bg-neutral-700"
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
                    src={`${process.env.NEXT_PUBLIC_CDN_URL}/collections/${collection?.logo}`}
                  />
                  <div className="flex items-start justify-start gap-2">
                    <div className="text-xs font-medium leading-none text-neutral-900 dark:text-white">
                      {collection?.name
                        ? collection.name
                        : collection?.tokenAddress
                        ? truncateAddress(collection.tokenAddress)
                        : ''}
                    </div>
                    <div className="rounded-full text-xs font-black leading-none text-primary-500 dark:text-white">
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                  </div>
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button className="inline-flex w-full justify-center font-semibold text-gray-900 hover:text-primary-500 dark:text-white dark:hover:text-zinc-300">
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      aria-hidden="true"
                      className="p-2"
                    />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white p-2 text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-800 dark:text-white">
                      <div className="py-1">
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-gray-50 hover:text-neutral-900"
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
                            className="block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-gray-50 hover:text-neutral-900"
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
                            className="block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-gray-50 hover:text-neutral-900"
                            onClick={() =>
                              likes(nft?.collectionAddress, nft?.tokenId)
                            }
                          >
                            Like
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-gray-50 hover:text-neutral-900"
                            onClick={() => openOriginal(nft?.imageUri)}
                          >
                            Open Original
                          </button>
                        </Menu.Item>
                        <Menu.Item>
                          <button
                            className="block w-full rounded-md px-4 py-2 text-left text-sm hover:bg-gray-50 hover:text-neutral-900"
                            onClick={() =>
                              handleOpenModalReport(
                                nft?.tokenId,
                                nft?.collectionAddress,
                              )
                            }
                          >
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
                  className="line-clamp-2 flex h-[40px] items-center font-medium leading-[20px] text-gray-900 dark:text-white"
                  title={`${nft?.name} #${nft?.tokenId}`}
                >
                  {nft?.name} #{nft?.tokenId}
                </div>
                <div className="text-sm font-normal leading-tight text-neutral-900">
                  {(collection?.chainId === 666888 ||
                    collection?.chainId === 8668) && (
                    <HelaIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              <div className="mt-5 flex w-full justify-between rounded-md bg-gray-100 px-2 py-2 dark:bg-neutral-700 dark:text-white">
                <div className="flex flex-col items-start truncate text-sm leading-5">
                  <p>Price</p>
                  <p className="font-bold">
                    {selectedAddress == zeroAddress
                      ? formatEther(itemDetails?.price || 0)
                      : formatUnits(
                          itemDetails?.price || 0,
                          balanceToken?.decimals,
                        )}{' '}
                    {balanceToken?.symbol}
                  </p>
                </div>
                <div className="flex flex-col items-start truncate text-sm leading-5">
                  {itemDetails?.isAuctioned ? (
                    <>
                      <p>Highest bid</p>
                      <p className="font-bold">
                        {selectedAddress == zeroAddress
                          ? formatEther(getHighestBid(itemDetails).highestBid)
                          : formatUnits(
                              getHighestBid(itemDetails).highestBid,
                              balanceToken?.decimals,
                            )}{' '}
                        {balanceToken?.symbol}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Floor Price</p>
                      <p className="font-bold">
                        {collection?.floorPrice
                          ? formatEther(collection.floorPrice)
                          : '0.00'}{' '}
                        {balanceToken?.symbol}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="flex w-full flex-col items-center group-hover:gap-2">
                {showButton && (
                  <>
                    {itemDetails ? (
                      itemDetails?.isAuctioned ? (
                        <div className="mt-5 flex w-full items-center gap-4">
                          {address === nft?.owner ? (
                            <ButtonPrimary
                              onClick={() =>
                                handleOpenModalRemove(
                                  itemDetails?.marketId,
                                  nft?.tokenId,
                                  collection?.tokenAddress,
                                )
                              }
                            >
                              Remove Listing
                            </ButtonPrimary>
                          ) : itemDetails?.listOffers &&
                            itemDetails?.listOffers.some(
                              (offer) => offer.address === address,
                            ) ? (
                            <ButtonPrimary disabled>Place Bid</ButtonPrimary>
                          ) : (
                            <ButtonPrimary
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
                                isNotRelease
                                  ? true
                                  : isNotExpired
                                  ? false
                                  : true
                              }
                            >
                              {isNotRelease
                                ? 'Upcoming'
                                : isNotExpired
                                ? 'Place a Bid'
                                : 'Expired'}
                            </ButtonPrimary>
                          )}
                        </div>
                      ) : (
                        <div className="mt-5 flex w-full items-center gap-4">
                          {address === nft?.owner ? (
                            <ButtonPrimary
                              onClick={() =>
                                handleOpenModalRemove(
                                  itemDetails?.marketId,
                                  nft?.tokenId,
                                  collection?.tokenAddress,
                                )
                              }
                            >
                              Remove Listing
                            </ButtonPrimary>
                          ) : (
                            <ButtonPrimary
                              onClick={() =>
                                handleOpenModalBuy(
                                  itemDetails?.marketId,
                                  itemDetails?.price,
                                  nft?.imageUri,
                                  nft?.name,
                                  nft?.tokenId,
                                  collection?.tokenAddress,
                                  collection?.Chain?.symbol,
                                  collection?.Chain?.name,
                                  collection?.chainId,
                                  balanceToken?.symbol,
                                  itemDetails?.paidWith,
                                )
                              }
                              disabled={!isNotExpired}
                            >
                              {isNotExpired ? 'Buy Now' : 'Expired'}
                            </ButtonPrimary>
                          )}
                        </div>
                      )
                    ) : (
                      <div className="mt-5 flex w-full items-center gap-4">
                        {address === nft?.owner ? (
                          <ButtonPrimary
                            onClick={() =>
                              handleOpenModalPutonsale(
                                nft?.tokenId,
                                nft?.collectionAddress,
                              )
                            }
                          >
                            Put On Sale
                          </ButtonPrimary>
                        ) : (
                          <ButtonPrimary disabled={true}>Buy Now</ButtonPrimary>
                        )}
                      </div>
                    )}
                  </>
                )}
                <ButtonSecondary
                  className={`duration-800 h-0 overflow-hidden !py-0 opacity-0 group-hover:h-auto group-hover:!py-2 group-hover:opacity-100 group-hover:transition-all group-hover:duration-300 group-hover:ease-in-out ${
                    showButton ? '' : 'mt-2'
                  }`}
                  onClick={() =>
                    router.push(`/nft/${nft.collectionAddress}/${nft.tokenId}`)
                  }
                >
                  View Detail
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
