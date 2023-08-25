import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faMoon,
  faSun,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { fetchData } from '../eth/wagmiConfig';
import { Web3Button, useWeb3ModalEvents } from '@web3modal/react';

export default function RightArea() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark'); // Set initial state based on the current theme
  const toggleTheme = () => {
    setEnabled(!enabled); // Toggle the state
    setTheme(enabled ? 'light' : 'dark'); // Update the theme
  };
  const { isConnected, open, close, isOpen, accounts, address } = fetchData();
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);

  useWeb3ModalEvents((event) => {
    console.log(event);
    if (event.name === 'ACCOUNT_CONNECTED') {
      setIsConnect(true);
    }
    if (event.name === 'ACCOUNT_DISCONNECTED') {
      setIsConnect(false);
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="inline-flex h-8 w-full items-center justify-start gap-4">
          {isConnect || isConnected ? (
            <Web3Button icon="hide" balance="show" />
          ) : (
            <button
              onClick={() => open()}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4"
            >
              <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <div className="text-base font-bold leading-normal text-white">
                Connect your wallet
              </div>
            </button>
          )}

          <button
            onClick={() => close()}
            className="inline-flex flex-col items-center justify-center gap-2 rounded-xl text-xl text-primary-500"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </button>

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
    </>
  );
}
