import React from 'react';

import { PopupGroup } from './PopupGroup';
import { usePopupsContext } from '../hooks/usePopupsContext';

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer = ({ group }: PopupsRendererProps) => {
    const { getPopupsByGroup } = usePopupsContext();

    return (
        <React.Fragment>
            {getPopupsByGroup(group).map(
                ({ PopupComponent, props, id, ...popupProps }) => {
                    return (
                        <PopupComponent {...props} key={id} {...popupProps} />
                    );
                }
            )}
        </React.Fragment>
    );
};
