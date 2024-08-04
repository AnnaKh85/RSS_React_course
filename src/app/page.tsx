"use client";

import {store} from './store';
import {Provider} from 'react-redux';
import React from "react";
import {ScriptProps} from "next/dist/client/script";


export default function MainPage(prop: ScriptProps): React.ReactNode {
    return (
        <Provider store={store}>
            {prop.children}
        </Provider>
    );
}

