import React from 'react';

import { usePopupsContext } from '../hooks/usePopupsContext';

export const PopupsRenderer = () => {
    const { popups } = usePopupsContext();

    return Object.keys(popups).length > 0 ? (
        <React.Fragment>
            {Object.values(popups).map(
                ({ PopupComponent, props, id, visible }) => {
                    return (
                        visible && (
                            <PopupComponent {...props} key={id} id={id} />
                        )
                    );
                }
            )}
        </React.Fragment>
    ) : null;
};
