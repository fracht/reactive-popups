import { ComponentType } from 'react';

import { useEvent } from './useEvent';
import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { ControlledPopupIdentifier } from '../types/PopupIdentifier';
import { uuid } from '../utils/uuid';

export type UsePopupsFactoryBag<P, K extends keyof P> = OptionalParamFunction<
    Omit<P, K>,
    () => void
>;

export const usePopupsFactory = <P, K extends keyof P>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UsePopupsFactoryBag<P, K> => {
    const { mount, unmount } = usePopupsContext();

    const create = useEvent((omittedProps?: Omit<P, K>) => {
        const id = uuid();

        const popupIdentifier: ControlledPopupIdentifier = {
            id,
            groupId: group.groupId,
            type: 'controlled',
        };

        const defaultClose = () => {
            unmount(popupIdentifier);
        };

        const popup = new DefaultPopup(
            PopupComponent,
            {
                ...props,
                ...omittedProps,
            } as P,
            popupIdentifier,
            defaultClose
        );

        mount<P>(popup);

        return () => {
            unmount(popupIdentifier);
        };
    });

    return create;
};
