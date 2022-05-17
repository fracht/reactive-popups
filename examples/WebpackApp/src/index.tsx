import React from 'react';
import { createPopupGroup, PopupsContextProvider } from 'reactive-popups';
import { createRoot } from 'react-dom/client';

import { App } from './App';

export const SnackbarGroup = createPopupGroup();

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(
    <PopupsContextProvider>
        <App />
        <SnackbarGroup />
    </PopupsContextProvider>
);
