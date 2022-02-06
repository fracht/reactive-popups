import React from 'react';

import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { usePopupsContext } from '../hooks/usePopupsContext';

export type PopupsRendererProps = {
    group?: symbol;
};

export const PopupsRenderer = ({
    group = DEFAULT_GROUP_SYMBOL,
}: PopupsRendererProps) => {
    const { popups } = usePopupsContext();

    if (!popups[group] || Object.keys(popups[group]).length === 0) {
        return null;
    }

    return (
        <React.Fragment>
            {Object.values(popups[group]).map(
                ({ PopupComponent, props, ...popupProps }) => {
                    return (
                        <PopupComponent
                            {...props}
                            key={popupProps.id}
                            {...popupProps}
                        />
                    );
                }
            )}
        </React.Fragment>
    );
};
