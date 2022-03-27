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
        mount,
        unmount,
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
        id.current = mount(PopupComponent, props, group);
        return () => {
            unmount(id.current!, group);
        };
    }, [PopupComponent, mount, props, unmount, group]);

    return [open, close];
};
