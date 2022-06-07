import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { PopupIdentifier } from '../types/PopupIdentifier';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UseResponsePopupBag<Omit<P, K>, R> => {
    const { mount, settlePopup } = usePopupsContext();

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K>) => {
            let popupIdentifier: PopupIdentifier | null = null;

            const promise = new Promise<R>((resolve, reject) => {
                popupIdentifier = mount(
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

            promise.finally(() => {
                settlePopup(popupIdentifier!);
            });

            return promise;
        },
        [PopupComponent, group, mount, props, settlePopup]
    );

    return waitResponse;
};
