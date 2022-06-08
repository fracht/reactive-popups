import { ComponentType, useCallback, useReducer } from 'react';

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
    const [popupsState, dispatch] = useReducer(popupsReducer, { popups: {} });

    const getPopupsByGroup = useCallback(
        (group: PopupGroup) => {
            if (!popupsState.popups[group.groupId]) {
                return [];
            }

            return Object.values(popupsState.popups[group.groupId]);
        },
        [popupsState]
    );

    const getPopup = useCallback(
        ({ groupId, id }: PopupIdentifier) => {
            return popupsState.popups[groupId][id];
        },
        [popupsState]
    );

    const unmount = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const popup = getPopup(popupIdentifier);

            if (!popup.isSettled) {
                throw new Error(PROMISE_NOT_SETTLED);
            }

            dispatch({ type: 'remove', payload: { popupIdentifier } });
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
                payload: {
                    popupIdentifier,
                    popup: newPopup as Popup<unknown>,
                },
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
            dispatch({
                type: 'setCloseHandler',
                payload: {
                    popupIdentifier,
                    close,
                },
            });
        },
        []
    );

    const settlePopup = useCallback((popupIdentifier: PopupIdentifier) => {
        dispatch({
            type: 'settlePopup',
            payload: {
                popupIdentifier,
            },
        });
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
