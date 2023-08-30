'use client';
import React, { useEffect, useRef } from 'react';
import { useSidebar } from '../../hooks/SidebarContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faClose,
  faCopy,
  faPlugCircleXmark,
  faUser,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { useRouter } from 'next/navigation';
import { disconnect } from '@wagmi/core';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef();
  const sidebarContentRef = useRef();
  const router = useRouter();

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
    router.push('/profile'); // Navigate to the profile page
  };

  const handleDisconnect = () => {
    closeSidebar();
    disconnect();
  };

  return (
    <div
      ref={sidebarRef}
      className={`fixed inset-0 flex max-w-full flex-shrink-0 basis-auto flex-col items-stretch bg-black/50 backdrop-blur-sm ${
        isSidebarOpen ? 'z-50 opacity-100' : 'z-0 opacity-0'
      } transition-opacity`}
    >
      <div
        ref={sidebarContentRef}
        className={`absolute inset-0 top-0 max-h-full w-full max-w-full flex-row overflow-hidden bg-neutral-100 transition-transform duration-300 md:left-auto md:right-0 md:max-w-[418px] ${
          isSidebarOpen
            ? 'translate-x-0 transform'
            : 'translate-x-full transform'
        }`}
      >
        <div className="flex h-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-8">
            <div className="mx-8 inline-flex items-center justify-between gap-2.5 pt-8">
              <div className="flex flex-row items-center justify-center gap-4">
                <button className="inline-flex w-full justify-center rounded-full bg-primary-500 px-3 py-3 text-sm font-semibold">
                  <FontAwesomeIcon icon={faUserAlt} />
                </button>
                <div className="inline-flex flex-col items-start justify-start">
                  <div className="text-center text-xl font-medium leading-loose text-black">
                    username
                  </div>
                  <button
                    className="text-center text-sm font-light leading-tight text-black hover:text-black/60"
                    onClick={handleViewProfileClick}
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className="relative h-10 w-10">
                <button
                  className="h-10 w-10 rounded-full text-primary-500 hover:bg-primary-200 hover:text-primary-400"
                  onClick={() => closeSidebar()}
                >
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
            <div className="ml-8 inline-flex flex-col items-start justify-start gap-2">
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                My NFTs
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                My Collections
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                My Bid and Listings
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                My activity
              </div>
              <div className="flex h-32 flex-col items-start justify-start gap-2 self-stretch">
                <div className="inline-flex items-center justify-start gap-3 self-stretch">
                  <div className="flex items-start justify-start gap-4">
                    <div className="text-center text-3xl font-medium leading-10 text-black">
                      Create
                    </div>
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center">
                    <div className="h-6 w-6 text-center text-xl font-black leading-normal text-black">
                      <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                  </div>
                </div>
                <div className="flex h-20 flex-col items-start justify-start gap-2 self-stretch px-6">
                  <div className="inline-flex items-center justify-start gap-2 self-stretch">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                    <div className="shrink grow basis-0 text-2xl font-medium leading-9 text-black">
                      NFT
                    </div>
                  </div>
                  <div className="inline-flex items-center justify-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                    <div className="w-48 text-2xl font-medium leading-9 text-black">
                      Collections
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                Sell
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                Following
              </div>
              <div className="self-stretch text-3xl font-medium leading-10 text-black">
                Setting
              </div>
            </div>
          </div>

          <div className="bottom-10 m-8 mb-8 inline-flex h-80 flex-col items-start justify-start gap-2">
            <div className="inline-flex h-5 w-full items-center justify-center">
              <div className="shrink grow basis-0 text-sm font-bold leading-tight text-black">
                Connected wallet
              </div>
              <div className="flex h-5 shrink grow basis-0 items-center justify-center gap-2 rounded-lg py-2">
                <div className="shrink grow basis-0 text-right text-sm font-bold leading-tight text-rose-500">
                  Manage wallet
                </div>
              </div>
            </div>
            <div className="flex h-72 w-full flex-col items-start justify-start gap-4 rounded-2xl bg-white bg-opacity-50 p-4">
              <div className="flex h-12 flex-col items-start justify-start gap-2 self-stretch">
                <div className="inline-flex items-center justify-start gap-2 self-stretch">
                  <div className="flex h-12 shrink grow basis-0 items-center justify-start gap-2">
                    <div className="relative h-12 w-12">
                      <div className="absolute left-[3px] top-[5px] h-10 w-10">
                        <div className="absolute left-[0.35px] top-[-0px] h-9 w-10"></div>
                        <div className="absolute left-[12.34px] top-[31.57px] h-1.5 w-4"></div>
                        <div className="absolute left-[7.99px] top-[20.46px] h-3.5 w-7"></div>
                        <div className="absolute left-[9.24px] top-[20.46px] h-2.5 w-6"></div>
                        <div className="absolute left-0 top-0 h-5 w-10"></div>
                      </div>
                    </div>
                    <div className="inline-flex flex-col items-start justify-start">
                      <div className="text-center text-base font-light leading-normal text-black">
                        Ethereum
                      </div>
                      <div className="text-center text-base font-medium leading-normal text-black">
                        0x8wa21...72na
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex h-8 w-8 flex-col items-center justify-center gap-2 rounded-3xl bg-rose-500 p-2">
                    <div className="text-sm font-black leading-tight text-white">
                      <FontAwesomeIcon icon={faCopy} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-20 flex-col items-start justify-start gap-2 self-stretch rounded-lg bg-neutral-100 p-2">
                <div className="inline-flex items-center justify-start self-stretch">
                  <div className="flex h-8 shrink grow basis-0 items-center justify-start gap-2">
                    <div className="flex items-start justify-start gap-1">
                      <div className="h-8 w-8 rounded-full bg-zinc-200" />
                      <div className="h-6 w-6 text-center text-sm font-normal leading-snug text-zinc-500">
                        <FontAwesomeIcon icon={faEthereum} />
                      </div>
                    </div>
                    <div className="text-center text-base font-normal leading-normal text-black">
                      0.191 ETH
                    </div>
                  </div>
                  <div className="text-center text-base font-normal leading-normal text-black">
                    $315.1
                  </div>
                </div>
                <div className="inline-flex items-center justify-start self-stretch">
                  <div className="flex h-8 shrink grow basis-0 items-center justify-start gap-2">
                    <div className="flex items-start justify-start gap-1">
                      <div className="h-8 w-8 rounded-full bg-red-50" />
                      <div className="h-6 w-6 text-center text-sm font-normal leading-snug text-rose-400">
                        <FontAwesomeIcon icon={faEthereum} />
                      </div>
                    </div>
                    <div className="text-center text-base font-normal leading-normal text-black">
                      0 WETH
                    </div>
                  </div>
                  <div className="text-center text-base font-normal leading-normal text-black">
                    $0
                  </div>
                </div>
              </div>
              <div className="inline-flex items-start justify-start gap-2 self-stretch">
                <div className="flex h-8 shrink grow basis-0 items-center justify-center gap-2 rounded-3xl bg-rose-500 px-4 py-2">
                  <div className="text-center text-base font-bold leading-normal text-white">
                    Swap WETH
                  </div>
                </div>
              </div>
              <button
                className="inline-flex items-start justify-start gap-2 self-stretch rounded-lg hover:bg-primary-50"
                onClick={handleDisconnect}
              >
                <div className="flex h-8 shrink grow basis-0 items-center justify-center gap-2  px-4 py-2">
                  <div className="h-4 w-4 text-center text-base font-black leading-none text-primary-500">
                    <FontAwesomeIcon icon={faPlugCircleXmark} />
                  </div>
                  <span className="text-base font-bold leading-normal text-primary-500">
                    Disconnect wallet
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
