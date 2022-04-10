import React from 'react';
import { PopupsContextProvider } from 'reactive-popups';
import { createRoot } from 'react-dom/client';

import { App } from './App';
import { SnackbarRenderer } from './SnackbarRenderer';

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

root.render(
    <PopupsContextProvider>
        <App />
        <SnackbarRenderer />
    </PopupsContextProvider>
);
