'use client';

import { store } from './store';
import { Provider } from 'react-redux';
import React, { ReactNode } from 'react';

export interface PageProps {
  children?: ReactNode;
}

const MainPage: React.FC<PageProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default MainPage;
