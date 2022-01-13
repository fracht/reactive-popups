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

export const Component = () => {
    const [open, close] = usePopup(PopupComponent, props);

    return (
        <div>
            <button onClick={open}>open</button>
            <button onClick={close}>close</button>
        </div>
    );
};
