import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import {
    PopupsContextProvider,
    PopupsRenderer,
    usePopupsContext,
} from '@reactive-popups/core';

import { App } from './App';

import './styles.css';

const PopupsWrapper = ({ children }: PropsWithChildren<{}>) => {
    const { empty } = usePopupsContext();

    return (
        <div
            style={{
                background: 'gray',
                position: 'absolute',
                inset: 0,
                display: empty() ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </div>
    );
};

const SnackbarsWrapper = ({ children }: PropsWithChildren<{}>) => {
    // const { empty } = usePopupsContext();

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </div>
    );
};

ReactDOM.render(
    <PopupsContextProvider>
        <App />
        <SnackbarsWrapper>
            <PopupsRenderer />
        </SnackbarsWrapper>
    </PopupsContextProvider>,
    document.getElementById('root')
);
