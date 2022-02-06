import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type UsePopupsFactoryBag<T> = [
    create: OptionalParamFunction<T, number>,
    remove: (id: number) => void
];

export const usePopupsFactory = <P, K extends keyof P>(
    PopupComponent: PopupComponent<P>,
    props: Pick<P, K>,
    group = DEFAULT_GROUP_SYMBOL
): UsePopupsFactoryBag<Omit<P, K>> => {
    const { add, remove } = usePopupsContext();

    const destroy = useCallback(
        (id: number) => {
            remove(id, group);
        },
        [remove, group]
    );

    const create = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const id = add<P>(
                PopupComponent,
                {
                    ...props,
                    ...omittedProps,
                } as P,
                group,
                {
                    visible: true,
                    close: () => {
                        remove(id, group);
                    },
                }
            );

            return id;
        },
        [add, PopupComponent, props, group, remove]
    );

    return [create, destroy];
};
