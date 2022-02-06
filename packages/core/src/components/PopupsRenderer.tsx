import React from 'react';

import { usePopupsContext } from '../hooks/usePopupsContext';

export const PopupsRenderer = () => {
    const { popups } = usePopupsContext();

    return Object.keys(popups).length > 0 ? (
        <React.Fragment>
            {Object.values(popups).map(
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
    ) : null;
};
