import React, { useCallback } from 'react';
import { useResponsePopup } from 'reactive-popups';

import { ConfirmPopup } from './ConfirmPopup';
import { FalsyResponsePopup } from './FalsyResponsePopup';
import { SnackbarTrigger } from './Snackbar';
import { DefaultPopupGroup } from '.';

export const App = () => {
    const confirm = useResponsePopup(ConfirmPopup, {}, DefaultPopupGroup);

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
            <button onClick={openConfirmPopup}>confirm</button>
            {/* <FalsyResponsePopup /> */}
            <SnackbarTrigger />
        </div>
    );
};
