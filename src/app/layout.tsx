'use client';

import React from 'react';
import { ThemeProvider } from './lib/context/ThemeContext';
import { store } from './store';
import { Provider } from 'react-redux';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <Provider store={store}>
          <body>{children}</body>
        </Provider>
      </ThemeProvider>
    </html>
  );
}
