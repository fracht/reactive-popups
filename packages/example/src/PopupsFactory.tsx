import React from 'react';
import { PopupProps, usePopupsFactory } from '@reactive-popups/core';

type SnackBarProps = {
    message: string;
} & PopupProps;

const Snackbar = ({ message, id, unmountPopup }: SnackBarProps) => {
    return (
        <h1 style={{ color: 'red', padding: 10 }}>
            {message}:{id} <button onClick={unmountPopup}>X</button>
        </h1>
    );
};

const emptyObj = {};

export const PopupsFactory = ({ group }: { group: symbol }) => {
    const [create, destroy] = usePopupsFactory(Snackbar, emptyObj, group);

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
            }}
        >
            <button
                onClick={() => {
                    create({ message: 'hello world' });
                }}
            >
                spawn popup
            </button>
        </div>
    );
};
