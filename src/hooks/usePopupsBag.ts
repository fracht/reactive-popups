import { useCallback, useState } from 'react';

import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';
import { PopupComponent } from '../types/PopupComponent';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({});

    const close = useCallback(
        ({ id, groupId }: PopupIdentifier) => {
            const popup = popups[groupId][id];
            if (popup.close) {
                popup.close();
            }
        },
        [popups]
    );

    const setBeforeUnmount = useCallback(
        ({ id, groupId }: PopupIdentifier, close?: () => void) => {
            setPopups((prevPopups) => {
                prevPopups[groupId][id].close = close;
                return {
                    ...prevPopups,
                };
            });
        },
        []
    );

    const unmount = useCallback((id: number, group: PopupGroup) => {
        setPopups((registry) => {
            delete registry[group.groupId][id];
            return {
                ...registry,
            };
        });
    }, []);

    const mount = useCallback(
        <P>(PopupComponent: PopupComponent<P>, props: P, group: PopupGroup) => {
            const id = uuid();

            const popupIdentifier: PopupIdentifier = {
                id,
                groupId: group.groupId,
            };

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                popupIdentifier,
                unmount: () => {
                    unmount(id, group);
                },
            };

            setPopups((registry) => {
                if (!registry[group.groupId]) {
                    registry[group.groupId] = {};
                }

                registry[group.groupId][id] =
                    newPopup as unknown as Popup<PopupProps>;

                return {
                    ...registry,
                };
            });

            return popupIdentifier;
        },
        [unmount]
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

    return {
        close,
        mount,
        getPopupsByGroup,
        setBeforeUnmount,
    };
};
