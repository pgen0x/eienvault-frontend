import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faMoon,
  faSignIn,
  faSun,
  faUserAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/react';
import { useDisconnect, useSignMessage } from 'wagmi';
import { useSidebar } from '../../hooks/SidebarContext';
import { useAccount } from 'wagmi';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useAuth } from '@/hooks/AuthContext';

export default function RightArea() {
  const token = useAuth();
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
  const [hasSigned, setHasSigned] = useState(false);

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

  const handleSign = async () => {
    if (!isConnected) open();
    try {
      const message = new SiweMessage({
        domain: window.location.host,
        uri: window.location.origin,
        version: '1',
        address: address,
        statement: process.env.NEXT_PUBLIC_SIGNIN_MESSAGE,
        nonce: 2323,
        chainId: 666888,
      });

      const signedMessage = await signMessageAsync({
        message: message.prepareMessage(),
      });

      console.log(signedMessage);

      setHasSigned(true);
    } catch (error) {
      console.log('Error Occured', error);
    }
  };

  return (
    <>
      {isClient && (
        <div className="hidden h-8 w-full items-center justify-start gap-4 lg:inline-flex">
          {isConnected && chain?.id !== 666888 && (
            <div className="flex flex-row items-center">
              <div className="flex-1 rounded-l-lg  bg-primary-500 py-2 pl-3">
                <span className="border-r-2 pr-3 text-sm">Wrong network!</span>
              </div>
              <div className="flex flex-shrink-0 flex-col">
                <button
                  type="button"
                  className="rounded-r-lg bg-primary-500 px-3 py-2"
                  onClick={() => switchNetwork?.(666888)}
                >
                  <span className="text-md">Switch</span>
                </button>
              </div>
            </div>
          )}

          {/* {isConnected && !hasSigned && (
            <div as="div" className="relative inline-block text-left">
              <button
                onClick={handleSign}
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
          )} */}

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
      <button onClick={() => close()} className="ml-2 inline-flex flex-col items-center justify-center gap-2 rounded-xl text-xl text-primary-500">
        <FontAwesomeIcon icon={faCartShopping} />
      </button>
    </>
  );
}
