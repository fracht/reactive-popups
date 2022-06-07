import React, { useCallback, useState } from 'react';
import {
    useCloseHandler,
    useResponseHandler,
    useResponsePopup,
} from 'reactive-popups';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';

import { ConfirmPopup } from './ConfirmPopup';
import { FalsyResponsePopup } from './FalsyResponsePopup';
import { DefaultPopupGroup } from '.';

const AnotherPopup = () => {
    const [open, setOpen] = useState(true);

    const close = useCallback(() => {
        // console.log('before');
        // await new Promise((res) => setTimeout(res, 2000));
        // console.log('after');
        setOpen(false);
    }, []);

    const unmount = useCloseHandler(close);
    const { reject, resolve } = useResponseHandler();

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
            <DialogContent>Hello world!</DialogContent>
            <DialogActions>
                <Button onClick={() => resolve(false)}>CANCEL</Button>
                <Button onClick={() => resolve(true)} autoFocus>
                    OK
                </Button>
                <Button onClick={close}>BREAK</Button>
            </DialogActions>
        </Dialog>
    );
};

const Comp = () => {
    const confirm = useResponsePopup(AnotherPopup, {}, DefaultPopupGroup);

    return (
        <button
            onClick={async () => {
                try {
                    if (await confirm()) {
                        console.log('Agreed');
                    } else {
                        console.log('Disagreed');
                    }
                } catch (e) {
                    console.error('Reject happened', e);
                }
            }}
        >
            Hello!{' '}
        </button>
    );
};

export const App = () => {
    const confirm = useResponsePopup(ConfirmPopup, {}, DefaultPopupGroup);

    const [state, setState] = useState(false);

    return (
        <div>
            <button
                onClick={async () => {
                    try {
                        if (await confirm({ message: 'Do you agree?' })) {
                            console.log('Agreed');
                        } else {
                            console.log('Disagreed');
                        }
                    } catch (e) {
                        console.error('Reject happened', e);
                    }
                }}
            >
                confirm
            </button>
            <FalsyResponsePopup />
            <button onClick={() => setState((old) => !old)}>toggle</button>
            {state && <Comp />}
        </div>
    );
};
