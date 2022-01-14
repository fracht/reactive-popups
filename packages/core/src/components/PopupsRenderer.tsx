import React from 'react';
import { useStockContext, useStockValue } from 'stocked';

import { PopupProps } from '../types/PopupProps';
import { PopupsRegistry } from '../types/PopupsRegistry';

export const PopupsRenderer = <P extends PopupProps>() => {
    const { paths } = useStockContext<PopupsRegistry<P>>();

    const popups = useStockValue(paths.popups);

    return Object.keys(popups).length > 0 ? (
        <React.Fragment>
            {Object.values(popups).map(
                ({ PopupComponent, props, id, visible }) => {
                    return (
                        visible && (
                            <PopupComponent
                                {...(props as P)}
                                key={id}
                                id={id}
                            />
                        )
                    );
                }
            )}
        </React.Fragment>
    ) : null;
};
