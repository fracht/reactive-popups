import { useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { DEFAULT_GROUP_SYMBOL } from '../constants';
import { PopupComponent } from '../types/PopupComponent';

type OptionalParamFunction<T, R> = keyof T extends never
    ? () => R
    : (props: T) => R;

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
                },
                true
            );

            return id;
        },
        [PopupComponent, add, props, group]
    );

    return [create, destroy];
};
