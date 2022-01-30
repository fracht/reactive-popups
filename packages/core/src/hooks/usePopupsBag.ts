import { ComponentType, useCallback, useState } from 'react';

import { ExcludedPropsType } from '../types/ExcludedPropsType';
import { Popup } from '../types/Popup';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = (): PopupsBag => {
    const [popups, setPopups] = useState<PopupsRegistry>({});

    const add = useCallback(
        <K extends object, P extends K & PopupProps>(
            PopupComponent: ComponentType<P>,
            props: K = {} as K
        ) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props: props as P,
                id,
                visible: false,
            };

            setPopups((registry) => {
                registry[id] = newPopup as unknown as Popup<PopupProps>;
                return {
                    ...registry,
                };
            });

            return id;
        },
        []
    );

    const open = useCallback(
        <K extends object, P extends K & PopupProps>(
            id: number,
            excludedProps: ExcludedPropsType<K, P> = {} as ExcludedPropsType<
                K,
                P
            >
        ) => {
            setPopups((registry) => {
                registry[id].visible = true;
                registry[id].props = {
                    ...registry[id].props,
                    ...excludedProps,
                };
                return {
                    ...registry,
                };
            });
        },
        []
    );

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
