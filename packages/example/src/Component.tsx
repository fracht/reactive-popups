import React from 'react';
import { PopupProps, usePopup } from '@reactive-popups/core';

type PopupComponentProps = {
    message: string;
} & PopupProps;

const PopupComponent = ({ message, id }: PopupComponentProps) => {
    console.log(message, id);

    return (
        <div>
            {message}:{id}
        </div>
    );
};

const props = {
    message: 'hello',
};

const props2 = {
    message: 'world',
};

export const Component = () => {
    const [open, close] = usePopup(PopupComponent, props);
    const [open2, close2] = usePopup(PopupComponent, props2);

    return (
        <div>
            <button onClick={open}>open</button>
            <button onClick={close}>close</button>

            <button onClick={open2}>open2</button>
            <button onClick={close2}>close2</button>
        </div>
    );
};
