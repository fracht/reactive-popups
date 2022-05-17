import React, { useCallback, useState } from 'react';
import { PopupProps, useCloseHandler } from 'reactive-popups';
import { Alert, Snackbar } from '@mui/material';

export type SnackbarProps = {
    message: string;
} & PopupProps;

export const SnackbarPopup = ({
    message,
    unmount,
    popupIdentifier,
}: SnackbarProps) => {
    const [visible, setVisible] = useState<boolean>(true);

    const close = useCallback(() => {
        console.log('closing...');
        setVisible(false);
    }, []);

    useCloseHandler(popupIdentifier, close);

    return (
        <Snackbar
            open={visible}
            onClose={close}
            transitionDuration={1000}
            TransitionProps={{
                onExited: () => {
                    console.log('Unmount now!');
                    unmount();
                },
            }}
        >
            <Alert severity="success" onClose={close}>
                {message}
            </Alert>
        </Snackbar>
    );
};
