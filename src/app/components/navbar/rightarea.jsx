import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartShopping,
  faMoon,
  faSun,
  faUserAlt,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { fetchData } from '../eth/wagmiConfig';
import { Web3Button, useWeb3ModalEvents } from '@web3modal/react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useDisconnect } from 'wagmi';
import axios from 'axios';
import { useAuth } from '@/app/lib/hooks/AuthContext';

export default function RightArea() {
  const { theme, setTheme } = useTheme();
  const [enabled, setEnabled] = useState(theme === 'dark'); // Set initial state based on the current theme
  const toggleTheme = () => {
    setEnabled(!enabled); // Toggle the state
    setTheme(enabled ? 'light' : 'dark'); // Update the theme
  };
  const { isConnected, open, close, isOpen, accounts, address } = fetchData();
  const { disconnect } = useDisconnect();
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { token, login, logout } = useAuth();

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
        <div className="inline-flex h-8 w-full items-center justify-start gap-4">
          {isConnect ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-full bg-primary-500 px-3 py-3 text-sm font-semibold">
                  <FontAwesomeIcon icon={faUserAlt} />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gradient-to-b from-white to-white/70 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          onClick={open}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'text-md block px-4 py-2',
                          )}
                        >
                          My NFTs
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'text-md block px-4 py-2',
                          )}
                        >
                          My Collections
                        </a>
                      )}
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            onClick={() => disconnect()}
                            className={classNames(
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700',
                              'text-md block w-full px-4 py-2 text-left',
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <button
              onClick={() => open()}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-primary-500 px-4"
            >
              <div className="h-4 w-4 text-center text-base font-black leading-none text-white">
                <FontAwesomeIcon icon={faWallet} />
              </div>
              <div className="text-base font-bold leading-normal">
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
