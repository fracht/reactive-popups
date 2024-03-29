import React, { useCallback, useState } from 'react';
import { useResponseHandler } from 'reactive-popups';
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
        // console.log('before');
        // await new Promise((res) => setTimeout(res, 2000));
        // console.log('after');
        setOpen(false);
    }, []);

    const { reject, resolve, unmount } = useResponseHandler<boolean>(close);

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
                <Button onClick={unmount}>BREAK</Button>
            </DialogActions>
        </Dialog>
    );
};
