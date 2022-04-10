import React from 'react';
import { usePopupsContext } from 'reactive-popups';

export const snackbarGroup = Symbol('Snackbar');

export const SnackbarRenderer = () => {
    const { getPopupsByGroup } = usePopupsContext();

    return (
        <div
            style={{
                position: 'absolute',
                right: 0,
                top: 0,
                border: '1px solid black',
            }}
        >
            {getPopupsByGroup(snackbarGroup).map(
                ({ PopupComponent, props, id, ...popupProps }) => (
                    <PopupComponent key={id} {...props} {...popupProps} />
                )
            )}
        </div>
    );
};
