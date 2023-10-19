'use client';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import cn from 'classnames';
import Logo from '@/components/navbar/logoicon';
import Search from '@/components/navbar/search';
import NavMenu from './navmenu';
import RightArea from './rightarea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faChevronDown,
  faChevronRight,
  faUserAlt,
  faWallet,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/react';
import { useSidebar } from '../../hooks/SidebarContext';
import { useAccount, useDisconnect } from 'wagmi';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next-nprogress-bar';
import { useAuth } from '@/hooks/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { logout } = useAuth();
  const { disconnectAsync } = useDisconnect();
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useWeb3ModalEvents((event) => {
    if (event.name === 'ACCOUNT_CONNECTED') {
      setIsConnect(true);
    }
    if (event.name === 'ACCOUNT_DISCONNECTED') {
      disconnectAsync();
      setIsConnect(false);
      logout();
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handlePushSidebar = (url) => {
    setOpenMenu(false);
    router.push(url);
  };

  return (
    <>
      <div className="group sticky top-0 z-40 inline-flex w-full items-center justify-center transition-all md:px-10 lg:px-10 xl:px-10 2xl:px-10">
        <nav className="3xl:h-24 top-0 z-10 mt-4 h-16 w-full max-w-full bg-gradient-to-b from-white to-white/60 px-4 backdrop-blur transition-all duration-300 dark:from-black/50 dark:to-black/40 sm:h-20 md:rounded-2xl lg:rounded-2xl xl:rounded-2xl 2xl:rounded-2xl">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Logo />
              <Search />
              <NavMenu />
            </div>
            <div className="flex items-center gap-2">
              <RightArea suppressHydrationWarning />
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="ml-3 block flex-col items-center justify-center rounded-xl text-xl text-primary-500 sm:block md:block lg:hidden xl:hidden 2xl:hidden"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <section>
        <div
          className={`fixed top-0 z-40 h-screen w-full max-w-full bg-black/30 backdrop-blur-sm backdrop-opacity-60 transition-all ${
            openMenu ? 'left-0 right-0' : '-right-[100%]'
          }`}
          onClick={() => setOpenMenu(!openMenu)}
        />
        <div
          className={`place-items-top fixed top-0 z-40 grid h-screen w-[418px] max-w-full bg-white transition-all duration-500 ${
            openMenu ? 'right-0' : '-right-[100%]'
          }`}
        >
          <div className="flex w-full flex-col items-end justify-end bg-neutral-100">
            <button
              className="mr-10 mt-10 w-fit text-2xl text-black"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <nav className="flex w-full max-w-[418px] flex-grow flex-col justify-start bg-neutral-100 px-10 pb-4 text-2xl transition-all delay-1000 duration-500 md:pb-0">
              <span className="mt-2 py-2 font-semibold text-primary-500 hover:text-primary-300">
                Home
              </span>
              <div className="group mt-2">
                <span className="flex justify-between py-2 font-semibold text-primary-500 hover:text-primary-300">
                  <span>Discover</span>{' '}
                  <FontAwesomeIcon
                    className="hidden group-hover:block"
                    icon={faChevronDown}
                  />
                  <FontAwesomeIcon
                    className="block group-hover:hidden"
                    icon={faChevronRight}
                  />
                </span>
                <ul className="mt-2 hidden flex-col gap-4 px-4 group-hover:flex">
                  <li
                    className="font-semibold text-primary-500 hover:text-primary-300"
                    onClick={() => handlePushSidebar('/collection')}
                  >
                    <span>Collections</span>
                  </li>
                  <li
                    className="font-semibold text-primary-500 hover:text-primary-300"
                    onClick={() => handlePushSidebar('/nft')}
                  >
                    <span>NFTs</span>
                  </li>
                  <li
                    className="font-semibold text-primary-500 hover:text-primary-300"
                    onClick={() => handlePushSidebar('/user')}
                  >
                    <span>Users</span>
                  </li>
                </ul>
              </div>
              {/* <div className="group mt-2">
                <span className="flex justify-between py-2 font-semibold text-primary-500 hover:text-primary-300">
                  <span>Stats</span>{' '}
                  <FontAwesomeIcon
                    className="hidden group-hover:block"
                    icon={faChevronDown}
                  />
                  <FontAwesomeIcon
                    className="block group-hover:hidden"
                    icon={faChevronRight}
                  />
                </span>
                <ul className="mt-2 hidden flex-col gap-4 px-4 group-hover:flex">
                  <li className="font-semibold text-primary-500 hover:text-primary-300">
                    <span>Collections</span>
                  </li>
                  <li className="font-semibold text-primary-500 hover:text-primary-300">
                    <span>NFTs</span>
                  </li>
                  <li className="font-semibold text-primary-500 hover:text-primary-300">
                    <span>Users</span>
                  </li>
                </ul>
              </div> */}
              {isClient && (
                <>
                  {(isConnect || isConnected) && chain?.id !== 666888 && (
                    <div className="mt-2 flex flex-row items-center justify-between border-t-2 py-2 text-xl font-semibold text-primary-500">
                      <span className="text-md text-xl hover:text-primary-300">
                        Wrong network!
                      </span>
                      <span
                        className="text-md cursor-pointer px-3 py-2 hover:text-primary-300"
                        onClick={() => switchNetwork?.(666888)}
                      >
                        Switch
                      </span>
                    </div>
                  )}
                  {isConnect || isConnected ? (
                    <span
                      className="mt-2 py-2 font-semibold text-primary-500 hover:text-primary-300"
                      onClick={toggleSidebar}
                    >
                      Account
                    </span>
                  ) : (
                    <span
                      onClick={() => open()}
                      className="mt-2 py-2 font-semibold text-primary-500 hover:text-primary-300"
                    >
                      <FontAwesomeIcon icon={faWallet} /> Connect your wallet
                    </span>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
