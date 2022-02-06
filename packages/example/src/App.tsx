import React from 'react';

import { Component } from './Component';
import { PopupsFactory } from './PopupsFactory';

export const App = () => {
    console.log('Rerender whole application');
    return (
        <div>
            {/* <Component userId={1} /> */}
            <PopupsFactory />
        </div>
    );
};
