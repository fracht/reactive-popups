import React, { useCallback, useState } from 'react';
import { useCloseHandler } from 'reactive-popups';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

export type MuiPopupProps = {
    content: string;
};

export const MuiPopup: React.FunctionComponent<MuiPopupProps> = ({
    content,
}) => {
    const [open, setOpen] = useState(true);

    const close = useCallback(() => {
        setOpen(false);
    }, []);

    const unmount = useCloseHandler(close);

    return (
        <Dialog
            open={open}
            onClose={close}
            TransitionProps={{ onExited: unmount }}
        >
            <DialogTitle>Single popup</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={close}>close</Button>
            </DialogActions>
        </Dialog>
    );
};
