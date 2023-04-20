import { ComponentType, useId } from 'react';
import { nanoid } from 'nanoid';

import { useEvent } from './useEvent';
import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';

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

    const factoryId = useId();

    const create = useEvent(
        (omittedProps?: Omit<P, K>, id: string = nanoid()) => {
            const popupIdentifier: PopupIdentifier = {
                id: `${factoryId}:${id}`,
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

            return () => {
                unmount(popupIdentifier);
            };
        }
    );

    return create;
};
