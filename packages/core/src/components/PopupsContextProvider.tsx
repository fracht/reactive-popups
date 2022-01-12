import React, { ComponentType, PropsWithChildren } from 'react';

import { usePopupsBag } from '../hooks/usePopupsBag';
import { PopupsContext } from '../PopupsContext';

type PopupsContextProviderType = PropsWithChildren<{
    PopupsWrapper?: ComponentType<PropsWithChildren<{}>>;
}>;

export const PopupsContextProvider = ({
    children,
    PopupsWrapper = React.Fragment,
}: PopupsContextProviderType) => {
    const { popups, visiblePopups, ...context } = usePopupsBag();

    return (
        <PopupsContext.Provider value={context}>
            {children}
            <PopupsWrapper>
                {popups
                    .filter((popup) => visiblePopups.has(popup.id))
                    .map(({ PopupComponent, props, id }) => {
                        return <PopupComponent {...props} key={id} id={id} />;
                    })}
            </PopupsWrapper>
        </PopupsContext.Provider>
    );
};
