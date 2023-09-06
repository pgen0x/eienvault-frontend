'use client';
import { useWindowScroll } from '@/hooks/use-window-scroll';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import cn from 'classnames';
import Logo from '@/components/navbar/logoicon';
import Search from '@/components/navbar/search';
import NavMenu from './navmenu';
import RightArea from './rightarea';

//web3 Modal libs
import { Web3Modal } from '@web3modal/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown, faChevronRight, faUserAlt, faWallet, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Web3Button, useWeb3Modal, useWeb3ModalEvents } from '@web3modal/react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useDisconnect } from 'wagmi';
import axios from 'axios';
import { useAuth } from '@/hooks/AuthContext';
import { useSidebar } from '../../hooks/SidebarContext';
import { useAccount } from 'wagmi';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { token, login, logout } = useAuth();
  const { toggleSidebar } = useSidebar();
  const { isConnected } = useAccount();
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { chain } = useNetwork();
  const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  useWeb3ModalEvents((event) => {
    console.log(event);
    if (event.name === 'ACCOUNT_CONNECTED') {
      setIsConnect(true);
    }
    if (event.name === 'ACCOUNT_DISCONNECTED') {
      setIsConnect(false);
      logout();
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isConnect) {
      handleLogin(); // Call the handleLogin function when isConnect or isConnected is true
      console.log(token);
    }
  }, [isConnect, token]);

  const handleLogin = async () => {
    try {
      // Perform your login logic here, for example:
      if (isConnect) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
          {
            walletAddress: address,
          },
        );
        login(response.data.token);
      }
    } catch (error) {
      logout();
      console.error('Login error:', error.message);
    }
  };
  return (
    <>
      <div className="sticky group top-0 z-40 inline-flex w-full items-center justify-center px-10 transition-all">
        <nav className="3xl:h-24 dark:from-dark dark:to-dark/60 top-0 z-10 mt-4 h-16 w-full max-w-full rounded-2xl bg-gradient-to-b from-white to-white/60 px-4 backdrop-blur transition-all duration-300 sm:h-20">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Logo />
              <Search />
              <NavMenu />
            </div>
            <div className="flex items-center">
              <RightArea suppressHydrationWarning />
              <button onClick={() => setOpenMenu(!openMenu)} className="ml-3 inline-flex flex-col items-center justify-center rounded-xl text-xl text-primary-500 block sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <section className={`h-screen grid place-items-top w-full max-w-full bg-neutral-100 fixed z-40 transition-all duration-500 top-0 ${openMenu ? 'right-0' : '-right-[100%]'}`}>
        <div className="mt-5">
          <button className="absolute right-5 text-2xl text-primary-500" onClick={() => setOpenMenu(!openMenu)}>
            <FontAwesomeIcon className="text-sm" icon={faXmark} />
          </button>
          <nav className="px-4 flex flex-col flex-grow pb-4 md:pb-0 justify-start mt-5">
            <span className="py-2 mt-2 text-xl font-semibold text-primary-500 hover:text-primary-300">Home</span>
            <div className="mt-2 group">
              <span className="py-2 text-xl font-semibold text-primary-500 hover:text-primary-300 flex justify-between"><span>Trending</span> <FontAwesomeIcon className="hidden group-hover:block" icon={faChevronDown} /><FontAwesomeIcon className="block group-hover:hidden" icon={faChevronRight} /></span>
              <ul className="hidden group-hover:flex flex-col gap-4 px-4 mt-2">
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Trending</span></li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Status</span></li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Marketplace</span></li>
              </ul>
            </div>
            <div className="mt-2 group">
              <span className="py-2 text-xl font-semibold text-primary-500 hover:text-primary-300 flex justify-between"><span>Status</span> <FontAwesomeIcon className="hidden group-hover:block" icon={faChevronDown} /><FontAwesomeIcon className="block group-hover:hidden" icon={faChevronRight} /></span>
              <ul className="hidden group-hover:flex flex-col gap-4 px-4 mt-2">
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Trending</span></li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Status</span></li>
                <li className="text-xl font-semibold text-primary-500 hover:text-primary-300"><span>Marketplace</span></li>
              </ul>
            </div>
            <span className="py-2 mt-2 text-xl font-semibold text-primary-500 hover:text-primary-300">Marketplace</span>
            {isClient && (
              <>
                {(isConnect || isConnected) && chain?.id !== 666888 && (
                  <div className="flex justify-between border-t-2 flex-row items-center py-2 mt-2 text-xl font-semibold text-primary-500">
                    <span className="text-md text-xl hover:text-primary-300">Wrong network!</span>
                    <span className="text-md px-3 py-2 cursor-pointer hover:text-primary-300" onClick={() => switchNetwork?.(666888)}>Switch</span>
                  </div>
                )}
                {isConnect || isConnected ? (
                  <span className="py-2 mt-2 text-xl font-semibold text-primary-500 hover:text-primary-300" onClick={toggleSidebar}>Account</span>
                ) : (
                  <span onClick={() => open()} className="py-2 mt-2 text-xl font-semibold text-primary-500 hover:text-primary-300"><FontAwesomeIcon icon={faWallet} /> Connect your wallet</span>
                )}
              </>
            )}
          </nav>
        </div >
      </section >
    </>
  );
}
