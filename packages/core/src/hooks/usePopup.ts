import { ComponentType, useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { OmittedProps } from '../types/OmittedProps';
import { PopupController } from '../types/PopupController';

export const usePopup = <P extends OmittedProps>(
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
    }, [add, PopupComponent, props, remove]);

    return [open, close];
};
