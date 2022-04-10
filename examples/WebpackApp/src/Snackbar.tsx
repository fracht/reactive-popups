import React from 'react';

export type SnackbarProps = {
    message: string;
};

export const Snackbar = ({ message }: SnackbarProps) => {
    return <div>{message}</div>;
};
