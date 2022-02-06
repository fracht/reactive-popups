import React from 'react';

import { Component } from './Component';

export const App = () => {
    console.log('Rerender whole application');
    return (
        <div>
            <Component userId={1} />
        </div>
    );
};
