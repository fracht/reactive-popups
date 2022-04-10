import React from 'react';

import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { usePopupsContext } from '../hooks/usePopupsContext';

export type PopupsRendererProps = {
    group?: symbol;
};

export const PopupsRenderer = ({
    group = DEFAULT_GROUP_SYMBOL,
}: PopupsRendererProps) => {
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
