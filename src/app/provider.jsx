'use client';

import { AuthProvider } from '@/hooks/AuthContext';
import { initializeApp } from '@/hooks/eth/wagmiConfig';
import { useIsDarkMode } from '@/hooks/use-is-dark-mode';
import { Web3Modal } from '@web3modal/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';
import { SidebarProvider } from '../hooks/SidebarContext';

const { wagmiConfig, projectId, ethereumClient, helamainnet, helatestnet } =
  initializeApp();

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useIsDarkMode();

  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      {mounted && (
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
              {children}
              <Web3Modal
                projectId={projectId}
                defaultChain={
                  process.env.NEXT_PUBLIC_NODE_ENV === 'production'
                    ? helamainnet
                    : helatestnet
                }
                ethereumClient={ethereumClient}
                themeMode={isDarkMode ? 'dark' : 'light'}
                chainImages={{
                  666888: '/helaicon.svg',
                  8668: '/helaicon.svg',
                }}
                tokenImages={{
                  HLUSD: '/helaicon.svg',
                }}
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
      )}
    </WagmiConfig>
  );
}
