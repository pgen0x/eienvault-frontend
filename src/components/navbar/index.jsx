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
import { useAuth } from '@/hooks/AuthContext';

export default function Navbar() {
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

  return (
    <>
      <div className="group sticky top-0 z-40 inline-flex w-full items-center justify-center px-10 transition-all">
        <nav className="3xl:h-24 dark:from-dark dark:to-dark/60 top-0 z-10 mt-4 h-16 w-full max-w-full rounded-2xl bg-gradient-to-b from-white to-white/60 px-4 backdrop-blur transition-all duration-300 sm:h-20">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Logo />
              <Search />
              <NavMenu />
            </div>
            <div className="flex items-center">
              <RightArea suppressHydrationWarning />
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="ml-3 block inline-flex flex-col items-center justify-center rounded-xl text-xl text-primary-500 sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <section
        className={`place-items-top fixed top-0 z-40 grid h-screen w-full max-w-full bg-neutral-100 transition-all duration-500 ${
          openMenu ? 'right-0' : '-right-[100%]'
        }`}
      >
        <div className="mt-5">
          <button
            className="absolute right-5 text-2xl text-primary-500"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <FontAwesomeIcon className="text-sm" icon={faXmark} />
          </button>
          <nav className="mt-5 flex flex-grow flex-col justify-start px-4 pb-4 md:pb-0">
            <span className="mt-2 py-2 text-xl font-semibold text-primary-500 hover:text-primary-300">
              Home
            </span>
            <div className="group mt-2">
              <span className="flex justify-between py-2 text-xl font-semibold text-primary-500 hover:text-primary-300">
                <span>Trending</span>{' '}
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
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Trending</span>
                </li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Status</span>
                </li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Marketplace</span>
                </li>
              </ul>
            </div>
            <div className="group mt-2">
              <span className="flex justify-between py-2 text-xl font-semibold text-primary-500 hover:text-primary-300">
                <span>Status</span>{' '}
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
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Trending</span>
                </li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Status</span>
                </li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300">
                  <span>Marketplace</span>
                </li>
              </ul>
            </div>
            <span className="mt-2 py-2 text-xl font-semibold text-primary-500 hover:text-primary-300">
              Marketplace
            </span>
            <span
              className="mt-2 py-2 text-xl font-semibold text-primary-500 hover:text-primary-300"
              onClick={toggleSidebar}
            >
              Account
            </span>
            {isClient && (
              <div className="mt-2 flex flex-row items-center justify-between border-t-2 py-2 text-xl font-semibold text-primary-500">
                {chain?.id !== 666888 ? (
                  <>
                    <span className="text-md text-xl hover:text-primary-300">
                      Wrong network!
                    </span>
                    <span
                      className="text-md cursor-pointer px-3 py-2 hover:text-primary-300"
                      onClick={() => switchNetwork?.(666888)}
                    >
                      Switch
                    </span>
                  </>
                ) : (
                  ''
                )}
                {!isConnect ||
                  (!isConnected && (
                    <span
                      onClick={() => open()}
                      className="mt-2 py-2 text-sm font-semibold text-primary-500 hover:text-primary-300"
                    >
                      <FontAwesomeIcon icon={faWallet} /> Connect your wallet
                    </span>
                  ))}
              </div>
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
