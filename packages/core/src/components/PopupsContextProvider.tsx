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
    const { popups, isPopupVisible, ...context } = usePopupsBag();

    return (
        <PopupsContext.Provider value={context}>
            {/* After open event has occured, children rerenders. FIXME - prevent it. Maybe use stocked */}
            {children}
            <PopupsWrapper>
                {popups
                    .filter((popup) => isPopupVisible(popup.id))
                    .map(({ PopupComponent, props, id }) => {
                        return <PopupComponent {...props} key={id} id={id} />;
                    })}
            </PopupsWrapper>
        </PopupsContext.Provider>
    );
};
