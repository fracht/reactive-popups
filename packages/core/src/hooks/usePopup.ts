import { ComponentType, useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupController } from '../types/PopupController';
import { PopupProps } from '../types/PopupProps';

export const usePopup = <P extends PopupProps>(
    PopupComponent: ComponentType<P>,
    props: Omit<P, 'id'> = {} as P
): PopupController => {
    const {
        add,
        remove,
        open: openPopup,
        close: closePopup,
    } = usePopupsContext<P>();
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
