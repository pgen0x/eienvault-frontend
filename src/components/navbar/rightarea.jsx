import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCartShopping,
  faMoon,
  faSun,
  faUserAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
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

export default function RightArea() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark'); // Set initial state based on the current theme
  const toggleTheme = () => {
    setEnabled(!enabled); // Toggle the state
    setTheme(enabled ? 'light' : 'dark'); // Update the theme
  };
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
      {isClient && (
        <div className="hidden sm:hidden md:hidden lg:inline-flex xl:inline-flex 2xl:inline-flex h-8 w-full items-center justify-start gap-1">
          {chain?.id !== 666888 ? (
            <div className="w-full flex flex-row items-center">
              <div className="w-full rounded-l-lg bg-primary-500 py-2 pl-3">
                <span className="border-r-2 pr-3 text-sm">Wrong network!</span>
              </div>
              <div className="w-full ">
                <button
                  type="button"
                  className="rounded-r-lg bg-primary-500 px-3 py-2"
                  onClick={() => switchNetwork?.(666888)}
                >
                  <span className="text-md">Switch</span>
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
          {isConnect || isConnected ? (
            <div as="div" className="relative inline-block text-left">
              <button
                className="inline-flex w-full justify-center rounded-full bg-primary-500 px-3 py-3 text-sm font-semibold"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => open()}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 hover:bg-primary-300"
            >
              <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <div className="text-base font-bold leading-normal text-white">
                Connect your wallet
              </div>
            </button>
          )}

          {/* <Switch
            checked={enabled}
            onChange={toggleTheme}
            className={`relative inline-flex h-7 w-10 items-center rounded-full bg-white`}
          >
            <span
              className={`${
                enabled
                  ? 'translate-x-6 bg-primary-500'
                  : 'translate-x-1 bg-primary-500'
              } inline-flex h-6 w-6 transform items-center justify-center rounded-full transition`}
            >
              {enabled ? (
                <FontAwesomeIcon className="h-3 w-3" icon={faMoon} />
              ) : (
                <FontAwesomeIcon className="h-3 w-3" icon={faSun} />
              )}
            </span>
          </Switch> */}
        </div>
      )}
      <button
        onClick={() => close()}
        className="inline-flex flex-col items-center justify-center gap-2 rounded-xl text-xl text-primary-500"
      >
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </>
  );
}
