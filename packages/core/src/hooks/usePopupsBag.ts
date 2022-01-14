import { ComponentType, useCallback } from 'react';
import { useStock } from 'stocked';

import { Popup } from '../types/Popup';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsRegistry } from '../types/PopupsRegistry';
import { uuid } from '../utils/uuid';

export const usePopupsBag = <P extends PopupProps>(): PopupsBag<P> => {
    const stock = useStock<PopupsRegistry<P>>({
        initialValues: {
            popups: {},
        },
    });

    const { paths, setValue, getValue } = stock;

    const add = useCallback(
        (PopupComponent: ComponentType<P>, props: Omit<P, 'id'> = {} as P) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
                visible: false,
            };

            setValue(paths.popups[id], newPopup);

            return id;
        },
        [setValue, paths]
    );

    const open = useCallback(
        (id: number) => {
            setValue(paths.popups[id].visible, true);
        },
        [paths, setValue]
    );

    const remove = useCallback(
        (id: number) => {
            const popups = getValue(paths.popups);
            delete popups[id];
            setValue(paths.popups, popups);
        },
        [setValue, getValue, paths]
    );

    const close = useCallback(
        (id: number) => {
            setValue(paths.popups[id].visible, false);
        },
        [paths, setValue]
    );

    return {
        stock,
        add,
        open,
        close,
        remove,
    };
};
