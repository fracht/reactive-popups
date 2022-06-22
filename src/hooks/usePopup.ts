import { ComponentType, useCallback, useRef } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { uuid } from '../utils/uuid';

export type UsePopupBag<P, K extends keyof P> = [
    open: OptionalParamFunction<Omit<P, K>, void>,
    close: () => void
];

export const usePopup = <P, K extends keyof P>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UsePopupBag<P, K> => {
    const { mount, close: closePopup } = usePopupsContext();

    const isMounted = useRef(false);
    const popupIdentifier = useRef<PopupIdentifier>({
        id: uuid(),
        groupId: group.groupId,
    });

    const open = useCallback<OptionalParamFunction<Omit<P, K>, void>>(
        (omittedProps?: Omit<P, K>) => {
            if (!isMounted.current) {
                const popup = new DefaultPopup(
                    PopupComponent,
                    { ...props, ...omittedProps } as P,
                    popupIdentifier.current
                );

                mount(popup);

                isMounted.current = true;
            }
        },
        [PopupComponent, mount, props]
    );

    const close = useCallback(() => {
        if (isMounted.current) {
            closePopup(popupIdentifier.current);

            isMounted.current = false;
        }
    }, [closePopup]);

    return [open, close];
};
