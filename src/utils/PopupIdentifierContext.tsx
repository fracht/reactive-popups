import React, { createContext, PropsWithChildren, useContext } from 'react';

import { PopupIdentifier } from '../types/PopupIdentifier';

const IdentifierContext = createContext<PopupIdentifier | undefined>(undefined);

export const PopupIdentifierProvider = ({
    children,
    popupIdentifier,
}: PropsWithChildren<{
    popupIdentifier: PopupIdentifier;
}>) => {
    return (
        <IdentifierContext.Provider value={popupIdentifier}>
            {children}
        </IdentifierContext.Provider>
    );
};

export const usePopupIdentifier = () => {
    return useContext(IdentifierContext)!;
};
