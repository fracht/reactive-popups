import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { PopupsContextProvider } from '@reactive-popups/core';

import { App } from './App';

import './styles.css';

const PopupsWrapper = ({ children }: PropsWithChildren<{}>) => {
    return (
        <div
            style={{
                background: 'gray',
                position: 'absolute',
                left: 0,
                bottom: 0,
                right: 0,
                opacity: 0.3,
                height: 500,
            }}
        >
            {children}
        </div>
    );
};

ReactDOM.render(
    <PopupsContextProvider PopupsWrapper={PopupsWrapper}>
        <App />
    </PopupsContextProvider>,
    document.getElementById('root')
);
