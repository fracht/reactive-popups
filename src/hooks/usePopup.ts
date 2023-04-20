import { ComponentType, useCallback, useRef } from 'react';

import { useEvent } from './useEvent';
import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { ControlledPopupIdentifier } from '../types/PopupIdentifier';
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
    const { mount, close: closePopup, unmount } = usePopupsContext();

    const popupIdentifier = useRef<ControlledPopupIdentifier>({
        id: uuid(),
        groupId: group.groupId,
        type: 'controlled',
    });

    const open = useEvent<OptionalParamFunction<Omit<P, K>, void>>(
        (omittedProps?: Omit<P, K>) => {
            const defaultClose = () => {
                unmount(popupIdentifier.current);
            };

            const popup = new DefaultPopup(
                PopupComponent as ComponentType<{}>,
                { ...props, ...omittedProps },
                popupIdentifier.current,
                defaultClose
            );

            mount(popup);
        }
    );

    const close = useCallback(() => {
        closePopup(popupIdentifier.current);
    }, [closePopup]);

    return [open, close];
};
