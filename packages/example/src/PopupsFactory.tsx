import React from 'react';
import { PopupProps, usePopupsFactory } from '@reactive-popups/core';

type SnackBarProps = {
    message: string;
} & PopupProps;

const Snackbar = ({ message, id, close }: SnackBarProps) => {
    return (
        <h1 style={{ color: 'red', padding: 10 }}>
            {message}:{id} <button onClick={close}>X</button>
        </h1>
    );
};

const emptyObj = {};

export const PopupsFactory = () => {
    const [create, destroy] = usePopupsFactory(Snackbar, emptyObj);

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
