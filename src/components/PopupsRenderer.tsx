import React from 'react';

import { PopupGroup } from './PopupGroup';
import { usePopupsContext } from '../hooks/usePopupsContext';
import { PopupIdentifierProvider } from '../utils/PopupIdentifierContext';
import { ResponsePopupProvider } from '../utils/ResponsePopupContext';

export type PopupsRendererProps = {
    group: PopupGroup;
};

export const PopupsRenderer = ({ group }: PopupsRendererProps) => {
    const { getPopupsByGroup } = usePopupsContext();

    return (
        <React.Fragment>
            {getPopupsByGroup(group).map(
                ({
                    PopupComponent,
                    props,
                    popupIdentifier,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    close,
                    resolve,
                    reject,
                    ...popupProps
                }) => {
                    return (
                        <PopupIdentifierProvider
                            key={popupIdentifier.id}
                            popupIdentifier={popupIdentifier}
                        >
                            <ResponsePopupProvider
                                resolve={resolve}
                                reject={reject}
                            >
                                <PopupComponent {...props} {...popupProps} />
                            </ResponsePopupProvider>
                        </PopupIdentifierProvider>
                    );
                }
            )}
        </React.Fragment>
    );
};
