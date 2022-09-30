import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { uuid } from '../utils/uuid';

export type UsePopupsFactoryBag<P, K extends keyof P> = OptionalParamFunction<
    Omit<P, K>,
    PopupIdentifier
>;

export const usePopupsFactory = <P, K extends keyof P>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UsePopupsFactoryBag<P, K> => {
    const { mount, unmount } = usePopupsContext();

    const create = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const id = uuid();

            const popupIdentifier: PopupIdentifier = {
                id,
                groupId: group.groupId,
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

            return popupIdentifier;
        },
        [group.groupId, PopupComponent, props, mount, unmount]
    );

    return create;
};
