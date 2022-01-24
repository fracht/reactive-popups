import React, { PropsWithChildren } from 'react';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';

type PopupsContextProviderType = PropsWithChildren<{}>;

export const PopupsContextProvider = ({
    children,
}: PopupsContextProviderType) => {
    const context = usePopupsBag();

    return (
        <PopupsContext.Provider value={context}>
            {children}
        </PopupsContext.Provider>
    );
};
