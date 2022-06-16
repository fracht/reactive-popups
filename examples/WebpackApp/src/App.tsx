import React, { useCallback } from 'react';
import { useResponsePopup } from 'reactive-popups';

import { AlertTrigger } from './Alert';
import { ConfirmPopup } from './ConfirmPopup';
import { FalsyResponsePopup } from './FalsyResponsePopup';
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
            <AlertTrigger />
        </div>
    );
};
