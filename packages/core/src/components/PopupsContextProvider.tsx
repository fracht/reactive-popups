import React, { PropsWithChildren } from 'react';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';
import { PopupsBag } from '../types/PopupsBag';

type PopupsContextProviderType = PropsWithChildren<{}>;

export const PopupsContextProvider = ({
    children,
}: PopupsContextProviderType) => {
    const context = usePopupsBag();

    return (
        <PopupsContext.Provider value={context as PopupsBag}>
            {children}
        </PopupsContext.Provider>
    );
};
