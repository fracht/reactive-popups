import { ComponentType, useCallback, useState } from 'react';

import { ResponseHandler } from './useResponseHandler';
import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { isPromise } from '../utils/isPromise';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({});

    const unmount = useCallback(({ groupId, id }: PopupIdentifier) => {
        setPopups((registry) => {
            delete registry[groupId][id];
            return {
                ...registry,
            };
        });
    }, []);

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
                resolve: handler?.resolve,
                reject: handler?.reject,
            };

            setPopups((registry) => {
                if (!registry[group.groupId]) {
                    registry[group.groupId] = {};
                }

                registry[group.groupId][id] = newPopup as Popup<unknown>;

                return {
                    ...registry,
                };
            });

            return popupIdentifier;
        },
        []
    );

    const close = useCallback(
        (popupIdentifier: PopupIdentifier) => {
            const { groupId, id } = popupIdentifier;
            const popup = popups[groupId][id];
            if (popup.close) {
                const possiblePromise = popup.close();

                if (isPromise(possiblePromise)) {
                    possiblePromise.then(() => {
                        unmount(popupIdentifier);
                    });
                }
            }
        },
        [popups, unmount]
    );

    const setCloseHandler = useCallback(
        (
            { id, groupId }: PopupIdentifier,
            close?: () => void | Promise<void>
        ) => {
            setPopups((prevPopups) => {
                prevPopups[groupId][id].close = close;
                return {
                    ...prevPopups,
                };
            });
        },
        []
    );

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

    return {
        mount,
        unmount,
        getPopupsByGroup,
        getPopup,
        close,
        setCloseHandler,
    };
};
