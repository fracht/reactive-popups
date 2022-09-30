import React, { useCallback } from 'react';
import { usePopup, useResponsePopup } from 'reactive-popups';

import { AlertTrigger } from './Alert';
import { ConfirmPopup } from './ConfirmPopup';
import { MuiPopup } from './MuiPopup';
import { TestComponent } from './TestComponent';
import { DefaultPopupGroup } from '.';

export const App = () => {
    const confirm = useResponsePopup(ConfirmPopup, {}, DefaultPopupGroup);
    const [open, close] = usePopup(
        MuiPopup,
        { content: 'Single popup example using usePopup hook' },
        DefaultPopupGroup
    );

    const openConfirmPopup = useCallback(async () => {
        try {
            if (await confirm({ message: 'Do you agree?' })) {
                console.log('Agreed');
            } else {
                console.log('Disagreed');
            }
        } catch (e) {
            console.log('Reject happened', e);
        }
    }, [confirm]);

    return (
        <div>
            <button onClick={openConfirmPopup}>useResponsePopup</button>
            <button
                onClick={() => {
                    open();
                    setTimeout(close, 5000);
                }}
            >
                usePopup
            </button>
            {/* <FalsyResponsePopup /> */}
            <AlertTrigger />
            <TestComponent />
        </div>
    );
};
