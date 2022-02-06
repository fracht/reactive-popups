import React from 'react';
import ReactDOM from 'react-dom';
import { PopupsContextProvider } from '@reactive-popups/core';

import { App } from './App';

import './styles.css';

ReactDOM.render(
    <PopupsContextProvider>
        <App />
    </PopupsContextProvider>,
    document.getElementById('root')
);
