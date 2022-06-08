import { ComponentType, useCallback } from 'react';

import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { ResponsePopup } from '../types/ResponsePopup';
import { OptionalParamFunction } from '../utils/OptionalParamFunction';
import { uuid } from '../utils/uuid';

export type UseResponsePopupBag<T, R> = OptionalParamFunction<T, Promise<R>>;

export const useResponsePopup = <P, K extends keyof P, R>(
    PopupComponent: ComponentType<P>,
    props: Pick<P, K>,
    group: PopupGroup
): UseResponsePopupBag<Omit<P, K>, R> => {
    const { mount } = usePopupsContext();

    const waitResponse = useCallback(
        (omittedProps?: Omit<P, K>) => {
            const id = uuid();
            let popup: ResponsePopup<P, R> | null = null;

            const promise = new Promise<R>((resolve, reject) => {
                popup = new ResponsePopup(
                    PopupComponent,
                    {
                        ...props,
                        ...omittedProps,
                    } as P,
                    {
                        id,
                        groupId: group.groupId,
                    },
                    resolve,
                    reject
                );

                mount(popup);
            });

            promise.finally(() => {
                popup!.isSettled = true;
            });

            return promise;
        },
        [PopupComponent, group, mount, props]
    );

    return waitResponse;
};
