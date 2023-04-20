import React, { PropsWithChildren } from 'react';

import { PopupsContext } from '../PopupsContext';
import { PopupsBag } from '../types/PopupsBag';
import { PopupIdentifierProvider } from '../utils/PopupIdentifierContext';

const emptyFunction = () => {
    // do nothing
};

const throwControlledPopupsContextException = () => {
    throw new Error(
        'Cannot use PopupsContext inside "UncontrolledPopupsContextProvider". If you want to use controlled popups, wrap your app with "PopupsContextProvider" instead.'
    );
};

const proxyGuard: ProxyHandler<object> = {
    // get: throwControlledPopupsContextException,
    set: throwControlledPopupsContextException,
    deleteProperty: throwControlledPopupsContextException,
    has: throwControlledPopupsContextException,
    defineProperty: throwControlledPopupsContextException,
    ownKeys: throwControlledPopupsContextException,
};

const emptyPopupsBag = new Proxy(
    {
        close: emptyFunction,
        getPopup: emptyFunction,
        mount: emptyFunction,
        popupsState: {},
        unmount: emptyFunction,
    },
    proxyGuard
) as PopupsBag;

export type UncontrolledPopupsContextProviderProps = PropsWithChildren<{
    unmount: () => void;
}>;

export const UncontrolledPopupsContextProvider = ({
    unmount,
    children,
}: UncontrolledPopupsContextProviderProps) => {
    return (
        <PopupsContext.Provider value={emptyPopupsBag}>
            <PopupIdentifierProvider
                popupIdentifier={{ type: 'uncontrolled', unmount }}
            >
                {children}
            </PopupIdentifierProvider>
        </PopupsContext.Provider>
    );
};
