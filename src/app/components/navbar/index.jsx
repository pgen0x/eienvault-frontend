'use client';
import { useWindowScroll } from '@/app/lib/hooks/use-window-scroll';
import { useIsDarkMode } from '@/app/lib/hooks/use-is-dark-mode';
import cn from 'classnames';
import Logo from '@/app/components/navbar/logoicon';
import Search from '@/app/components/navbar/search';
import NavMenu from './navmenu';
import RightArea from './rightarea';

//web3 Modal libs
import { Web3Modal } from '@web3modal/react';
import { WagmiConfig } from 'wagmi';
import { initializeApp } from '../eth/wagmiConfig';

export default function Navbar() {
  const { isDarkMode } = useIsDarkMode();
  const { wagmiConfig, projectId, ethereumClient } = initializeApp();
  return (
    <>
      <div className="sticky top-0 z-40 inline-flex w-full items-center justify-center  px-10 transition-all">
        <nav className="3xl:h-24 dark:from-dark dark:to-dark/60 top-0 z-10 mt-4 h-16 w-full max-w-full rounded-2xl bg-gradient-to-b from-white to-white/60 px-3 backdrop-blur transition-all duration-300 sm:h-20">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo />
              <Search />
              <NavMenu />
            </div>
            <div className="flex items-center">
              <>
                <WagmiConfig config={wagmiConfig}>
                  <RightArea suppressHydrationWarning />
                </WagmiConfig>
              </>
            </div>
          </div>
        </nav>
      </div>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={isDarkMode ? 'dark' : 'light'}
        chainImages={{
          666888: '/helaicon.svg',
          42261: 'https://cryptologos.cc/logos/oasis-network-rose-logo.png',
        }}
        tokenImages={{ HLUSD: '/helaicon.svg' }}
        themeVariables={{
          '--w3m-accent-color': '#32A9ff',
          '--w3m-overlay-backdrop-filter': 'blur(8px)',
          '--w3m-background-color': '#32A9ff',
        }}
      />
    </>
  );
}
