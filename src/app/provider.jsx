'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/app/lib/hooks/AuthContext';
import { SidebarProvider } from './lib/hooks/SidebarContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
