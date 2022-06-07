import React, { useCallback, useState } from 'react';
import { useCloseHandler, useResponseHandler } from 'reactive-popups';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export type ConfirmPopupProps = {
    message: string;
};

export const ConfirmPopup = ({ message }: ConfirmPopupProps) => {
    const [open, setOpen] = useState(true);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    const unmount = useCloseHandler(close);
    const { reject, resolve } = useResponseHandler()!;

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