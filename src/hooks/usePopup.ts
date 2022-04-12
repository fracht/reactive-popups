import { useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupComponent } from '../types/PopupComponent';
import { PopupGroup } from '../components/PopupGroup';

export type UsePopupBag = [show: () => void, hide: () => void];

export const usePopup = <P>(
    PopupComponent: PopupComponent<P>,
    props: P,
    group: PopupGroup
): UsePopupBag => {
    const {
        show: showPopup,
        hide: hidePopup,
        mount,
        unmount,
    } = usePopupsContext();
    const id = useRef<number | null>(null);

    const show = useCallback(() => {
        if (id.current !== null) {
            showPopup(id.current, group);
        }
    }, [showPopup, group]);

    const hide = useCallback(() => {
        if (id.current !== null) {
            hidePopup(id.current, group);
        }
    }, [hidePopup, group]);

    useEffect(() => {
        const currentId = mount(PopupComponent, props, group);

        id.current = currentId;

        return () => {
            unmount(currentId, group);
        };
    }, [PopupComponent, mount, props, unmount, group]);

    return [show, hide];
};
