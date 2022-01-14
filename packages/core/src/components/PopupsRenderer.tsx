import React from 'react';
import { useStockContext, useStockValue } from 'stocked';

import { PopupsRegistry } from '../types/PopupsRegistry';

export const PopupsRenderer = () => {
    const { paths } = useStockContext<PopupsRegistry>();

    const popups = useStockValue(paths.popups);

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
