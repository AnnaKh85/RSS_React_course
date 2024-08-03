'use client';

import { store } from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './lib/context/ThemeContext.tsx';
import React from 'react';
import type { ScriptProps } from 'next/dist/client/script';

export default function MainPage(prop: ScriptProps): React.ReactNode {
  return (
    <Provider store={store}>
      <ThemeProvider>{prop.children}</ThemeProvider>
    </Provider>
  );
}
