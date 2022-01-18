import React from 'react';
import { useStockValue } from 'stocked';

import { usePopupsRegistryContext } from '../hooks/usePopupsRegistryContext';

export const PopupsRenderer = () => {
    const registry = usePopupsRegistryContext();

    const popups = useStockValue(registry.paths.popups, registry);

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
