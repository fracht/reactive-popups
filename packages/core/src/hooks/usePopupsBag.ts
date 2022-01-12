import { ComponentType, useCallback, useMemo, useState } from 'react';

import { useForceUpdate } from './useForceUpdate';
import { OmittedProps } from '../types/OmittedProps';
import { Popup } from '../types/Popup';
import { PopupsBag } from '../types/PopupsBag';
import { uuid } from '../utils/uuid';

export const usePopupsBag = <P extends OmittedProps>(): PopupsBag<P> => {
    const [popups, setPopups] = useState<Popup<P>[]>([]);
    const visiblePopups = useMemo(() => new Set<number>(), []);

    const forceUpdate = useForceUpdate();

    const add = useCallback(
        (PopupComponent: ComponentType<P>, props: Omit<P, 'id'> = {} as P) => {
            const id = uuid();

            const newPopup: Popup<P> = {
                PopupComponent,
                props,
                id,
            };

            setPopups((prevState) => {
                prevState.push(newPopup);
                return prevState;
            });

            return id;
        },
        []
    );

    const open = useCallback(
        (id: number) => {
            visiblePopups.add(id);
            forceUpdate();
        },
        [visiblePopups, forceUpdate]
    );

    const remove = useCallback((id: number) => {
        setPopups((prevState) => {
            return prevState.filter((popup) => popup.id !== id);
        });
    }, []);

    const close = useCallback(
        (id: number) => {
            visiblePopups.delete(id);
            forceUpdate();
        },
        [visiblePopups, forceUpdate]
    );

    return {
        popups,
        visiblePopups,
        add,
        open,
        close,
        remove,
    };
};
