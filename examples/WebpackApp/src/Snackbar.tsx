import React, { useState } from 'react';
import { Alert, Button, Icon, IconButton, Snackbar } from '@mui/material';

import { SnackbarGroup } from '.';
import { useCloseHandler, usePopupsFactory } from 'reactive-popups';

export const SnackbarPopup: React.FC<{ message: string }> = ({ message }) => {
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
            <div>
                <Alert severity="success" onClick={close}>
                    {message}
                </Alert>
            </div>
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
