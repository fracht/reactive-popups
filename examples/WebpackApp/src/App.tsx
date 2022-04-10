import React from 'react';
import { usePopupsFactory } from 'reactive-popups';

import { Snackbar } from './Snackbar';
import { snackbarGroup } from './SnackbarRenderer';

const snackbarProps = {
    message: 'hello',
};

export const App = () => {
    const [open] = usePopupsFactory(Snackbar, snackbarProps, snackbarGroup);

    return (
        <div>
            <button onClick={open}>test snacks</button>
        </div>
    );
};
