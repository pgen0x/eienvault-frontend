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

export default function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-40 inline-flex w-full items-center justify-center px-10 transition-all">
        <nav className="3xl:h-24 dark:from-dark dark:to-dark/60 top-0 z-10 mt-4 h-16 w-full max-w-full rounded-2xl bg-gradient-to-b from-white to-white/60 px-4 backdrop-blur transition-all duration-300 sm:h-20">
          <div className="flex h-full items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <Logo />
              <Search />
              <NavMenu />
            </div>
            <div className="flex items-center">
              <RightArea suppressHydrationWarning />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
