import React, { ComponentType, PropsWithChildren } from 'react';

import { RenderPopups } from './RenderPopups';
import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';
import { PopupProps } from '../types/PopupProps';
import { PopupsContextType } from '../types/PopupsContextType';

type PopupsContextProviderType = PropsWithChildren<{
    PopupsWrapper?: ComponentType<PropsWithChildren<{}>>;
}>;

export const PopupsContextProvider = <P extends PopupProps = PopupProps>({
    children,
    PopupsWrapper,
}: PopupsContextProviderType) => {
    const { stock, ...context } = usePopupsBag<P>();

    return (
        <PopupsContext.Provider
            value={context as PopupsContextType<PopupProps>}
        >
            {children}

            <RenderPopups PopupsWrapper={PopupsWrapper} stock={stock} />
        </PopupsContext.Provider>
    );
};
