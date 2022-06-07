import React, { useMemo } from 'react';

import { PopupGroup } from './PopupGroup';
import { usePopupsContext } from '../hooks/usePopupsContext';
import { PopupIdentifierProvider } from '../utils/PopupIdentifierContext';

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer = ({ group }: PopupsRendererProps) => {
    const { getPopupsByGroup } = usePopupsContext();

    return (
        <React.Fragment>
            {getPopupsByGroup(group).map(
                ({ PopupComponent, props, popupIdentifier }) => {
                    return (
                        <PopupIdentifierProvider
                            key={popupIdentifier.id}
                            popupIdentifier={popupIdentifier}
                        >
                            <PopupComponent {...(props as object)} />
                        </PopupIdentifierProvider>
                    );
                }
            )}
        </React.Fragment>
    );
};
