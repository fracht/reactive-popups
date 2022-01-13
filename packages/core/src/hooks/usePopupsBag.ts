import { ComponentType, useCallback, useMemo } from 'react';
import { useStock } from 'stocked';

import { Popup } from '../types/Popup';
import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';
import { PopupsStock } from '../types/PopupsStock';
import { uuid } from '../utils/uuid';

export const usePopupsBag = <P extends PopupProps>(): PopupsBag<P> => {
    const visiblePopups = useMemo(() => new Set<number>(), []);

    const isPopupVisible = useCallback(
        (id: number) => visiblePopups.has(id),
        [visiblePopups]
    );

    const stock = useStock<PopupsStock<P>>({
        initialValues: {
            popups: [],
        },
    });

    const { paths, setValue } = stock;

    const forceUpdate = useCallback(() => {
        setValue(paths.popups, (v) => v);
    }, [setValue, paths]);

    const add = useCallback(
        (PopupComponent: ComponentType<P>, props: Omit<P, 'id'> = {} as P) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
            };

            setValue(paths.popups, (prevState) => {
                prevState.push(newPopup);
                return prevState;
            });

            return id;
        },
        [setValue, paths]
    );

    const open = useCallback(
        (id: number) => {
            visiblePopups.add(id);
            forceUpdate();
        },
        [visiblePopups, forceUpdate]
    );

    const remove = useCallback(
        (id: number) => {
            setValue(paths.popups, (prevState) => {
                return prevState.filter((popup) => popup.id !== id);
            });
        },
        [setValue, paths]
    );

    const close = useCallback(
        (id: number) => {
            visiblePopups.delete(id);
            forceUpdate();
        },
        [visiblePopups, forceUpdate]
    );

    return {
        stock,
        isPopupVisible,
        add,
        open,
        close,
        remove,
    };
};
