import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type UsePopupsFactoryBag<T> = [
    create: OptionalParamFunction<T, number>,
    destroy: (id: number) => void
];

// FIXME usePopupsFactory does not handle the situation when created popup hides - there is no way to show it again.
export const usePopupsFactory = <P, K extends keyof P>(
    PopupComponent: PopupComponent<P>,
    props: Pick<P, K>,
    group = DEFAULT_GROUP_SYMBOL
): UsePopupsFactoryBag<Omit<P, K>> => {
    const { mount, unmount } = usePopupsContext();

    const destroy = useCallback(
        (id: number) => {
            unmount(id, group);
        },
        [unmount, group]
    );

    const create = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const id = mount<P>(
                PopupComponent,
                {
                    ...props,
                    ...omittedProps,
                } as P,
                group,
                {
                    visible: true,
                }
            );

            return id;
        },
        [mount, PopupComponent, props, group]
    );

    return [create, destroy];
};
