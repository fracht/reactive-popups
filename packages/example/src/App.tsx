import React, { PropsWithChildren } from 'react';
import {
    PopupsRenderer,
    usePopupGroup,
    usePopupsContext,
} from '@reactive-popups/core';

import { Component } from './Component';
import { PopupsFactory } from './PopupsFactory';
import { ResponsePopup } from './ResponsePopup';

const PopupsWrapper = ({ children }: PropsWithChildren<{}>) => {
    const { empty } = usePopupsContext();

    return (
        <div
            style={{
                background: 'gray',
                position: 'absolute',
                inset: 0,
                display: empty() ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {children}
        </div>
    );
};

const SnackbarsWrapper = ({ children }: PropsWithChildren<{}>) => {
    // const { empty } = usePopupsContext();

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </div>
    );
};

export const App = () => {
    console.log('Rerender whole application');

    const snackbarGroup = usePopupGroup();

    return (
        <div>
            {/* <Component userId={1} />
            <PopupsFactory group={snackbarGroup} /> */}
            <ResponsePopup />

            <PopupsWrapper>
                <PopupsRenderer />
            </PopupsWrapper>

            <SnackbarsWrapper>
                <PopupsRenderer group={snackbarGroup} />
            </SnackbarsWrapper>
        </div>
    );
};
