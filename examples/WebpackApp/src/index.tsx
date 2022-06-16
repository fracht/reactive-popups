import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { createPopupGroup, PopupsContextProvider } from 'reactive-popups';
import { createRoot } from 'react-dom/client';

import { App } from './App';

export const SnackbarGroup = createPopupGroup();
export const DefaultPopupGroup = createPopupGroup();

const container = document.getElementById('root');

const root = createRoot(container as HTMLElement);

const Hello = React.memo(() => {
    console.log('rerender');
    return <DefaultPopupGroup />;
});

root.render(
    <PopupsContextProvider>
        <App />
        <TransitionGroup
            style={{
                position: 'fixed',
                top: 14,
                left: 20,
            }}
        >
            <SnackbarGroup />
        </TransitionGroup>
        <Hello />
    </PopupsContextProvider>
);
