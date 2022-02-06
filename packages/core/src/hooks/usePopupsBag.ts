import { useCallback, useState } from 'react';

import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { Popup } from '../types/Popup';
import { PopupComponent } from '../types/PopupComponent';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({
        [DEFAULT_GROUP_SYMBOL]: {},
    });

    const remove = useCallback((id: number, group = DEFAULT_GROUP_SYMBOL) => {
        setPopups((registry) => {
            delete registry[group][id];
            return {
                ...registry,
            };
        });
    }, []);

    const close = useCallback((id: number, group = DEFAULT_GROUP_SYMBOL) => {
        setPopups((registry) => {
            registry[group][id].visible = false;
            return {
                ...registry,
            };
        });
    }, []);

    const add = useCallback(
        <P>(
            PopupComponent: PopupComponent<P>,
            props: P,
            group = DEFAULT_GROUP_SYMBOL,
            customProps?: Partial<PopupProps>,
            destroyOnClose = false
        ) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
                close: () =>
                    destroyOnClose ? remove(id, group) : close(id, group),
                ...customProps,
            };

            setPopups((registry) => {
                if (!registry[group]) registry[group] = {};
                registry[group][id] = newPopup as unknown as Popup<PopupProps>;
                return {
                    ...registry,
                };
            });

            return id;
        },
        [close, remove]
    );

    const open = useCallback((id: number, group = DEFAULT_GROUP_SYMBOL) => {
        setPopups((registry) => {
            registry[group][id].visible = true;
            return {
                ...registry,
            };
        });
    }, []);

    const empty = (group = DEFAULT_GROUP_SYMBOL) => {
        return Object.values(popups[group]).every(({ visible }) => !visible);
    };

    return {
        add,
        open,
        close,
        remove,
        popups,
        empty,
    };
};
