import React from 'react';
import { useResponsePopup } from 'reactive-popups';

import { ConfirmPopup } from './ConfirmPopup';
import { FalsyResponsePopup } from './FalsyResponsePopup';
import { DefaultPopupGroup } from '.';

export const App = () => {
    const confirm = useResponsePopup(ConfirmPopup, {}, DefaultPopupGroup);

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
                        console.error(e);
                    }
                }}
            >
                confirm
            </button>
            {/* <FalsyResponsePopup /> */}
        </div>
    );
};
