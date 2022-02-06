import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupComponent } from '../types/PopupComponent';

export type UsePopupBag = [open: () => void, close: () => void];

export const usePopup = <P>(
    PopupComponent: PopupComponent<P>,
    props: P
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
            openPopup(id.current);
        }
    }, [openPopup]);

    const close = useCallback(() => {
        if (id.current) {
            closePopup(id.current);
        }
    }, [closePopup]);

    useEffect(() => {
        id.current = add(PopupComponent, props);
        return () => {
            remove(id.current!);
        };
    }, [PopupComponent, add, props, remove]);

    return [open, close];
};
