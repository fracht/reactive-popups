import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';

export type UsePopupBag = [open: () => void, close: () => void];

export const usePopup = <P>(
    PopupComponent: PopupComponent<P>,
    props: P,
    group = DEFAULT_GROUP_SYMBOL
): UsePopupBag => {
    const {
        open: openPopup,
        close: closePopup,
        add,
        remove,
    } = usePopupsContext();
    const id = useRef<number | null>(null);

    const open = useCallback(() => {
        if (id.current) {
            openPopup(id.current, group);
        }
    }, [openPopup, group]);

    const close = useCallback(() => {
        if (id.current) {
            closePopup(id.current, group);
        }
    }, [closePopup, group]);

    useEffect(() => {
        id.current = add(PopupComponent, props, group);
        return () => {
            remove(id.current!, group);
        };
    }, [PopupComponent, add, props, remove, group]);

    return [open, close];
};
