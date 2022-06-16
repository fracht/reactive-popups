import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import { renderPopups, usePopupsByGroup } from 'reactive-popups';

import { SnackbarGroup } from '.';

export const SnackbarContainer = () => {
    const popups = usePopupsByGroup(SnackbarGroup);

    return (
        <React.Fragment>
            <button
                onClick={() => {
                    popups[popups.length - 1].close();
                }}
            >
                close last popup
            </button>
            <TransitionGroup
                style={{
                    position: 'fixed',
                    top: 14,
                    left: 20,
                }}
            >
                {renderPopups(popups)}
            </TransitionGroup>
        </React.Fragment>
    );
};
