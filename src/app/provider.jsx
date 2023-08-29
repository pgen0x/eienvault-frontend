'use client';

import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/app/lib/hooks/AuthContext';

export function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider
        attribute="class"
        enableSystem={false}
        defaultTheme="light"
      >
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
