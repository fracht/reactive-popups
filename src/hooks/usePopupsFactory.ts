import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type UsePopupsFactoryBag<T> = OptionalParamFunction<T, () => void>;

export const usePopupsFactory = <P, K extends keyof P>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UsePopupsFactoryBag<Omit<P, K>> => {
    const { mount, close } = usePopupsContext();

    const create = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const identifier = mount<P>(
                PopupComponent,
                {
                    ...props,
                    ...omittedProps,
                } as P,
                group
            );

            return () => {
                close(identifier);
            };
        },
        [mount, PopupComponent, props, group, close]
    );

    return create;
};
