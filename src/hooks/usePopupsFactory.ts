import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction } from '../types/OptionalParamFunction';
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
    const { mount, close } = usePopupsContext();

    const create = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const id = uuid();

            const popup = new DefaultPopup(
                PopupComponent,
                {
                    ...props,
                    ...omittedProps,
                } as P,
                {
                    id,
                    groupId: group.groupId,
                }
            );

            const identifier = mount<P>(popup);

            return () => {
                close(identifier);
            };
        },
        [mount, PopupComponent, props, group, close]
    );

    return create;
};
