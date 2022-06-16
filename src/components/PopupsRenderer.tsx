import React from 'react';
import { ReactElement } from 'react';

import { PopupGroup } from './PopupGroup';
import { usePopupsContext } from '../hooks/usePopupsContext';
import { Popup } from '../types/Popup';
import { PopupIdentifierProvider } from '../utils/PopupIdentifierContext';

export const renderPopups = (popups: Popup<unknown>[]): ReactElement[] =>
    popups.map(({ PopupComponent, props, popupIdentifier }) => (
        <PopupIdentifierProvider
            key={popupIdentifier.id}
            popupIdentifier={popupIdentifier}
        >
            <PopupComponent {...(props as object)} />
        </PopupIdentifierProvider>
    ));

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer = ({ group }: PopupsRendererProps) => {
    const { getPopupsByGroup } = usePopupsContext();

    return (
        <React.Fragment>{renderPopups(getPopupsByGroup(group))}</React.Fragment>
    );
};
