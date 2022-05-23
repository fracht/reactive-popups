import React, { useCallback, useState } from 'react';
import { ResponsePopupProps, useCloseHandler } from 'reactive-popups';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export type ConfirmPopupProps = ResponsePopupProps<boolean> & {
    message: string;
};

export const ConfirmPopup = ({
    message,
    unmount,
    resolve,
    reject,
}: ConfirmPopupProps) => {
    const [open, setOpen] = useState(true);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    useCloseHandler(close);

    return (
        <Dialog
            open={open}
            onClose={() => {
                console.log('OnClose fired');
                reject('closed popup');
            }}
            TransitionProps={{ onExited: unmount }}
        >
            <DialogTitle>Confirmation popup</DialogTitle>
            <DialogContent>{message}</DialogContent>
            <DialogActions>
                <Button onClick={() => resolve(false)}>CANCEL</Button>
                <Button onClick={() => resolve(true)} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
