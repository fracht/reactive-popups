import { useCallback, useReducer, useRef } from 'react';

import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsBag } from '../types/PopupsBag';
import { ActionType, popupsReducer } from '../utils/popupsReducer';

export const usePopupsBag = (): PopupsBag => {
    const [popupsState, dispatch] = useReducer(popupsReducer, { popups: {} });

    const popupsStateRef = useRef(popupsState);
    popupsStateRef.current = popupsState;

    const getPopup = useCallback(({ groupId, id }: PopupIdentifier) => {
        const popups = popupsStateRef.current.popups;

        if (!popups[groupId] || !popups[groupId][id]) {
            return null;
        }

        return popups[groupId][id];
    }, []);

    const unmount = useCallback((popupIdentifier: PopupIdentifier) => {
        dispatch({ type: ActionType.UNMOUNT, payload: { popupIdentifier } });
    }, []);

    const mount = useCallback(<P = {}>(popup: Popup<P>) => {
        dispatch({
            type: ActionType.MOUNT,
            payload: {
                popup: popup as unknown as Popup<object>,
            },
        });

        return popup.popupIdentifier;
    }, []);

    const close = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const popup = getPopup(popupIdentifier);
            popup?.close();
        },
        [getPopup]
    );

    return {
        mount,
        unmount,
        getPopup,
        close,
        popupsState,
    };
};
