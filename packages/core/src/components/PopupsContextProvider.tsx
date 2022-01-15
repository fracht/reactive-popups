import React, { PropsWithChildren } from 'react';
import { useStock } from 'stocked';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';
import { PopupsRegistryContext } from '../PopupsRegistryContext';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';

type PopupsContextProviderType = PropsWithChildren<{}>;

export const PopupsContextProvider = ({
    children,
}: PopupsContextProviderType) => {
    const registry = useStock<PopupsRegistry>({
        initialValues: {
            popups: {},
        },
    });

    const context = usePopupsBag(registry);

    return (
        <PopupsRegistryContext.Provider value={registry}>
            <PopupsContext.Provider value={context as PopupsBag}>
                {children}
            </PopupsContext.Provider>
        </PopupsRegistryContext.Provider>
    );
};
