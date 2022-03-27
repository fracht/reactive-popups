import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material';
import { PopupsContextProvider, PopupsRenderer } from '@reactive-popups/core';

import { App } from './App';
import { theme } from './theme';

import './styles.css';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <PopupsContextProvider>
            <React.Fragment>
                <App />
                <PopupsRenderer />
            </React.Fragment>
        </PopupsContextProvider>
    </ThemeProvider>,
    document.getElementById('root')
);
