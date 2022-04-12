import { useCallback, useState } from 'react';

import { PopupGroup } from '../components/PopupGroup';
import { Popup } from '../types/Popup';
import { PopupComponent } from '../types/PopupComponent';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({});

    const unmount = useCallback((id: number, group: PopupGroup) => {
        setPopups((registry) => {
            delete registry[group.groupId][id];
            return {
                ...registry,
            };
        });
    }, []);

    const hide = useCallback((id: number, group: PopupGroup) => {
        setPopups((registry) => {
            registry[group.groupId][id].visible = false;
            return {
                ...registry,
            };
        });
    }, []);

    const mount = useCallback(
        <P>(
            PopupComponent: PopupComponent<P>,
            props: P,
            group: PopupGroup,
            customProps?: Partial<PopupProps>
        ) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
                close: () => hide(id, group),
                ...customProps,
            };

            setPopups((registry) => {
                if (!registry[group.groupId]) registry[group.groupId] = {};
                registry[group.groupId][id] =
                    newPopup as unknown as Popup<PopupProps>;
                return {
                    ...registry,
                };
            });

            return id;
        },
        [hide]
    );

    const show = useCallback((id: number, group: PopupGroup) => {
        setPopups((registry) => {
            registry[group.groupId][id].visible = true;
            return {
                ...registry,
            };
        });
    }, []);

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
        mount,
        show,
        hide,
        unmount,
        getPopupsByGroup,
    };
};
