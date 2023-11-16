import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoon,
  faSignIn,
  faSun,
  faUserAlt,
  faWallet,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/react';
import { useDisconnect, useSignMessage } from 'wagmi';
import { useSidebar } from '../../hooks/SidebarContext';
import { useAccount } from 'wagmi';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useAuth } from '@/hooks/AuthContext';

export default function RightArea() {
  const { hasSigned, handleSign } = useAuth();
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark'); // Set initial state based on the current theme
  const toggleTheme = () => {
    setEnabled(!enabled); // Toggle the state
    setTheme(enabled ? 'light' : 'dark'); // Update the theme
  };
  const { disconnectAsync } = useDisconnect();
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { isConnected, address } = useAccount();
  const { isOpen, open, close, setDefaultChain } = useWeb3Modal();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { switchNetwork } = useSwitchNetwork();

  useWeb3ModalEvents((event) => {
    console.log(event);
    if (event.name === 'ACCOUNT_CONNECTED') {
      setIsConnect(true);
    }
    if (event.name === 'ACCOUNT_DISCONNECTED') {
      disconnectAsync();
      setIsConnect(false);
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const classRadio = (value) => {
    const defaultCssRadio =
      'cursor-pointer flex w-6 h-6 md:w-8 md:h-8 justify-center items-center rounded-full text-sm font-medium leading-5 ';
    return (
      defaultCssRadio +
      (enabled === value
        ? 'text-white bg-primary-500 shadow'
        : 'text-primary-500 hover:bg-primary-300')
    );
  };

  return (
    <>
      {isClient && (
        <div className="hidden h-8 w-full items-center justify-start gap-4 lg:inline-flex">
          {isConnected && chain?.id !== 666888 && (
            <div as="div" className="relative inline-block text-left">
              <button
                onClick={() => switchNetwork?.(666888)}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 hover:bg-primary-300"
              >
                <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                  <FontAwesomeIcon icon={faWifi} />
                </div>
                <div className="text-base font-bold leading-normal text-white">
                  Wrong network! <span className="text-md">Switch</span>
                </div>
              </button>
            </div>
          )}

          {isConnected && !hasSigned && (
            <div as="div" className="relative inline-block text-left">
              <button
                onClick={() => handleSign()}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 hover:bg-primary-300"
              >
                <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                  <FontAwesomeIcon icon={faSignIn} />
                </div>
                <div className="text-base font-bold leading-normal text-white">
                  Sign Message to Login
                </div>
              </button>
            </div>
          )}

          {isConnected && (
            <div as="div" className="relative inline-block text-left">
              <button
                className="inline-flex w-full justify-center rounded-full bg-primary-500 px-3 py-3 text-sm font-semibold"
                onClick={toggleSidebar}
              >
                <FontAwesomeIcon icon={faUserAlt} />
              </button>
            </div>
          )}

          {!isConnected && (
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
      <div className="flex space-x-1 rounded-full bg-white px-1 py-1 dark:bg-neutral-900">
        <div>
          <input
            className="hidden"
            type="radio"
            name="themeOptions"
            id="themeLight"
            onChange={() => toggleTheme()}
          />
          <label className={classRadio(false)} htmlFor="themeLight">
            <FontAwesomeIcon icon={faSun} />
          </label>
        </div>
        <div>
          <input
            className="hidden"
            type="radio"
            name="themeOptions"
            id="themeDark"
            onChange={() => toggleTheme()}
          />
          <label className={classRadio(true)} htmlFor="themeDark">
            <FontAwesomeIcon icon={faMoon} />
          </label>
        </div>
      </div>
    </>
  );
}
