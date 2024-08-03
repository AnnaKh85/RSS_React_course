import React from 'react';
import { ThemeProvider } from './lib/context/ThemeContext';

export const metadata = {
  title: 'Next.js. Проба в1.0',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
