import React, { PropsWithChildren } from 'react';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';

type PopupsContextProviderType = PropsWithChildren<{}>;

export const PopupsContextProvider = ({
    children,
}: PopupsContextProviderType) => {
    const { popups, visiblePopups, ...context } = usePopupsBag();

    return (
        <PopupsContext.Provider value={context}>
            {children}
            {popups
                .filter((popup) => visiblePopups.has(popup.id))
                .map(({ PopupComponent, props, id }) => {
                    return <PopupComponent {...props} key={id} id={id} />;
                })}
        </PopupsContext.Provider>
    );
};
