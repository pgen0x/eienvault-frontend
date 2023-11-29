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
  faAnglesLeft,
  faAnglesRight,
  faBars,
  faChain,
  faChevronDown,
  faChevronRight,
  faCube,
  faCubesStacked,
  faDice,
  faDisplay,
  faFlag,
  faHome,
  faStore,
  faUser,
  faUserCheck,
  faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useWeb3Modal, useWeb3ModalEvents } from '@web3modal/react';
import { useSidebar } from '@/hooks/SidebarContext';
import { useAccount, useDisconnect } from 'wagmi';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { useState, useEffect, Fragment } from 'react';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next-nprogress-bar';
import { useAuth } from '@/hooks/AuthContext';
import Image from 'next/image';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

export function SidebarAdmin() {
  const router = useRouter();
  const { logout } = useAuth();
  const { disconnect } = useDisconnect();
  const [openMenu, setOpenMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isConnect, setIsConnect] = useState(false);
  const { toggleSidebar } = useSidebar();
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [openSubmenu, setOpenSubmenu] = useState(['']);

  useWeb3ModalEvents((event) => {
    console.log(event);
    if (event.name === 'ACCOUNT_CONNECTED') {
      setIsConnect(true);
    }
    if (event.name === 'ACCOUNT_DISCONNECTED') {
      disconnect();
      setIsConnect(false);
      logout();
    }
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenSubmenu = (event, submenu) => {
    if (openSubmenu.includes(submenu)) {
      setOpenSubmenu((oldSubmenu) => {
        return oldSubmenu.filter((e) => e !== submenu);
      });
    } else {
      setOpenSubmenu((oldSubmenu) => [...oldSubmenu, submenu]);
    }
  };

  return (
    <section className="w-fit">
      <aside
        className={`place-items-top sticky top-0 z-40 grid h-screen max-w-full bg-white/60 transition-all duration-500 ease-in-out dark:bg-neutral-900 ${
          openMenu ? 'w-[250px]' : 'w-24'
        }`}
      >
        <div className="h-full overflow-y-auto border-r border-gray-200 px-3 py-5 dark:border-neutral-700">
          <div className="flex justify-center">
            <Image
              src={'/logo-admin.svg'}
              width={150}
              height={150}
              alt="Logo"
              className={`h-12 object-cover object-left duration-500 ease-in-out ${
                openMenu ? '' : 'w-12'
              }`}
            />
          </div>
          <ul className="mt-[20px] space-y-2">
            <li>
              <ListMenu
                onClick={(event) => handleOpenSubmenu(event, 'websiteSetting')}
                icon={faDisplay}
                title="Website Setting"
                slug="websiteSetting"
                submenu={openSubmenu}
                menu={+openMenu}
              />
              <ul
                className={`${
                  openSubmenu.includes('websiteSetting') ? '' : 'hidden'
                } space-y-2 py-2`}
              >
                <li>
                  <ListSubmenu
                    icon={faUser}
                    title="User"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/user')}
                  />
                </li>
                {/* <li>
                  <ListSubmenu
                    icon={faCubesStacked}
                    title="Collection"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/collection')}
                  />
                </li>
                <li>
                  <ListSubmenu
                    icon={faDice}
                    title="NFT"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/nft')}
                  />
                </li> */}
                <li>
                  <ListSubmenu
                    icon={faStore}
                    title="Market item"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/market')}
                  />
                </li>
                <li>
                  <ListSubmenu
                    icon={faUserCheck}
                    title="Request verify"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/verification')}
                  />
                </li>
                <li>
                  <ListSubmenu
                    icon={faChain}
                    title="Chain"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/chain')}
                  />
                </li>
              </ul>
            </li>
            <li>
              <ListMenu
                onClick={(event) => handleOpenSubmenu(event, 'report')}
                icon={faFlag}
                title="Report"
                slug="report"
                submenu={openSubmenu}
                menu={+openMenu}
              />
              <ul
                className={`${
                  openSubmenu.includes('report') ? '' : 'hidden'
                } space-y-2 py-2`}
              >
                <li>
                  <ListSubmenu
                    icon={faDice}
                    title="Report NFTs"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/reportnft')}
                  />
                </li>
                <li>
                  <ListSubmenu
                    icon={faCubesStacked}
                    title="Report Collection"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/reportcollection')}
                  />
                </li>
              </ul>
            </li>
            <li>
              <ListMenu
                onClick={(event) =>
                  handleOpenSubmenu(event, 'blockchainSetting')
                }
                icon={faCube}
                title="Blockchain setting"
                slug="blockchainSetting"
                submenu={openSubmenu}
                menu={+openMenu}
              />
              <ul
                className={`${
                  openSubmenu.includes('blockchainSetting') ? '' : 'hidden'
                } space-y-2 py-2`}
              >
                <li>
                  <ListSubmenu
                    icon={faCube}
                    title="Marketplace Contract"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/blockchain/marketplace')}
                  />
                </li>
                <li>
                  <ListSubmenu
                    icon={faCube}
                    title="Vault Contract"
                    menu={+openMenu}
                    onClick={() => router.push('/admin/blockchain/vault')}
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div
          className={`fixed top-1/2 flex translate-y-4 items-center justify-center rounded-full bg-white text-gray-900 shadow transition-all duration-500 ${
            openMenu ? 'left-[235px]' : 'left-[80px]'
          }`}
        >
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="text-text-lg h-8 w-8"
          >
            <FontAwesomeIcon icon={openMenu ? faAnglesLeft : faAnglesRight} />
          </button>
        </div>
      </aside>
    </section>
  );
}

const ListSubmenu = ({ ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`group flex w-full items-center gap-2 rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 ${attributes.className}`}
    >
      <FontAwesomeIcon
        icon={attributes.icon}
        size={attributes.menu ? 'sm' : 'xl'}
      />
      {attributes.menu ? (
        <span className="ml-3 flex-1 whitespace-nowrap text-left">
          {attributes.title}
        </span>
      ) : (
        ''
      )}
    </button>
  );
};

const ListMenu = ({ ...attributes }) => {
  return (
    <button
      {...attributes}
      className={`justify-left group flex w-full items-center gap-2 rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 ${attributes.className}`}
    >
      <FontAwesomeIcon
        icon={attributes.icon}
        size={attributes.menu ? 'sm' : 'xl'}
      />
      {attributes.menu ? (
        <span className={`ml-3 flex-1 whitespace-nowrap text-left `}>
          {attributes.title}
        </span>
      ) : (
        ''
      )}
      <FontAwesomeIcon
        icon={
          attributes.submenu.includes(attributes.slug)
            ? faChevronDown
            : faChevronRight
        }
      />
    </button>
  );
};

export function NavbarAdmin() {
  return (
    <div className="absolute right-10 top-5 flex w-fit flex-row-reverse items-center gap-3">
      <RightArea suppressHydrationWarning />
    </div>
  );
}
