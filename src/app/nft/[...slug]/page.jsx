'use client';
import Footer from '@/components/footer/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCartPlus,
  faCheck,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faEllipsisVertical,
  faEye,
  faFingerprint,
  faList,
  faPenToSquare,
  faRotate,
  faUpRightFromSquare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendar,
  faFlag,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import Ethereum from '@/assets/icon/ethereum';
import SlideshowActivities from '@/components/slideshow/activities';
import Castle from '@/assets/icon/castle';
import Castle2 from '@/assets/icon/castle2';
import Awan3 from '@/assets/icon/awan3';
import Awan4 from '@/assets/icon/awan4';
import Flower from '@/assets/icon/flower';
import { useEffect, useState } from 'react';
import Opensea from '@/assets/icon/opensea';
import { Listbox } from '@headlessui/react';
import DatePicker from 'tailwind-datepicker-react';
import { useRouter } from 'next-nprogress-bar';
import { useAccount, useWalletClient } from 'wagmi';
import Image from 'next/legacy/image';
import { truncateAddress4char } from '@/utils/truncateAddress4char';
import { truncateAddress } from '@/utils/truncateAddress';
import { ImageWithFallback } from '@/components/imagewithfallback';
import HelaIcon from '@/assets/icon/hela';
import { formatEther, parseEther } from 'viem';
const accounts = ['0x30756...Fb179', '0x30756...Zi57G', '0x30756...Gy352'];
import { notFound } from 'next/navigation';
import ModalBid from '@/components/modal/bid';
import { marketplaceABI } from '@/hooks/eth/Artifacts/Marketplace_ABI';

export default function NFTDetails({ params }) {
  const router = useRouter();
  const [modalBuy, setModalBuy] = useState(false);
  const [modalBid, setModalBid] = useState(false);
  const [modalPropose, setModalPropose] = useState(false);
  const [stepBuy, setStepBuy] = useState(1);
  const [stepBid, setStepBid] = useState(1);
  const [stepPropose, setStepPropose] = useState(1);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [showDueDate, setShowDueDate] = useState(false);
  const [selectedDueDate, setSelectedDueDate] = useState();
  const [agreePropose, setAgreePropose] = useState(false);
  const handleChangeDueDate = (selectedDate) => {
    setSelectedDueDate(selectedDate);
  };
  const handleCloseDueDate = (state) => {
    setShowDueDate(state);
  };

  const handleModalBuy = () => {
    if (modalBuy) {
      handleStepBuy(1);
    }
    setModalBuy(!modalBuy);
  };

  const handleStepBuy = (step) => {
    setStepBuy(step);
  };

  const handleModalBid = () => {
    if (modalBid) {
      handleStepBid(1);
    }
    setModalBid(!modalBid);
  };

  const handleStepBid = (step) => {
    setStepBid(step);
  };

  const handleModalPropose = () => {
    if (modalPropose) {
      handleStepPropose(1);
      setAgreePropose(false);
      setSelectedAccount(accounts[0]);
    }
    setModalPropose(!modalPropose);
  };

  const handleStepPropose = (propose) => {
    setStepPropose(propose);
  };

  const handleAgreePropose = () => {
    setAgreePropose(!agreePropose);
  };

  const options = {
    autoHide: true,
    todayBtn: true,
    clearBtn: true,
    maxDate: new Date('2030-01-01'),
    minDate: new Date('1950-01-01'),
    theme: {
      background: 'bg-white dark:bg-gray-800',
      todayBtn: 'bg-primary-500',
      clearBtn: '',
      icons: '',
      text: '',
      disabledText: 'bg-gray-200 text-gray-300 cursor:disable',
      input: '',
      inputIcon: '',
      selected: '',
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <FontAwesomeIcon icon={faChevronLeft} />,
      next: () => <FontAwesomeIcon icon={faChevronRight} />,
    },
    datepickerClassNames: 'top-12',
    inputNameProp: 'text',
    defaultDate: new Date(),
    language: 'en',
  };

  const { address } = useAccount();
  const [dataNFTs, setDataNfts] = useState([]);
  const [isLoadingDataNft, setIsLoadingDataNFTs] = useState(true);
  const [isErrorDataNft, setIsErrorDataNFTs] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [auctionData, setAcutionData] = useState({});

  const collectionAddress = params.slug[0];
  const tokenId = params.slug[1];
  const { data: walletClient } = useWalletClient();

  const fetchNFTInfo = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/nfts/getbytokenid/${collectionAddress}/${tokenId}`,
        {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.status === 404) {
        setIsErrorDataNFTs(true);
        setDataNfts([]);
      } else if (!res.ok) {
        setIsErrorDataNFTs(true);
        console.error('Fetch failed:', res);
      } else {
        const responseData = await res.json();
        console.log(responseData);
        setDataNfts(responseData);
      }
    } catch (error) {
      setIsErrorDataNFTs(true);
      console.error('Fetch failed:', error);
    } finally {
      setIsLoadingDataNFTs(false);
    }
  };

  useEffect(() => {
    if (dataNFTs) {
      fetchNFTInfo();
    }
  }, []);

  function getHighestBid(data) {
    if (!data.listOffers || data.listOffers.length === 0) {
      return { message: 'No bids', highestBid: '0', highestBidder: null }; // Return a message if there are no bids or if listOffers is null/undefined
    }

    let highestBid = BigInt(0);
    let highestBidder = null;

    for (const offer of data.listOffers) {
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
      return 'No bids'; // Return a message if there are no bids
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

  const handleOpenModalBid = async (
    marketId,
    listingPrice,
    imageUri,
    tokenId,
    price,
    name,
    collectionData,
    highestBid,
    lowestBid,
  ) => {
    setAcutionData({
      marketId,
      listingPrice,
      imageUri,
      tokenId,
      price,
      name,
      collectionData,
      highestBid,
      lowestBid,
    });
    setIsOpenModal(true);
  };

  function closeModal() {
    setIsOpenModal(false);
  }

  const placeBid = async (marketId, price) => {
    try {
      const hash = await walletClient.writeContract({
        ...marketplaceABI,
        functionName: 'makeAnOfferNative',
        args: [marketId, price],
        account: address,
        value: price,
      });
      setPlaceBidHash(hash);
      return hash;
    } catch (error) {
      console.error('Error Make an Offer', error);
    }
  };

  if (!isLoadingDataNft && isErrorDataNft) {
    notFound();
  }

  return (
    <>
      {/* <section className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
        <div className="w-full">
          <div className="h-[266px] bg-gray-300 object-cover" />
        </div>
      </section> */}
      <div className="container m-auto mb-5 p-3">
        {!isLoadingDataNft ? (
          <section>
            <div className="mt-5 flex w-full flex-col gap-4 sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <div className="flex w-full flex-col gap-4">
                <Image
                  className="w-full rounded-2xl object-fill lg:w-96"
                  width={600}
                  height={600}
                  placeholder="blur"
                  blurDataURL={dataNFTs?.imageUri}
                  src={dataNFTs?.imageUri}
                />
                <div className="relative -mt-16 px-5">
                  <div className="flex rounded-lg bg-white/50 px-5 py-2 text-gray-900 backdrop-blur-sm sm:text-gray-900 md:text-gray-900 lg:text-primary-500 xl:text-primary-500 2xl:text-primary-500">
                    <div className="flex w-full justify-around">
                      <button className="">
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="text-primary-500"
                        />{' '}
                        <span className="font-semibold">7 likes</span>
                      </button>
                      <button className="">
                        <FontAwesomeIcon
                          icon={faShareFromSquare}
                          className="text-primary-500"
                        />{' '}
                        <span className="font-semibold">Share</span>
                      </button>
                      <button className="">
                        <FontAwesomeIcon
                          icon={faFlag}
                          className="text-primary-500"
                        />{' '}
                        <span className="font-semibold">Report</span>
                      </button>
                    </div>
                    <div>
                      <FontAwesomeIcon
                        icon={faEllipsisVertical}
                        className="text-primary-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="hidden sm:hidden md:block lg:block xl:block 2xl:block">
                  <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-primary-500">
                    <li className="cursor-pointer px-5 pb-3">Overview</li>
                    <li className="cursor-pointer px-5 pb-3">Bids</li>
                    <li className="cursor-pointer px-5 pb-3">History</li>
                    <li className="cursor-pointer border-b-4 border-primary-500 px-5 pb-3">
                      Collateral
                    </li>
                  </ul>
                  <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg">Current Owner</h3>
                        <div className="flex w-fit items-center justify-center gap-2">
                          <img
                            className="h-7 w-7 rounded-2xl"
                            src="https://via.placeholder.com/48x48"
                          />
                          <div className="font-medium leading-none text-neutral-700">
                            Ron31
                          </div>
                        </div>
                      </div>
                      <div>No owner proposal yet.</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Propose an ETH lend to the owner
                      </h3>
                      <p>No owner lender proposes the offer yet.</p>
                    </div>
                    <button
                      onClick={handleModalPropose}
                      className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300"
                    >
                      Propose an offer
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <div className="flex w-full justify-around gap-4 text-white">
                  {address === dataNFTs.owner && (
                    <>
                      <button className="w-full rounded-full bg-primary-500 py-2 hover:bg-primary-300">
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit detail
                        item
                      </button>
                      <button className="w-full rounded-full bg-primary-500 py-2 hover:bg-primary-300">
                        <FontAwesomeIcon icon={faList} /> List item
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-5 flex flex-col gap-4 text-gray-900">
                  <h2 className="text-2xl font-bold">
                    {dataNFTs.name} #{dataNFTs.tokenId}
                  </h2>
                  <div className="flex w-full justify-around rounded-xl bg-white p-5">
                    <div className="px-5">
                      <h3 className="text-lg font-semibold">Creator</h3>
                      <div className="flex">
                        <div className="flex w-fit items-center justify-center gap-2">
                          <ImageWithFallback
                            className="h-full w-full rounded-2xl "
                            width={28}
                            height={28}
                            alt={dataNFTs.collectionData?.User?.walletAddress}
                            diameter={28}
                            address={
                              dataNFTs.collectionData?.User?.walletAddress
                            }
                            src={`/uploads/user/${dataNFTs.collectionData.User?.logo}`}
                          />
                          <div className="font-medium leading-none text-neutral-700">
                            {dataNFTs.collectionData?.User?.username
                              ? dataNFTs.collectionData?.User?.username
                              : truncateAddress4char(
                                  dataNFTs.collectionData?.userAddress,
                                )}
                          </div>

                          {dataNFTs.collectionData?.User?.isVerified && (
                            <div className="font-black leading-none text-primary-500">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="inline-block w-[1px] self-stretch bg-neutral-100 opacity-100 dark:opacity-50"></div>
                    <div className="px-5">
                      <h3 className="text-lg font-semibold">Current Owner</h3>
                      <div className="flex w-fit items-center justify-center gap-2">
                        <ImageWithFallback
                          className="h-full w-full rounded-2xl "
                          width={28}
                          height={28}
                          alt={dataNFTs.sellerData?.walletAddress}
                          diameter={28}
                          address={dataNFTs.sellerData?.walletAddress}
                          src={`/uploads/user/${dataNFTs.sellerData?.logo}`}
                        />
                        <div className="font-medium leading-none text-neutral-700">
                          {dataNFTs.sellerData?.username
                            ? dataNFTs.sellerData?.username
                            : truncateAddress4char(
                                dataNFTs.sellerData?.walletAddress,
                              )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid w-full grid-cols-12 justify-around gap-4 rounded-xl bg-white p-5 text-gray-900">
                    <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                      {(dataNFTs.collectionData?.chainId === 666888 ||
                        dataNFTs.collectionData?.chainId === 8668) && (
                        <HelaIcon className="h-6 w-6" />
                      )}
                      <span className="font-semibold">
                        Helachain <br />({dataNFTs?.ContractType})
                      </span>
                    </div>
                    <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                      <FontAwesomeIcon icon={faFingerprint} />
                      <span className="font-semibold">Helascan</span>
                      <a
                        href={`https://testnet-blockexplorer.helachain.com/token/${dataNFTs.collectionAddress}/instance/${dataNFTs.tokenId}/token-transfers`}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary-300"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          className="text-primary-500"
                          icon={faUpRightFromSquare}
                        />
                      </a>
                    </div>
                    <div className="col-span-6 flex items-center gap-2 sm:col-span-6 md:col-span-4 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
                      <FontAwesomeIcon icon={faEye} />
                      <span className="font-semibold">View original</span>
                      <a
                        href={`${dataNFTs.imageUri}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-primary-300"
                        target="_blank"
                      >
                        <FontAwesomeIcon
                          className="text-primary-500"
                          icon={faUpRightFromSquare}
                        />
                      </a>
                    </div>
                  </div>
                  <div className="w-full rounded-xl bg-white p-5 text-gray-900">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">Royalties</h3>
                      <span className="h-6 rounded-lg bg-gray-600 p-1 text-xs text-white">
                        {Number(dataNFTs.royalties) / 100}%
                      </span>
                    </div>
                    <p>
                      Split royalties are automatically deposited into each
                      recipient&lsquo;s wallet.
                    </p>
                  </div>
                  <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-5 text-gray-900">
                    <div className="flex gap-2">
                      {dataNFTs.itemDetails?.isAuctioned && (
                        <div>
                          Auction starts in :{' '}
                          <span className="font-bold">1d 1h 23m 40s</span>
                        </div>
                      )}

                      <button className="font-bold text-primary-500 hover:text-primary-300">
                        <FontAwesomeIcon icon={faRotate} /> Refresh metadata
                      </button>
                    </div>
                    <div className="flex gap-4">
                      {dataNFTs.itemDetails?.isAuctioned ? (
                        <>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="text-lg">Floor Price</h3>
                            <h4 className="text-lg font-bold">
                              {formatEther(dataNFTs.itemDetails?.price)}{' '}
                              {dataNFTs.collectionData.Chain.symbol}
                            </h4>
                            <h5>${formatEther(dataNFTs.itemDetails?.price)}</h5>
                          </div>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="text-lg">Bid</h3>
                            <h4 className="text-lg">
                              Highest bid at{' '}
                              <span className="font-bold">
                                {formatEther(
                                  Number(
                                    getHighestBid(dataNFTs.itemDetails)
                                      .highestBid,
                                  ),
                                )}{' '}
                                {dataNFTs.collectionData?.Chain?.symbol}
                              </span>
                            </h4>
                            <div className="flex w-full gap-1">
                              <span>by</span>
                              <span className="font-bold text-neutral-700">
                                {truncateAddress4char(
                                  getHighestBid(dataNFTs.itemDetails)
                                    .highestBidder,
                                )}
                              </span>
                            </div>
                          </div>{' '}
                        </>
                      ) : (
                        <>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="text-lg">Floor Price</h3>
                            <h4 className="text-lg font-bold">0.39 ETH</h4>
                            <h5>$421.07</h5>
                          </div>
                          <div className="w-full flex-col items-center justify-center rounded-lg bg-gray-100 p-5">
                            <h3 className="text-lg">Bid</h3>
                            <h4 className="text-lg">
                              Highest bid at{' '}
                              <span className="font-bold">0.41 ETH</span>
                            </h4>
                            <div className="flex w-full gap-1">
                              <span>by</span>
                              <img
                                className="h-7 w-7 rounded-2xl"
                                src="https://via.placeholder.com/48x48"
                              />
                              <span>Gigachad</span>
                            </div>
                          </div>{' '}
                        </>
                      )}
                    </div>

                    {dataNFTs.itemDetails?.isAuctioned ? (
                      <div className="mt-5 flex w-full items-center gap-4">
                        <button
                          className="w-full rounded-full border border-primary-500 bg-white px-4 py-2 text-center text-base font-bold text-primary-500 hover:bg-primary-300"
                          onClick={() =>
                            handleOpenModalBid(
                              dataNFTs?.itemDetails?.marketId,
                              dataNFTs?.itemDetails?.listingPrice,
                              dataNFTs?.imageUri,
                              dataNFTs?.tokenId,
                              dataNFTs?.itemDetails?.price,
                              dataNFTs.nftDetails?.name,
                              dataNFTs?.collectionData,
                              getHighestBid(dataNFTs?.itemDetails),
                              formatEther(getLowestBid(dataNFTs?.itemDetails)),
                            )
                          }
                        >
                          Place a bid
                        </button>
                      </div>
                    ) : (
                      <div className="mt-5 flex w-full items-center gap-4">
                        <button
                          className="w-full rounded-full bg-primary-500 px-4 py-2 text-center text-base font-bold text-white hover:bg-primary-300"
                          onClick={handleModalBuy}
                        >
                          Buy Now
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                    <ul className="my-5 flex w-full justify-around border-b border-gray-200 text-gray-900">
                      <li className="cursor-pointer px-5 pb-3">Overview</li>
                      <li className="cursor-pointer px-5 pb-3">Bids</li>
                      <li className="cursor-pointer px-5 pb-3">History</li>
                      <li className="cursor-pointer border-b-4 border-primary-500 px-5 pb-3 text-primary-500">
                        Collateral
                      </li>
                    </ul>
                    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-5 text-gray-900">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg">Current Owner</h3>
                          <div className="flex w-fit items-center justify-center gap-2">
                            <img
                              className="h-7 w-7 rounded-2xl"
                              src="https://via.placeholder.com/48x48"
                            />
                            <div className="font-medium leading-none text-neutral-700">
                              Ron31
                            </div>
                          </div>
                        </div>
                        <div>No owner proposal yet.</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">
                          Propose an ETH lend to the owner
                        </h3>
                        <p>No owner lender proposes the offer yet.</p>
                      </div>
                      <button
                        onClick={handleModalPropose}
                        className="w-full rounded-full bg-primary-500 py-2 font-semibold text-white hover:bg-primary-300"
                      >
                        Propose an offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          'Loading...'
        )}
      </div>
      <div className="bg-gradient-to-r from-semantic-orange-100 to-semantic-red-200">
        {/* <div className="awan-3 absolute">
          <Awan3 />
        </div> */}
        <div className="awan-4 absolute right-0 mt-[50px]">
          <Awan4 />
        </div>
        <div className="absolute left-[40%] mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[60%] mt-[40px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] mt-[140px] animate-spin">
          <Flower />
        </div>
        <section className="container relative z-10 mx-auto pb-5">
          <div className="w-full text-black">
            <div className="container mx-auto px-4 pt-[50px]">
              <div className="my-5 flex items-center justify-between">
                <h2 className="mt-5 text-xl font-semibold">
                  NFTs you might like
                </h2>
                <button
                  onClick={() => router.push('/collection')}
                  title="See all"
                  className="hidden rounded-full bg-white px-4 py-2 text-lg font-semibold text-primary-500 hover:bg-primary-50 sm:hidden md:block lg:block xl:block 2xl:block"
                >
                  View collection
                </button>
              </div>
              <div className="relative flex w-full flex-initial items-center justify-center">
                <SlideshowActivities />
              </div>
              <button
                onClick={() => router.push('/collection')}
                title="See all"
                className="block w-full rounded-full bg-white px-4 py-2 text-lg font-semibold text-primary-500 hover:bg-primary-50 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
              >
                View collection
              </button>
            </div>
          </div>
        </section>
        <div className="absolute -mt-[180px] animate-pulse">
          <Castle />
        </div>
        <div className="absolute right-0 -mt-[122px] animate-pulse delay-700">
          <Castle2 />
        </div>
        <div className="absolute left-[20%] -mt-[50px] animate-spin">
          <Flower />
        </div>
        <div className="absolute left-[50%] -mt-[80px] animate-spin">
          <Flower />
        </div>
        <div className="absolute right-[20%] -mt-[280px] animate-spin">
          <Flower />
        </div>
      </div>
      {modalBuy && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepBuy == 1 || stepBuy == 3) && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="flex w-full justify-between">
                        <h3 className="font-semibold">Buy</h3>
                        <button
                          onClick={handleModalBuy}
                          className="text-primary-500"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center gap-3">
                        <img
                          src="https://via.placeholder.com/192x100"
                          className="w-full"
                        />
                        <div className="font w-full text-2xl text-gray-400">
                          #18
                          <br />
                          Worriness
                        </div>
                      </div>
                      <div className="flex justify-between rounded-lg border border-gray-200 p-3">
                        <div className="flex gap-2">
                          <Opensea />
                          <span> Opensea</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">0.42 ETH</span>
                          <FontAwesomeIcon
                            icon={faChevronDown}
                            className="text-primary-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between rounded-lg border border-gray-200 p-3">
                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-primary-500 p-2 text-white">
                            <Ethereum />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl">ETH</span>
                            <span className="text-xs">Ethereum</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">0x30756...Fb179</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3">
                        <div className="flex justify-between">
                          <span>Price</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Snap charge fee</span>
                          <span className="font-semibold">0%</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Total amount</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                      </div>
                      {stepBuy == 1 && (
                        <button
                          className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                          onClick={() => handleStepBuy(2)}
                        >
                          Approve
                        </button>
                      )}
                      {stepBuy == 3 && (
                        <button
                          className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                          onClick={() => handleStepBuy(4)}
                        >
                          Buy
                        </button>
                      )}
                    </section>
                  )}
                  {(stepBuy == 2 || stepBuy == 4) && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>
                          {stepBuy == 2 && (
                            <span>
                              Sign your wallet to continue the transaction
                            </span>
                          )}
                          {stepBuy == 4 && (
                            <span>Proccessing the transactions</span>
                          )}
                        </div>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepBuy(stepBuy - 1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepBuy(stepBuy + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  )}
                  {stepBuy == 5 && (
                    <section className="step-2 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100 p-5">
                      <div className="mt-5 flex flex-col items-center gap-5">
                        <span className="absolute -mt-4 ml-4 h-32 w-32 rounded-full border bg-green-200"></span>
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-6xl font-bold text-green-400"
                          />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-xl font-bold">
                            Transaction success
                          </h3>
                          <span>The asset now is yours!</span>
                          <span>check your profile to see the asset</span>
                        </div>
                        <button
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500"
                          onClick={() => handleModalBuy()}
                        >
                          View asset
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {modalBid && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {stepBid == 1 && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="flex w-full justify-between">
                        <h3 className="font-semibold">Bid</h3>
                        <button
                          onClick={handleModalBid}
                          className="text-primary-500"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center gap-3">
                        <img
                          src="https://via.placeholder.com/192x100"
                          className="w-full"
                        />
                        <div className="font w-full text-2xl text-gray-400">
                          #18
                          <br />
                          Worriness
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3">
                        <div className="flex justify-between">
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg bg-primary-500 p-2 text-white">
                              <Ethereum />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xl">ETH</span>
                              <span className="text-xs">Ethereum</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400">
                              0x30756...Fb179
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Your wallet balance</span>
                          <span>0.50 ETH</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between gap-1 rounded-lg bg-gray-50 p-3">
                        <div className="flex justify-between">
                          <span>Floor price</span>
                          <span className="font-semibold">0.39 ETH</span>
                        </div>
                        <hr />
                        <div className="flex justify-between">
                          <span>Highest bid</span>
                          <span className="flex flex-col items-end font-semibold">
                            <span>0.41 ETH</span>
                            <span className="flex w-full items-center gap-1">
                              by{' '}
                              <img
                                src="https://via.placeholder.com/16x16"
                                className="h-6 w-6 rounded-full"
                              />{' '}
                              Gigachad
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Enter amount of your bid
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md bg-gray-50 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500">
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              autoComplete="amount"
                              className="flex-1 border-0 bg-transparent py-3 pr-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                              placeholder="0"
                            />
                            <span className="flex select-none items-center pr-3 font-semibold text-gray-900">
                              ETH
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <label className="block text-sm font-medium leading-6 text-gray-900">
                          Duration
                        </label>
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            name="duration_date"
                            id="duration_date"
                            autoComplete="duration_date"
                            className="flex-1 rounded-md border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:text-sm sm:leading-6"
                            placeholder="10 - 08 - 2023, 10:00 AM"
                          />
                          <select
                            className="rounded-md border-0 bg-gray-50 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 sm:max-w-md sm:text-sm sm:leading-6"
                            placeholder="10 - 08 - 2023, 10:00 AM"
                          >
                            <option>1 Day</option>
                            <option>2 Day</option>
                            <option>1 Week</option>
                          </select>
                        </div>
                      </div>
                      <button
                        className="w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                        onClick={() => handleStepBid(2)}
                      >
                        Place a bid
                      </button>
                    </section>
                  )}
                  {stepBid == 2 && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>
                          <span>
                            Sign your wallet to continue the transaction
                          </span>
                        </div>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepBid(1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepBid(3)}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  )}
                  {stepBid == 3 && (
                    <section className="step-2 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100 p-5">
                      <div className="mt-5 flex flex-col items-center gap-5">
                        <span className="absolute -mt-4 ml-4 h-32 w-32 rounded-full border bg-green-200"></span>
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-6xl font-bold text-green-400"
                          />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-xl font-bold">Congratulations</h3>
                          <span>
                            Your bid has successfully placed!, check your
                            bidding history by clicking the link below
                          </span>
                        </div>
                        <button
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500"
                          onClick={() => handleModalBid()}
                        >
                          Your bid
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalPropose && (
        <div
          className="relative z-[100]"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="text-gray-900">
                  {(stepPropose == 1 || stepPropose == 3) && (
                    <section className="step-1 flex flex-col gap-3 p-5">
                      <div className="flex w-full justify-between">
                        <h3 className="font-semibold">Propose a lend offer</h3>
                        <button
                          onClick={handleModalPropose}
                          className="text-primary-500"
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </div>
                      <div className="flex w-full items-center justify-center gap-3">
                        <img
                          src="https://via.placeholder.com/192x100"
                          className="w-full"
                        />
                        <div className="font w-full text-2xl text-gray-400">
                          #18
                          <br />
                          Worriness
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Choose wallet
                        </label>
                        <Listbox
                          disabled={stepPropose == 3 ? true : false}
                          value={selectedAccount}
                          onChange={setSelectedAccount}
                        >
                          <div className="relative z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-full border border-gray-200 bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                <Ethereum />
                              </span>
                              <span className="block truncate pl-5 text-gray-600">
                                {selectedAccount}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <svg
                                  width="16"
                                  height="9"
                                  viewBox="0 0 16 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8 9C7.71875 9 7.46875 8.90625 7.28125 8.71875L1.28125 2.71875C0.875 2.34375 0.875 1.6875 1.28125 1.3125C1.65625 0.90625 2.3125 0.90625 2.6875 1.3125L8 6.59375L13.2812 1.3125C13.6562 0.90625 14.3125 0.90625 14.6875 1.3125C15.0938 1.6875 15.0938 2.34375 14.6875 2.71875L8.6875 8.71875C8.5 8.90625 8.25 9 8 9Z"
                                    fill="#7D778A"
                                  />
                                </svg>
                              </span>
                            </Listbox.Button>
                            <Listbox.Options className="absolute max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {accounts.map((account, index) => (
                                <Listbox.Option
                                  key={index}
                                  className={({ active }) =>
                                    `relative cursor-default select-none px-4 py-2 ${
                                      active
                                        ? 'bg-primary-500 text-white'
                                        : 'text-gray-900'
                                    }`
                                  }
                                  value={account}
                                >
                                  {({ selectedAccount }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selectedAccount
                                            ? 'font-medium'
                                            : 'font-normal'
                                        }`}
                                      >
                                        {account}
                                      </span>
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </Listbox>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Lend amount for this nft
                        </label>
                        <div
                          className={`flex w-full items-center rounded-full border border-gray-200 ${
                            stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                          }`}
                        >
                          <input
                            type="number"
                            disabled={stepPropose == 3 ? true : false}
                            id="amount"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                          />
                          <span className="pr-3 text-gray-500">
                            <Ethereum />
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Repayment value
                        </label>
                        <div
                          className={`flex w-full items-center rounded-full border border-gray-200 ${
                            stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                          }`}
                        >
                          <input
                            type="number"
                            disabled={stepPropose == 3 ? true : false}
                            id="value"
                            className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                          />
                          <span className="pr-3 text-gray-500">
                            <Ethereum />
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm leading-6 text-gray-900">
                          Due date
                        </label>
                        <DatePicker
                          options={options}
                          onChange={handleChangeDueDate}
                          show={showDueDate}
                          setShow={handleCloseDueDate}
                        >
                          <div
                            className={`flex w-full items-center rounded-full border border-gray-200 ${
                              stepPropose == 3 ? 'bg-gray-200' : 'bg-white'
                            }`}
                          >
                            <input
                              type="text"
                              disabled={stepPropose == 3 ? true : false}
                              id="due_date"
                              value={selectedDueDate}
                              className="w-full border-0 bg-transparent focus:outline-none focus:ring-0"
                              onFocus={() => setShowDueDate(true)}
                            />
                            <span className="pr-3 text-gray-500">
                              <FontAwesomeIcon icon={faCalendar} />
                            </span>
                          </div>
                        </DatePicker>
                      </div>
                      {stepPropose == 3 && (
                        <div>
                          <label className="flex items-center">
                            <input
                              checked={agreePropose}
                              onChange={handleAgreePropose}
                              name="offers"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                            />
                            <span className="pl-2 text-sm">
                              Please do a double check before you continue the
                              lending progress
                            </span>
                          </label>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <div>Annual percentage rate</div>
                        <div>8.2%</div>
                      </div>
                      <button
                        disabled={stepPropose == 3 ? !agreePropose : false}
                        className="disabled:bg-primary-00 w-full rounded-full bg-primary-500 py-3 font-semibold text-white"
                        onClick={() => handleStepPropose(stepPropose + 1)}
                      >
                        Propose an offer
                      </button>
                    </section>
                  )}
                  {(stepPropose == 2 || stepPropose == 4) && (
                    <section className="step-2 mt-5 flex flex-col gap-3 p-5">
                      <div className="flex flex-col items-center gap-5">
                        <div className="h-12 w-12 animate-ping rounded-lg bg-primary-100"></div>
                        <div className="text-center">
                          <h3 className="text-lg font-bold">Loading</h3>
                          {stepPropose == 2 && (
                            <span>Proccesing your transactions</span>
                          )}
                          {stepPropose == 4 && (
                            <span>
                              Sign your wallet to continue the transaction
                            </span>
                          )}
                        </div>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepPropose(stepPropose - 1)}
                        >
                          Cancel
                        </button>
                        <button
                          className="font-bold text-primary-500 hover:text-primary-400"
                          onClick={() => handleStepPropose(stepPropose + 1)}
                        >
                          Next
                        </button>
                      </div>
                    </section>
                  )}
                  {stepPropose == 5 && (
                    <section className="step-2 flex flex-col gap-3 bg-gradient-to-b from-green-100 to-gray-100 p-5">
                      <div className="mt-5 flex flex-col items-center gap-5">
                        <span className="absolute -mt-4 ml-4 h-32 w-32 rounded-full border bg-green-200"></span>
                        <span className="relative z-10 flex h-32 w-32 items-center justify-center rounded-full border border-[10px] border-green-400">
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-6xl font-bold text-green-400"
                          />
                        </span>
                        <div className="flex flex-col gap-1 text-center">
                          <h3 className="text-xl font-bold">Congratulations</h3>
                          <span>
                            Your lend proposal has ben sent to the NFT owner,
                            let’s wait them to confirm your offer, or try to
                            contact them.
                          </span>
                        </div>
                        <button
                          className="rounded-full border border-primary-500 px-5 py-1 font-bold text-primary-500"
                          onClick={() => handleModalPropose()}
                        >
                          Your offer status
                        </button>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )} */}
      <ModalBid
        isOpenModal={isOpenModal}
        onClose={closeModal}
        auction={auctionData}
        placeBid={placeBid}
        onModalClose={closeModal}
      />
      <Footer />
    </>
  );
}
