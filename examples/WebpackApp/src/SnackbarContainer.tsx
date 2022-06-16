import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { usePopupsByGroup } from 'reactive-popups';

import { SnackbarGroup } from '.';

export const SnackbarContainer = () => {
    const popups = usePopupsByGroup(SnackbarGroup);

    return (
        <TransitionGroup
            style={{
                position: 'fixed',
                top: 14,
                left: 20,
            }}
        >
            {popups}
        </TransitionGroup>
    );
};
