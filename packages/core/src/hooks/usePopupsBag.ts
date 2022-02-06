import { useCallback, useState } from 'react';

import { Popup } from '../types/Popup';
import { PopupComponent } from '../types/PopupComponent';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({});

    const remove = useCallback((id: number) => {
        setPopups((registry) => {
            delete registry[id];
            return {
                ...registry,
            };
        });
    }, []);

    const close = useCallback((id: number) => {
        setPopups((registry) => {
            registry[id].visible = false;
            return {
                ...registry,
            };
        });
    }, []);

    const add = useCallback(
        <P>(PopupComponent: PopupComponent<P>, props: P) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
                close: () => close(id),
            };

            setPopups((registry) => {
                registry[id] = newPopup as unknown as Popup<PopupProps>;
                return {
                    ...registry,
                };
            });

            return id;
        },
        [close]
    );

    const open = useCallback((id: number) => {
        setPopups((registry) => {
            registry[id].visible = true;
            return {
                ...registry,
            };
        });
    }, []);

    const empty = () => {
        return Object.values(popups).every(({ visible }) => !visible);
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
