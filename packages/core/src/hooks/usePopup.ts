import { ComponentType, useCallback, useEffect, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { ExcludedPropsType } from '../types/ExcludedPropsType';
import { PopupController } from '../types/PopupController';
import { PopupProps } from '../types/PopupProps';

export const usePopup = <K extends object, P extends K & PopupProps>(
    PopupComponent: ComponentType<P>,
    props: K = {} as K
): PopupController<K, P> => {
    const {
        open: openPopup,
        close: closePopup,
        add,
        remove,
    } = usePopupsContext();
    const id = useRef<number | null>(null);

    const open = useCallback(
        (excludedProps?: ExcludedPropsType<K, P>) => {
            if (id.current) {
                openPopup(id.current, excludedProps);
            }
        },
        [openPopup]
    );

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
