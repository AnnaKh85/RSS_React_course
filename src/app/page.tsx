'use client';

import { store } from './store';
import { Provider } from 'react-redux';
import React from 'react';

export interface PageProps {
  children?: React.ReactNode;
}

export default function MainPage(prop: PageProps): React.ReactElement {
  return <Provider store={store}>{prop.children}</Provider>;
}