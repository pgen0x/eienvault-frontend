'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/hooks/AuthContext';
import { SidebarProvider } from '../hooks/SidebarContext';
import { useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';
import { config } from '@/hooks/eth/wagmiConfig';
import { initializeApp } from '@/hooks/eth/wagmiConfig';
import { Web3Modal } from '@web3modal/react';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useIsDarkMode();

  useEffect(() => setMounted(true), []);
  const { wagmiConfig, projectId, ethereumClient, helachain } = initializeApp();
  return (
    <WagmiConfig config={wagmiConfig}>
      <AuthProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="light"
        >
          <ProgressBar
            height="4px"
            color="#f34054"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <SidebarProvider>
            {mounted && children}
            <Web3Modal
              projectId={projectId}
              defaultChain={helachain}
              ethereumClient={ethereumClient}
              themeMode={isDarkMode ? 'dark' : 'light'}
              chainImages={{
                666888: '/helaicon.svg',
                42261:
                  'https://cryptologos.cc/logos/oasis-network-rose-logo.png',
              }}
              tokenImages={{ HLUSD: '/helaicon.svg' }}
              themeVariables={{
                '--w3m-accent-color': '#F34054',
                '--w3m-overlay-backdrop-filter': 'blur(8px)',
                '--w3m-background-color': '#F34054',
                '--w3m-logo-image-url': '/logowhite.svg',
              }}
            />
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </WagmiConfig>
  );
}
