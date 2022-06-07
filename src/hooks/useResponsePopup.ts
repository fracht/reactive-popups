import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UseResponsePopupBag<Omit<P, K>, R> => {
    const { mount } = usePopupsContext();

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K>) => {
            return new Promise<R>((resolve, reject) => {
                mount(
                    PopupComponent,
                    {
                        ...props,
                        ...omittedProps,
                    } as P,
                    group,
                    {
                        resolve: resolve as (
                            value: unknown | PromiseLike<unknown>
                        ) => void,
                        reject,
                    }
                );
            });
        },
        [PopupComponent, group, mount, props]
    );

    return waitResponse;
};
