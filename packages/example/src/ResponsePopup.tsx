import React from 'react';
import {
    PopupProps,
    ResponsePopupProps,
    useResponsePopup,
} from '@reactive-popups/core';

type ConfirmPopupProps = {
    message: string;
} & ResponsePopupProps<boolean> &
    PopupProps;

const ConfirmPopup = ({
    message,
    resolve,
    unmountPopup,
}: ConfirmPopupProps) => {
    return (
        <div>
            <h1>{message}</h1>
            <button onClick={() => resolve(true)}>OK</button>
            <button onClick={() => resolve(false)}>CANCEL</button>
            <button onClick={unmountPopup}>CLOSE</button>
        </div>
    );
};

export const ResponsePopup = () => {
    const confirm = useResponsePopup(ConfirmPopup, {});

    const onClick = async () => {
        try {
            if (await confirm({ message: 'i am gay' })) {
                console.log('CONFIRMED');
            } else {
                console.log('REJECTED');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <button onClick={onClick}>open response popup</button>
        </div>
    );
};
