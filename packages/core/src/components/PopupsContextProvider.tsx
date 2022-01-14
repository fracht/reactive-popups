import React, { PropsWithChildren } from 'react';
import { Stock, StockContext } from 'stocked';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';
import { PopupProps } from '../types/PopupProps';
import { PopupsContextType } from '../types/PopupsContextType';

type PopupsContextProviderType = PropsWithChildren<{}>;

export const PopupsContextProvider = ({
    children,
}: PopupsContextProviderType) => {
    const { stock, ...context } = usePopupsBag();

    return (
        <StockContext.Provider value={stock as Stock<object>}>
            <PopupsContext.Provider
                value={context as PopupsContextType<PopupProps>}
            >
                {children}
            </PopupsContext.Provider>
        </StockContext.Provider>
    );
};
