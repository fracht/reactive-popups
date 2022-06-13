import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

import { SnackbarGroup } from '.';
import {
    useCloseHandler,
    usePopupsFactory,
} from '../../../dist/reactive-popups';

export const SnackbarPopup = ({ message }: { message: string }) => {
    const [open, setOpen] = useState(true);

    const close = () => {
        setOpen(false);
    };

    const unmount = useCloseHandler(close);

    return (
        <Snackbar
            open={open}
            TransitionProps={{ onExited: unmount }}
            onClose={close}
        >
            <Alert severity="success">{message}</Alert>
        </Snackbar>
    );
};

export const SnackbarTrigger = () => {
    const showSnackbar = usePopupsFactory(SnackbarPopup, {}, SnackbarGroup);

    return (
        <button
            onClick={() => {
                showSnackbar({ message: 'hello' });
            }}
        >
            trigger Snackbar
        </button>
    );
};
