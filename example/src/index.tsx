import React, { render } from 'react-dom';

import { App } from './App';
import { PopupsContextProvider } from '../../packages/core/src';

render(
    <PopupsContextProvider>
        <App />
    </PopupsContextProvider>,
    document.getElementById('root')
);
