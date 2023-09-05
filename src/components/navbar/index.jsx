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
import { faBars, faChevronDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
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
      <section className={`bg-white/10 backdrop-blur-sm backdrop-opacity-60 fixed top-0 w-full transition-all max-w-full h-screen z-40 ${openMenu ? 'left-0 right-0' : '-right-[100%]'}`}>
        <div className={`h-screen grid place-items-top w-80 max-w-full bg-white fixed z-40 transition-all duration-500 top-0 ${openMenu ? 'right-0' : '-right-[100%]'}`}>
          <div className="mt-5">
            <button className="absolute right-5 text-2xl text-primary-500" onClick={() => setOpenMenu(!openMenu)}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <nav className="px-4 flex flex-col flex-grow pb-4 md:pb-0 justify-start mt-5">
              <span className="py-2 mt-2 text-sm font-semibold text-primary-500 hover:text-primary-300">Home</span>
              <div className="mt-2 group">
                <span className="py-2 text-sm font-semibold text-primary-500 hover:text-primary-300 flex justify-between"><span>Trending</span> <FontAwesomeIcon icon={faChevronDown} /></span>
                <ul className="hidden group-hover:flex flex-col gap-4 px-4 mt-2">
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Trending</span></li>
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Status</span></li>
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Marketplace</span></li>
                </ul>
              </div>
              <div className="mt-2 group">
                <span className="py-2 text-sm font-semibold text-primary-500 hover:text-primary-300 flex justify-between"><span>Status</span> <FontAwesomeIcon icon={faChevronDown} /></span>
                <ul className="hidden group-hover:flex flex-col gap-4 px-4 mt-2">
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Trending</span></li>
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Status</span></li>
                  <li className="text-sm font-semibold text-primary-500 hover:text-primary-300"><span>Marketplace</span></li>
                </ul>
              </div>
              <span className="py-2 mt-2 text-sm font-semibold text-primary-500 hover:text-primary-300">Marketplace</span>
            </nav>
          </div >
        </div >
      </section >
    </>
  );
}
