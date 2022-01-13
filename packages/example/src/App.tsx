import React from 'react';
import { PopupsContextProvider } from '@reactive-popups/core';

import { Component } from './Component';

export const App = () => {
    return (
        <PopupsContextProvider>
            <div>
                <Component />
            </div>
        </PopupsContextProvider>
    );
};
