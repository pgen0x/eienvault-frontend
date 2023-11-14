'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSidebar } from '../../hooks/SidebarContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faClose,
  faCopy,
  faPlugCircleXmark,
  faUser,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next-nprogress-bar';
import { useAccount, useBalance, useDisconnect, useNetwork } from 'wagmi';
import { useAuth } from '@/hooks/AuthContext';
import { truncateAddress } from '@/utils/truncateAddress';
import { useWeb3Modal } from '@web3modal/react';
import HelaIcon from '@/assets/icon/hela';
import ModalCreateCollection from '../modal/createCollections';
import ButtonPrimary from '../button/buttonPrimary';
import ButtonSecondary from '../button/buttonSecondary';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const [showDropdown, setShowDropdown] = useState(false);
  const [chains, setChains] = useState([]);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const sidebarRef = useRef();
  const sidebarContentRef = useRef();
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { dataUser } = useAuth();
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { data } = useBalance({
    address: address,
  });
  const { chain } = useNetwork();

  const [selectedBlockchain, setSelectedBlockchain] = useState({
    chainId: chain?.id || 666888,
    symbol: chain?.nativeCurrency.symbol || 'HLUSD',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarContentRef.current &&
        !sidebarContentRef.current.contains(event.target)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  const handleViewProfileClick = () => {
    closeSidebar();
    router.push(`/profile/${address}`); // Navigate to the profile page
  };

  const handleNftCreate = () => {
    closeSidebar();
    router.push('/nft/create'); // Navigate to the profile page
  };

  const handleMyBidandListiong = () => {
    closeSidebar();
    router.push('/orders'); // Navigate to the profile page
  };

  const handleCollectionCreate = () => {
    closeSidebar();
    setIsCreateCollection(true);
  };

  const handleMyNft = () => {
    closeSidebar();
    router.push('/profile?owned'); // Navigate to the profile page
  };

  const handleMyCollection = () => {
    closeSidebar();
    router.push(`/profile?collections`); // Navigate to the profile page
  };

  const handleMyActivity = () => {
    closeSidebar();
    router.push('/profile?activity'); // Navigate to the profile page
  };

  const handleDisconnect = () => {
    closeSidebar();
    disconnect();
  };

  const handleSetting = () => {
    closeSidebar();
    router.push('/profile/setting');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
          {
            cache: 'force-cache',
          },
        );

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const dataChain = await res.json();
        setChains(dataChain);
        // Continue with your code
      } catch (error) {
        console.error('Fetch failed:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [isCreateCollection]);

  const closeModal = () => {
    setIsCreateCollection(false);
  };

  const actionCopy = () => {
    const textArea = document.createElement('textarea');
    textArea.value = address;
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');

    document.body.removeChild(textArea);
    toast.success('Address copied to clipboard');
  }

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed inset-0 flex max-w-full flex-shrink-0 basis-auto flex-col items-stretch bg-black/50 backdrop-blur-sm ${
          isSidebarOpen ? 'z-50 opacity-100' : 'z-0 opacity-0'
        } transition-opacity`}
      >
        <div
          ref={sidebarContentRef}
          className={`absolute inset-0 top-0 max-h-full w-full max-w-full flex-row overflow-hidden bg-neutral-100 transition-transform duration-300 dark:bg-neutral-950 md:left-auto md:right-0 md:max-w-[418px] ${
            isSidebarOpen
              ? 'translate-x-0 transform'
              : 'translate-x-full transform'
          }`}
        >
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-8">
              <div className="mx-8 flex items-center justify-between gap-2.5 pt-8">
                <div className="flex w-full flex-row items-center justify-center gap-4">
                  <button className="flex w-fit justify-center rounded-full bg-primary-500 px-3 py-3 text-sm font-semibold">
                    <FontAwesomeIcon icon={faUserAlt} />
                  </button>
                  <div className="flex w-full flex-col items-start justify-start">
                    <div className="truncate text-center text-xl font-medium leading-loose text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                      {(isConnected && dataUser.username) ||
                        truncateAddress(address)}
                    </div>
                    <button
                      className="text-center text-sm font-light leading-tight text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                      onClick={handleViewProfileClick}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div className="relative h-10 w-10">
                  <button
                    className="h-10 w-10 rounded-full text-rose-500 hover:bg-primary-300"
                    onClick={() => closeSidebar()}
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              </div>
              <div className="ml-8 inline-flex flex-col items-start justify-start gap-2">
                <div
                  className="cursor-pointer self-stretch text-xl font-medium leading-8 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                  onClick={() => handleMyNft()}
                >
                  My NFTs
                </div>
                <div
                  className="cursor-pointer self-stretch text-xl font-medium leading-8 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                  onClick={() => handleMyCollection()}
                >
                  My Collections
                </div>
                <div
                  className="cursor-pointer self-stretch text-xl font-medium leading-8 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                  onClick={() => handleMyBidandListiong()}
                >
                  My Bid and Listings
                </div>
                {/* <div
                  className="cursor-pointer self-stretch text-xl font-medium leading-8 text-gray-900 hover:text-gray-500"
                  onClick={() => handleMyActivity()}
                >
                  My activity
                </div> */}
                <div className="flex h-full flex-col items-start justify-start gap-2 self-stretch">
                  <div
                    className="inline-flex cursor-pointer items-center justify-start gap-3 self-stretch"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div className="flex items-start justify-start gap-4">
                      <div className="text-center text-xl font-medium leading-8 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                        Create
                      </div>
                    </div>
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="text-md h-6 w-6 text-center font-black leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                        {showDropdown ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </div>
                    </div>
                  </div>
                  {showDropdown && (
                    <div className="flex h-full flex-col items-start justify-start gap-2 self-stretch px-6">
                      <div className="inline-flex items-center justify-start gap-2 self-stretch">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                        <div
                          className="shrink grow basis-0 cursor-pointer text-xl font-medium leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                          onClick={() => handleNftCreate()}
                        >
                          NFT
                        </div>
                      </div>
                      <div className="inline-flex items-center justify-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                        <div
                          className="w-48 cursor-pointer text-xl font-medium leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300"
                          onClick={() => handleCollectionCreate()}
                        >
                          Collections
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="self-stretch text-xl font-medium leading-8 text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                  <button onClick={() => handleSetting()}>Setting</button>
                </div>
              </div>
            </div>

            <div className="bottom-10 m-8 mb-8 inline-flex h-80 flex-col items-start justify-start gap-2">
              <div className="inline-flex h-5 w-full items-center justify-center">
                <div className="shrink grow basis-0 text-sm font-bold leading-tight text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                  Connected wallet
                </div>
                <div className="flex h-5 shrink grow basis-0 items-center justify-center gap-2 rounded-lg py-2">
                  <button
                    className="shrink grow basis-0 text-right text-sm font-bold leading-tight text-rose-500"
                    onClick={() => open()}
                  >
                    Manage wallet
                  </button>
                </div>
              </div>
              <div className="flex h-72 w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white bg-opacity-50 p-4 dark:bg-neutral-900">
                <div className="flex h-12 flex-col items-start justify-start gap-2 self-stretch">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="flex h-12 shrink grow basis-0 items-center justify-start gap-2">
                      <div className="inline-flex flex-row items-center justify-between gap-4">
                        <div className="font-light leading-normal">
                          <HelaIcon className="h-12 w-12" />
                        </div>
                        <div className="font-medium leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                          {isConnected && truncateAddress(address)}
                        </div>
                      </div>
                    </div>
                    <div className="inline-flex h-8 w-8 flex-col items-center justify-center gap-2 rounded-3xl bg-rose-500 p-2">
                      <button className="text-sm font-black leading-tight text-white" onClick={actionCopy}>
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex h-20 flex-col items-center justify-center gap-2 self-stretch rounded-lg bg-neutral-100 p-2 dark:bg-neutral-700">
                  <div className="inline-flex items-center justify-start self-stretch">
                    <div className="flex h-8 shrink grow basis-0 items-center justify-start gap-2">
                      <div className="flex items-center justify-start gap-1">
                        <div className="h-6 w-6 text-center text-sm font-normal leading-snug text-neutral-700">
                          <HelaIcon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="text-center text-base font-normal leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                        {Number(data?.formatted).toFixed()} {data?.symbol}
                      </div>
                    </div>
                    <div className="text-center text-base font-normal leading-normal text-gray-900 hover:text-gray-500 dark:text-white dark:hover:text-neutral-300">
                      ${Number(data?.formatted).toFixed()}
                    </div>
                  </div>
                  {/* <div className="inline-flex items-center justify-start self-stretch">
                  <div className="flex h-8 shrink grow basis-0 items-center justify-start gap-2">
                    <div className="flex items-start justify-start gap-1">
                      <div className="h-8 w-8 rounded-full bg-red-50" />
                      <div className="h-6 w-6 text-center text-sm font-normal leading-snug text-rose-400">
                        <FontAwesomeIcon icon={faEthereum} />
                      </div>
                    </div>
                    <div className="text-center text-base font-normal leading-normal text-gray-900 hover:text-gray-500">
                      0 WETH
                    </div>
                  </div>
                  <div className="text-center text-base font-normal leading-normal text-gray-900 hover:text-gray-500">
                    $0
                  </div>
                </div> */}
                </div>
                <ButtonPrimary onClick={() => open()}>
                  Manage Wallet
                </ButtonPrimary>
                <div className="inline-flex items-start justify-start gap-2 self-stretch">
                  <ButtonSecondary
                    className="flex items-center justify-center gap-2"
                    onClick={handleDisconnect}
                  >
                    <div className="h-4 w-4 text-center text-base leading-none text-primary-500 ">
                      <FontAwesomeIcon icon={faPlugCircleXmark} />
                    </div>
                    <span className="text-base font-bold leading-normal text-primary-500 ">
                      Disconnect wallet
                    </span>
                  </ButtonSecondary>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalCreateCollection
        chains={chains}
        isOpenModal={isCreateCollection}
        selectedChain={selectedBlockchain}
        setSelectedChain={setSelectedBlockchain}
        onClose={closeModal}
        onModalClose={closeModal}
      />
    </>
  );
};

export default Sidebar;
