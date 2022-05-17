import React from 'react';
import { usePopupsFactory } from 'reactive-popups';

import { SnackbarPopup } from './SnackbarPopup';
import { SnackbarGroup } from '.';

const snackbarProps = {
    message: 'bye',
};

export const App = () => {
    const open = usePopupsFactory(SnackbarPopup, snackbarProps, SnackbarGroup);

    return (
        <div>
            <button
                onClick={() => {
                    const close = open();
                    setTimeout(close, 1000);
                }}
            >
                test snacks
            </button>
        </div>
    );
};
