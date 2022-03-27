import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';

export type UsePopupBag = [
    show: () => void,
    hide: () => void,
    unmount: () => void
];

export const usePopup = <P>(
    PopupComponent: PopupComponent<P>,
    props: P,
    group = DEFAULT_GROUP_SYMBOL
): UsePopupBag => {
    const {
        show: showPopup,
        hide: hidePopup,
        mount,
        unmount,
    } = usePopupsContext();
    const id = useRef<number | null>(null);

    const show = useCallback(() => {
        if (id.current) {
            showPopup(id.current, group);
        }
    }, [showPopup, group]);

    const hide = useCallback(() => {
        if (id.current) {
            hidePopup(id.current, group);
        }
    }, [hidePopup, group]);

    const unmountPopup = useCallback(() => {
        if (id.current) {
            unmount(id.current, group);
        }
    }, [group, unmount]);

    useEffect(() => {
        id.current = mount(PopupComponent, props, group);
        return () => {
            unmount(id.current!, group);
        };
    }, [PopupComponent, mount, props, unmount, group]);

    return [show, hide, unmountPopup];
};
