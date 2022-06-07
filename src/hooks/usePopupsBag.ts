import { ComponentType, useCallback, useEffect, useReducer } from 'react';

import { ResponseHandler } from './useResponseHandler';
import { PopupGroup } from '../components/PopupGroup';
import { PROMISE_NOT_SETTLED } from '../constants';
import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsBag } from '../types/PopupsBag';
import { isPromise } from '../utils/isPromise';
import { popupsReducer } from '../utils/popupsReducer';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    // TODO fix this
    const [{ popups }, dispatch] = useReducer(popupsReducer, { popups: {} });

    const getPopupsByGroup = useCallback(
        (group: PopupGroup) => {
            if (!popups[group.groupId]) {
                return [];
            }

            return Object.values(popups[group.groupId]);
        },
        [popups]
    );

    const getPopup = useCallback(
        ({ groupId, id }: PopupIdentifier) => {
            return popups[groupId][id];
        },
        [popups]
    );

    const unmount = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const popup = getPopup(popupIdentifier);

            if (!popup.isSettled) {
                throw new Error(PROMISE_NOT_SETTLED);
            }

            dispatch({ type: 'remove', popupIdentifier });
        },
        [getPopup]
    );

    const mount = useCallback(
        <P>(
            PopupComponent: ComponentType<P>,
            props: P,
            group: PopupGroup,
            handler?: ResponseHandler
        ) => {
            const id = uuid();

            const popupIdentifier: PopupIdentifier = {
                id,
                groupId: group.groupId,
            };

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                popupIdentifier,
                isSettled: !handler,
                ...handler,
            };

            dispatch({
                type: 'add',
                popupIdentifier,
                popup: newPopup as Popup<unknown>,
            });

            return popupIdentifier;
        },
        []
    );

    const close = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const popup = getPopup(popupIdentifier);
            if (popup.close) {
                const possiblePromise = popup.close();

                if (isPromise(possiblePromise)) {
                    possiblePromise.then(() => {
                        unmount(popupIdentifier);
                    });
                }
            }
        },
        [unmount, getPopup]
    );

    const setCloseHandler = useCallback(
        (
            popupIdentifier: PopupIdentifier,
            close?: () => void | Promise<void>
        ) => {
            dispatch({ type: 'setCloseHandler', popupIdentifier, close });
        },
        []
    );

    const settlePopup = useCallback((popupIdentifier: PopupIdentifier) => {
        dispatch({ type: 'settlePopup', popupIdentifier });
    }, []);

    return {
        mount,
        unmount,
        getPopupsByGroup,
        getPopup,
        close,
        setCloseHandler,
        settlePopup,
    };
};
